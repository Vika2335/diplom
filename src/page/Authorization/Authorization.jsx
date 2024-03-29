import React from "react";
import { Link } from 'react-router-dom'
import './Autorization.css'

function Authorization() {

  return(
    <>
      <section>
        <div className="authorization-page">
          <div className="content">
            <h1 className="authorization__heading">Авторизация</h1>
            <div className='form'>
              <label className='input' htmlFor="name">Email:</label>
              <input className='input-text' type="text" name="name"/>
              <label className='input' htmlFor="img">Password:</label>
              <input className='input-text' type="text" name="password"/>
            </div>
            <div className='authorization__button'>
              <div className='modal__button-login'><button className='login'>Login</button></div>
            </div>
            <p><Link to="/registration">Зарегистрироваться</Link></p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Authorization