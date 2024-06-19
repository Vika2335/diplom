import React, { useState, useEffect, useRef } from "react";
import "./Post.css";
import { useParams, useNavigate } from "react-router-dom";
import { useChangePostDataMutation, useDeletePostMutation, useGetOnePostQuery } from "../../redux/postsApi";
import { useLikePostMutation } from "../../redux/likePost";
import Comment from "../../components/Comment/Comment";
import { useSelector, useDispatch } from 'react-redux';
import { FaRegSave } from "react-icons/fa";
import { setPost, updatePost } from "../../redux/postSlice";
import comment from "../../image/icons/comment.svg";
import eye from "../../image/icons/eye.svg";
import heart from "../../image/icons/heart.svg";
import datetime from "../../image/icons/datetime.svg";
import { format } from "date-fns";

function Post() {
  const { id } = useParams();
  const { data: post, isLoading } = useGetOnePostQuery(id);
  const [likedCount, setLikedCount] = useState(0);
  const [editedHeader, setEditedHeader] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [editedTags, setEditedTags] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [likedPost] = useLikePostMutation();
  const [changePost] = useChangePostDataMutation();
  const [deletePost] = useDeletePostMutation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (post) {
      setEditedHeader(post.header);
      setEditedBody(post.body);
      setEditedTags(post.tags);
      setLikedCount(post.likes.length);
      dispatch(setPost(post));
    }
  }, [post, dispatch]);

  if (isLoading) {
    return <h1 className='load'>Загрузка...</h1>;
  }

  if (!post) {
    return <h1 className='load'>Пост не найден</h1>;
  }

  const backButton = () => {
    navigate("/");
  }

  const handleLike = async () => {
    try {
      const likesOnPost = await likedPost(id);
      if (likesOnPost) {
        setLikedCount(likesOnPost.data.likes.length);
      }
    } catch (error) {
      console.error("Ошибка при лайке поста:", error);
    }
  }

  const saveChangesPost = async (e) => {
    e.preventDefault();
    try {
      let newHeader = undefined;
      let newBody = undefined;
      let newTags = undefined;

      if (post.header !== editedHeader) {
        newHeader = editedHeader;
      }

      if (post.body !== editedBody) {
        newBody = editedBody;
      }
      if (post.tags !== editedTags) {
        newTags = editedTags;
      }

      await changePost({ header: newHeader, body: newBody, tags: newTags, id: post._id });
      setIsEditing(false);
      dispatch(updatePost({ header: editedHeader, body: editedBody, tags: editedTags }));
    } catch (error) {
      console.error('Ошибка при изменении данных поста:', error);
    }
  }

  const handleDeletePost = async () => {
    try {
      await deletePost(id);
      console.log("Пост удален");
      navigate("/");
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
    }
  }

  return (
    <>
      <main>
        <section>
          <div className="container">
            <div className="posts">
              <div className="post-content">
                <div className="button__back">
                  <button className="back" onClick={backButton}>
                    &lt;&lt;
                  </button>
                </div>
                <div className="post__name">
                  {user.roles?.includes('ADMIN') ? (
                    <div className="block-edit">
                      {!isEditing ? (
                        <h2 className="post__title">{post.header}</h2>
                      ) : (
                        <input
                          type="text"
                          value={editedHeader}
                          onChange={(e) => setEditedHeader(e.target.value)}
                          className="edit-header"
                          placeholder="Название"
                        />
                      )}
                      {!isEditing ? (
                        <div className="dropdown-post" ref={dropdownRef}>
                          <button className="edit-img" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                              <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#C571E2"/>
                            </svg>
                          </button>
                          {isDropdownOpen && (
                            <div className="dropdown-post__content show">
                              <button className="dropdown-post__edit" onClick={() => setIsEditing(!isEditing)}>
                                Редактировать
                              </button>
                              <button className="dropdown-post__delete" onClick={() => setIsModalOpen(true)}>
                                Удалить
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <button className='save-button' onClick={saveChangesPost}>
                          <FaRegSave className='save' />
                        </button>
                      )}
                    </div>
                  ) : (
                    <h2 className='post__title'>{post.header}</h2>
                  )}
                  {!isEditing ? (
                    <p className="post__description">{post.body}</p>
                  ) : (
                    <textarea
                      type="text"
                      value={editedBody}
                      onChange={(e) => setEditedBody(e.target.value)}
                      className="edit-body"
                      placeholder="Текст"
                    />
                  )}
                  <div className="information__post">
                    <div className="post__content">
                      <div className="views">
                        <p className="view__int">{post.viewCount}</p>
                        <img src={eye} alt="No image" />
                      </div>
                      <div className="comment">
                        <p className="int">{post.comments.length}</p>
                        <img src={comment} alt="No image" />
                      </div>
                      <div className="hearts">
                        <p className="int">{likedCount}</p>
                        <button className="button-heart" onClick={handleLike}>
                          <img src={heart} alt="No image" />
                        </button>
                      </div>
                      <div className="post__tags">
                        {!isEditing ? (
                          <p className="tag">{post.tags}</p>
                        ) : (
                          <input
                            type="text"
                            value={editedTags}
                            onChange={(e) => setEditedTags(e.target.value)}
                            className="edit-tags"
                            placeholder="Теги"
                          />
                        )}
                      </div>
                    </div>
                    <div className="datetime">
                      <p className="date">
                        {format(new Date(post.createdAt), "dd.MM.yyyy")}
                      </p>
                      <img src={datetime} alt="No image" />
                    </div>
                  </div>
                </div>
              </div>
              <Comment postId={id} />
            </div>
          </div>
        </section>
      </main>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Вы уверены, что хотите удалить этот пост?</h2>
            <div className="modal-buttons">
              <button onClick={handleDeletePost}>Удалить</button>
              <button onClick={() => setIsModalOpen(false)}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Post;
