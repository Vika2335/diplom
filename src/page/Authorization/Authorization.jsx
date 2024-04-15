import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Autorization.css'
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthorizationMutation } from '../../redux/postsApi';

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;

function Authorization({ setUser }) {
  const [formdata, setformdata] = useState({
    email: '',
    password: '',
  });
    
  const { email, password } = formdata;
  
  const [ authorization, { isLoading, isError } ] = useAuthorizationMutation();
    
  const[show, setshow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const change = (e) => {
    setformdata({...formdata,[e.target.name]:e.target.value});
  }

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authorization({ email, password });
      console.log(data.user);
      setUser(data.user);
      //localStorage.setItem('token', data.token);
      setformdata({ email: '', password: '' });
      navigate('/');
      setshow(false);
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
    }
  }; 
  
  return(
    <>
      <section>
        <div className="authorization-page">
          <div className="authorization__content">
            <div className='authorization__border'>
              <h1 className="authorization__heading">ВХОД:</h1>
              <form className='authorization__form' onSubmit={submit}>
                <label className='label-email'>Почта:</label>
                <input className='email' type="email" value={email} placeholder="Почта" name="email" onChange={change}/>
                <label className='label-password'>Пароль:</label>
                <div className='password'>
                  <input className='password__input' type={showPassword ? 'text' : 'password'} placeholder="Пароль" value={password} name="password" onChange={change}/>
                  {showPassword ? <i onClick={() => setShowPassword(false)}>{Eye}</i> : <i onClick={() => setShowPassword(true)}>{EyeSlash}</i>}
                </div>
                <div className='authorization__button'>
                  <button className="submit" type = "submit" name="submit">Войти</button>
                </div>
              </form>
            </div>
            <p className='link__registration'><Link to="/registration">Зарегистрироваться</Link></p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Authorization