import React, { useState, useEffect } from "react";
import "./Post.css";
import { useParams, useNavigate } from "react-router-dom";
import { useChangePostDataMutation, useDeletePostMutation, useGetOnePostQuery } from "../../redux/postsApi";
import { useLikePostMutation } from "../../redux/likePost";
import Comment from "../../components/Comment/Comment";
import { useSelector, useDispatch } from 'react-redux';
import { FaRegSave } from "react-icons/fa";
import { updatePost } from "../../redux/postSlice";
import arrow from '../../image/icons/arrow.svg';
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

  useEffect(() => {
    if (post) {
      setEditedHeader(post.header);
      setEditedBody(post.body);
      setEditedTags(post.tags);
      setLikedCount(post.likes.length);
    }
  }, [post]);

  if (isLoading) {
    return <h1 className='load'>Loading...</h1>;
  }

  if (!post) {
    return <h1 className='load'>Post not found</h1>;
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
                        <div className="dropdown-post">
                          <button className="edit-img" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <img src={arrow} className="arrow" alt="Arrow" />
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
