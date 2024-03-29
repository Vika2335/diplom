import React from "react";
import './Registration.css'
import { Link } from 'react-router-dom'

function Registration() {
    return(
        <>
          <section>
            <div className="registration">
              <div className="content">
                <h1 className="registration__heading">Регистрация</h1>
                <div className='form'>
                  <label className='input' htmlFor="img">Name:</label>
                  <input className='input-text' type="text" name="name"/>
                  <label className='input' htmlFor="name">Email:</label>
                  <input className='input-text' type="text" name="email"/>
                  <label className='input' htmlFor="img">Password:</label>
                  <input className='input-text' type="text" name="password"/>
                  <label className='input' htmlFor="img">Password two:</label>
                  <input className='input-text' type="text" name="password"/>
                </div>
                
                <div className='registration__button'>
                  <div className='button-register'><button className='register'>Register</button></div>
                </div>

                <p><Link to="/autorization">Авторизоваться</Link></p>
              </div>
            </div>
          </section>
        </>
    )
}

export default Registration