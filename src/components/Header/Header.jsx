import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {

  return (
    <>
      <header className="header">
        <div className='container'>
          <Link className="logo" to="/">
            <p className="logo__heading">ForuM</p>
          </Link>
          <div className="wrapper-menu">
            <nav className="menu">
              <ul className="menu-list">
                <li><Link to="/">Главная</Link></li>
                <li><a href="#footer">Contacts</a></li>
                <li><Link to="/authorization"><button className="authorization">Авторизация</button></Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}  
  
export default Header