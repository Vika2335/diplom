import React, { useEffect } from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'

function Header({ user }) {
  const location = useLocation();

  useEffect(() => {
    console.log('User state:', user);
  }, [user]);

  return (
    <>
      <header className={ `header ${ location.pathname === '/' ? 'header-main' : 'header-autorization' }` }>
        <Link className="logo" to="/">
          <p className="logo__heading">ДИСКУРС</p>
        </Link>
        <div className="wrapper-menu">
          <nav className={ `menu ${ location.pathname === '/' ? 'menu-main' : 'menu-autorization' }` }>
            <ul className="menu-list">
              {user ? ( <li className='username'>{user.username}</li> ) : (<li className='authorization'><Link to="/authorization">Войти</Link><Link to="/registration">/Зарегистрироваться</Link></li> )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}  
  
export default Header