import React, { useState } from "react";
import './Registration.css'
import { Link, useNavigate } from 'react-router-dom'
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRegistrationMutation } from '../../redux/postsApi'

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;

function Registration() {
  const [formdata, setformdata] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  })
  
  const navigate = useNavigate();

  const { username, email, password, repeatPassword } = formdata;

  const [ registration, { isLoading, isError } ] = useRegistrationMutation();

  const[show, setshow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registered, setRegistered] = useState(false);

  const change = (e) => {
    setformdata({...formdata,[e.target.name]:e.target.value});
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      await registration({  email, password, username });
      setformdata({ username: '', email: '', password: '', repeatPassword: '' });
      setshow(false);
      navigate('/authorization');
      setRegistered(true);
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
    }
  }; 

  if (registered) {
    return <Redirect to="/authorization" />;
  }

  return(
    <>
      <section>
        <div className="registration">
          <div className="registration__content">
            <div className="registration__border">
              <h1 className="registration__heading">Регистрация:</h1>
              <form className='form' onSubmit={submit}>
                <label className='label'>Имя пользователя:</label>
                <input className='name' required type="name" value={username} placeholder="Имя пользователя" name="username" onChange={change}/>
                <label className='label'>Почта:</label>
                <input className='email' required type="email" value={email} placeholder="Почта" name="email" onChange={change}/>
                <label className='label'>Пароль:</label>
                <div className='password'>
                  <input className='password__input' required type={showPassword ? 'text' : 'password'} placeholder="Пароль" value={password} name="password" onChange={change}/>
                  {showPassword ? <i onClick={() => setShowPassword(false)}>{Eye}</i> : <i onClick={() => setShowPassword(true)}>{EyeSlash}</i>}
                </div>
                <label className='label'>Подтвердите пароль:</label>
                <div className='repeat__password'>
                  <input className='password__input' required type={showPassword ? 'text' : 'password'} placeholder="Пароль" value={repeatPassword} name="repeatPassword" onChange={change}/>
                  {showPassword ? <i onClick={() => setShowPassword(false)}>{Eye}</i> : <i onClick={() => setShowPassword(true)}>{EyeSlash}</i>}
                </div>
                <div className='registration__button'>
                  <button className="submit-registr" type="submit" name="submit">Зарегистрироваться</button>
                </div>
              </form>
            </div>
            <p className="link__authorization"><Link to="/authorization">Войти</Link></p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Registration