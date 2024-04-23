import React from 'react';
import { } from 'react-router-dom'
import './UserCabinet.css'
import { useSelector } from 'react-redux';
import edit from '../../image/icons/edit.svg'
import Avatar from 'react-avatar';
import date from '../../image/icons/datetime.svg'

function UserCabinet() {
  const user = useSelector((state) => state.user);

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
              <Avatar className='avatar' name={user.username} round={true} size='150px'/>
              <div className='day__registr'>
                <p className='user__field'>С нами с: </p>
                <div className='day'>
                  <p className='createdAt'>{user.createdAt}</p>
                  <div className='day-img'>
                    <img src={date} alt='No icon'/>
                  </div>
                </div>
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