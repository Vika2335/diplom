import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Autorization.css'
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthorizationMutation } from '../../redux/postsApi';

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;

function Authorization() {
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

  const submit = async (e) => {
    e.preventDefault();
    try {
      await authorization({ email, password });
      setformdata({ email: '', password: '' });
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
            <h1 className="authorization__heading">Авторизация</h1>
            <form className='authorization__form' onSubmit={submit}>
              <label className='label'>Email:</label>
              <input className='email' type="email" value={email} placeholder="Email" name="email" onChange={change}/>
              <label className='label'>Password:</label>
              <div className='password'>
                <input className='password__input' type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} name="password" onChange={change}/>
                {showPassword ? <i onClick={() => setShowPassword(false)}>{Eye}</i> : <i onClick={() => setShowPassword(true)}>{EyeSlash}</i>}
              </div>
              <div className='authorization__button'>
                <input className="submit" type = "submit" name="submit"></input>
              </div>
            </form>
            <p><Link to="/registration">Зарегистрироваться</Link></p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Authorization