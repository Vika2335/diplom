import React from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';


function Header() {
  const location = useLocation();

  const user = useSelector((state) => state.user);

  return (
    <>
      <header className={ `header ${ location.pathname === '/authorization' ||  location.pathname === '/registration'? 'header-autorization' : 'header-main' }` }>
        <Link className="logo" to="/">
          <p className="logo__heading">ДИСКУРС</p>
        </Link>
        <div className="wrapper-menu">
          <nav className={ `menu ${ location.pathname === '/authorization' ||  location.pathname === '/registration'? 'menu-autorization' :  'menu-main'}` }>
            {user.roles?.includes('ADMIN') ? (
              <ul className="menu-list">
                <button className='createPost'>Создать пост</button>
                {user.email ? ( <li className='username'><Link to={"/userCabinet"}>{user.username}</Link></li> ) : (<li className='authorization'><Link to="/authorization">Войти</Link><Link to="/registration">/Зарегистрироваться</Link></li> )}
              </ul>
            ) : (
              <ul className="menu-list">
                {user.email ? ( <li className='username'><Link to={"/userCabinet"}>{user.username}</Link></li> ) : (<li className='authorization'><Link to="/authorization">Войти</Link><Link to="/registration">/Зарегистрироваться</Link></li> )}
              </ul>
            ) }
          </nav>
        </div>
      </header>
    </>
  )
}  
  
export default Header