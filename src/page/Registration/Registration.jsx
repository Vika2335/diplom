import React, { useState } from "react";
import './Registration.css'
import { Link } from 'react-router-dom'
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;

function Registration() {
  const [formdata, setformdata] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  })
    
  const { name, email, password, repeatPassword } = formdata;

  const[show, setshow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const change = (e) => {
    setformdata({...formdata,[e.target.name]:e.target.value});
  }

  const submit = e =>{
    e.preventDefault();
    setformdata({ name: '', email: '', password: '', repeatPassword: '' });
    setshow(false);
  } 

  return(
    <>
      <section>
        <div className="registration">
          <div className="registration__content">
            <h1 className="registration__heading">Регистрация</h1>
            <form className='form' onSubmit={submit}>
              <label className='label'>Name:</label>
              <input className='name' type="name" value={name} placeholder="Name" name="name" onChange={change}/>
              <label className='label'>Email:</label>
              <input className='email' type="email" value={email} placeholder="Email" name="email" onChange={change}/>
              <label className='label'>Password:</label>
              <div className='password'>
                <input className='password__input' type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} name="password" onChange={change}/>
                {showPassword ? <i onClick={() => setShowPassword(false)}>{Eye}</i> : <i onClick={() => setShowPassword(true)}>{EyeSlash}</i>}
              </div>
              <label className='label'>Repeat the password:</label>
              <div className='repeat__password'>
                <input className='password__input' type={showPassword ? 'text' : 'password'} placeholder="Repeat the password" value={repeatPassword} name="repeatPassword" onChange={change}/>
                {showPassword ? <i onClick={() => setShowPassword(false)}>{Eye}</i> : <i onClick={() => setShowPassword(true)}>{EyeSlash}</i>}
              </div>
              <div className='registration__button'>
                <input className="submit" type = "submit" name="submit"></input>
              </div>
            </form>
            
            <p><Link to="/authorization">Авторизоваться</Link></p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Registration