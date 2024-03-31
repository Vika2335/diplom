import React from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'

function Header({ user}) {
  const location = useLocation();

  return (
    <>
      <header className={ `header ${ location.pathname === '/' ? 'header-main' : 'header-autorization' }` }>
        <div className='container'>
          <Link className="logo" to="/">
            <p className="logo__heading">BookWeekdays</p>
          </Link>
          <div className="wrapper-menu">
            <nav className={ `menu ${ location.pathname === '/' ? 'menu-main' : 'menu-autorization' }` }>
              <ul className="menu-list">
                {user ? ( <li><Link to="/profile">{user.name}</Link></li> ) : (<li><button className="authorization"><Link to="/authorization">Авторизация</Link></button></li> )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}  
  
export default Header