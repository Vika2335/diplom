import React, { useState } from 'react';
import { 
  Link, 
  useNavigate 
} from 'react-router-dom'
import './UserCabinet.css'
import { 
  useSelector, 
  useDispatch 
} from 'react-redux';
import edit from '../../image/icons/edit.svg'
import Avatar from 'react-avatar';
import date from '../../image/icons/datetime.svg'
import log_out from '../../image/icons/logout.svg'
import { 
  clearUser, 
  updateUser 
} from '../../redux/userSlice';
import heart from '../../image/icons/heart.svg'
import { FaRegSave } from "react-icons/fa";
import { useChangeUserDataMutation } from '../../redux/userAuthAPI'
import { useGetLikePostsQuery } from '../../redux/postsApi'

function UserCabinet() {
  const user = useSelector((state) => state.user);

  const { likePosts, isLoading } = useGetLikePostsQuery();

  const [editedName, setEditedName] = useState(user.username);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("accessToken");
    dispatch(clearUser(user.data));
    navigate('/');
  }

  const [ change ] = useChangeUserDataMutation();

  const saveChanges = async(e) => {
    e.preventDefault();
    try {
      await change({ editedEmail, editedName });
      setIsEditing(false);
      dispatch(updateUser({ username: editedName, email: editedEmail }));
    } catch (error) {
      console.error('Ошибка при изменении данных:', error);
    }
  }

  const contentLikePosts = likePosts ? (
    likePosts.map((item) => (
      <div className='post' key={item._id}>
        <Link className='link' to={`/post/${item._id}`}>
          <div className='post__button'>
            <h2 className='title'>{item.header}</h2>
            <p className='description'>{item.body}</p>
            <p className='tags'>{item.tags}</p>
            <div className='post__content'>
              <div className='views'>
                <p className='int'>2.2K</p>
              </div>
              <div className='comment'>
                <p className='int'>10</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ))
  ) : null;

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
                  {!isEditing ? (
                    <div className='cabinet__username'>{user.username}</div>
                  ) : (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="edit-input"
                    />
                  )}
                  {!isEditing ? (
                    <button className='edit-img' onClick={() => setIsEditing(!isEditing)}>
                      <img src={edit} alt='No icon'/>
                    </button>
                  ) : (
                    <button className='save-button' onClick={saveChanges}>
                      <FaRegSave className='save' />
                    </button>
                  )}
                </div>
              </div>
              <div className='user__email'>
                <p className='user__field'>Почта:</p>
                <div className='edit'>
                  {!isEditing ? (
                    <div className='cabinet__useremail'>{user.email}</div>
                  ) : (
                    <input
                      type="text"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="edit-input"
                    />
                  )}
                  {!isEditing ? (
                    <button className='edit-img' onClick={() => setIsEditing(!isEditing)}>
                      <img src={edit} alt='No icon'/>
                    </button>
                  ) : (
                    <button className='save-button' onClick={saveChanges}>
                      <FaRegSave className='save'/>
                    </button>
                  )}
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
              <button className='logout-button' onClick={logout}>Выйти</button>
              <img src={log_out} alt='No icon'/>
            </div>
            <div className='posts__like'>
              <p className='like-field'>Последние понравившиеся:</p>
              <div className='posts__like-gallery'>
                {contentLikePosts}
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