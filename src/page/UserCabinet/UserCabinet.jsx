import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserCabinet.css';
import { useSelector, useDispatch } from 'react-redux';
import edit from '../../image/icons/edit.svg';
import Avatar from 'react-avatar';
import date from '../../image/icons/datetime.svg';
import log_out from '../../image/icons/logout.svg';
import { clearUser, updateUser } from '../../redux/userSlice';
import heart from '../../image/icons/heart.svg';
import { FaRegSave } from "react-icons/fa";
import { useChangeUserDataMutation, useLogOutMutation } from '../../redux/userAuthAPI';
import { useGetLikePostsMutation } from '../../redux/postsApi';
import comment from '../../image/icons/comment.svg';
import eye from '../../image/icons/eye.svg';
import datetime from '../../image/icons/datetime.svg';
import { format } from 'date-fns';

function UserCabinet() {
  const user = useSelector((state) => state.user);
  const [getLikedPosts] = useGetLikePostsMutation();
  const [likePosts, setLikePosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLikedPosts()
      .unwrap()
      .then((res) => {
        setLikePosts(res.posts);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [getLikedPosts]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logOut] = useLogOutMutation();

  const exit = async (e) => {
    e.preventDefault();
    try {
      await logOut({ refresh: localStorage.getItem('refToken') });
      localStorage.removeItem("accessToken");
      dispatch(clearUser(user.data));
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const [editedName, setEditedName] = useState(user.username);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [isEditing, setIsEditing] = useState(false);
  const [change] = useChangeUserDataMutation();

  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      let newName = '';
      let newEmail = '';
      if (user.username !== editedName) {
        newName = editedName;
      }
      if (user.email !== editedEmail) {
        newEmail = editedEmail;
      }
      await change({ email: newEmail, username: newName });
      setIsEditing(false);
      dispatch(updateUser({ username: editedName, email: editedEmail }));
    } catch (error) {
      console.error('Ошибка при изменении данных:', error);
    }
  };

  const contentLikePosts = loading ? (
    <p className='loading-message'>Загрузка...</p>
  ) : likePosts.length > 0 ? (
    [...likePosts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 2)
      .map((item) => (
        <div className='post' key={item._id}>
          <Link className='link' to={`/post/${item._id}`}>
            <div className='post__button'>
              <h2 className='title'>{item.header}</h2>
              <p className='description'>{item.body}</p>
              <p className='tags'>{item.tags}</p>
              <div className='information__post'>
                <div className='post__content'>
                  <div className='views'>
                    <p className='view__int'>{item.viewCount}</p>
                    <img src={eye} alt='No image' />
                  </div>
                  <div className='comment'>
                    <p className='int'>{item.comments.length}</p>
                    <img src={comment} alt='No image' />
                  </div>
                  <div className='hearts'>
                    <p className='int'>{item.likes.length}</p>
                    <img src={heart} alt='No image' />
                  </div>
                </div>
                <div className='datetime'>
                  <p className='date'>{format(new Date(item.createdAt), 'dd.MM.yyyy')}</p>
                  <img src={datetime} alt='No image' />
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))
  ) : (
    <div className='message'>
      <p className='no-likes-message'>Поставьте лайк на пост, чтобы здесь появились посты!</p>
    </div>
  );

  return (
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
                        <img src={edit} alt='No icon' />
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
                        <img src={edit} alt='No icon' />
                      </button>
                    ) : (
                      <button className='save-button' onClick={saveChanges}>
                        <FaRegSave className='save' />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <Avatar className='avatar' name={user.username} round={true} size='150px' />
              <div className='day__registr'>
                <p className='user__field'>С нами с: </p>
                <p className='withUs'>{user.withUs}</p>
                <div className='day-img'>
                  <img src={date} alt='No icon' />
                </div>
              </div>
              <div className='logout'>
                <button className='logout-button' onClick={exit}>Выйти</button>
                <img src={log_out} alt='No icon' />
              </div>
              <div className='posts__like'>
                <p className='like-field'>Последние понравившиеся:</p>
                <div className='posts__like-gallery'>
                  {contentLikePosts}
                </div>
                <div className='link__like'>
                  <img src={heart} alt='No icon' />
                  <Link to="/likePosts" className='cabinet__link'>Смотреть все</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default UserCabinet;