import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './UserCabinet.css'
import { useSelector, useDispatch } from 'react-redux';
import edit from '../../image/icons/edit.svg'
import Avatar from 'react-avatar';
import date from '../../image/icons/datetime.svg'
import log_out from '../../image/icons/logout.svg'
import { clearUser } from '../../redux/userSlice';
import heart from '../../image/icons/heart.svg'

function UserCabinet() {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("accessToken");
    dispatch(clearUser(user.data));
    navigate('/');
  }

  return(
    <>
    <main>
      <section>
        <div className="container">
          <div className="user-page">
            <div className='user__data'>
              <div className='user__name'>
                <p className='user__field'>Имя пользователя:</p>
                <div className='edit'>
                  <p className='cabinet__username'>{user.username}</p>
                  <div className='edit-img'>
                    <img src={edit} alt='No icon'/>
                  </div>
                </div>
              </div>
              <div className='user__email'>
                <p className='user__field'>Почта:</p>
                <div className='edit'>
                  <p className='cabinet__useremail'>{user.email}</p>
                  <div className='edit-img'>
                    <img src={edit} alt='No icon'/>
                  </div>
                </div>
              </div>
            </div>
            <Avatar className='avatar' name={user.username} round={true} size='150px'/>
            <div className='day__registr'>
              <p className='user__field'>С нами с: </p>
              <p className='withUs'>{user.withUs}</p>
              <div className='day-img'>
                <img src={date} alt='No icon'/>
              </div>
            </div>
            <div className='logout'>
              <button className='logout-button' onClickCapture={logout}>Выйти</button>
              <img src={log_out} alt='No icon'/>
            </div>
            <div className='posts__like'>
              <p className='like-field'>Последние понравившиеся:</p>
              <div className='posts__like-gallery'>
                <p>POSTS</p>
              </div>
              <div className='link__like'>
                <img src={heart} alt='No icon'/>
                <Link to="/" className='cabinet__link'>Смотреть все</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}

export default UserCabinet