import React, { useEffect, useState } from "react"
import "./Comment.css"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import Avatar from "react-avatar"
import {
  comment,
  useChangeCommentMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentPostsMutation,
  useLikeCommentMutation,
} from "../../redux/commentPost"
import heart from "../../image/icons/heart.svg"
import { format } from "date-fns"

function Comment({ postId }) {
  const { id } = useParams()
  const user = useSelector((state) => state.user)

  const [test, { isLoading }] = useGetCommentPostsMutation(id)
  const [comments, setComments] = useState(null)

  const [likedCounts, setLikedCounts] = useState({})
  const [likedComment] = useLikeCommentMutation()

  const handleLike = async (id) => {
    try {
      const likesOnComment = await likedComment(id)
      if (likesOnComment) {
        const updatedLikedCounts = { ...likedCounts }
        updatedLikedCounts[id] = likesOnComment.data.likes.length
        setLikedCounts(updatedLikedCounts)
      }
    } catch (error) {
      console.error("Ошибка при лайке комментария:", error)
    }
  }

  const updateLikes = () => {
    if (postId) {
      test(postId)
        .unwrap()
        .then((res) => setComments(res))
    }
  }

  useEffect(() => {
    updateLikes()
  }, [])

  const [commentText, setCommentText] = useState("")
  const [createComment] = useCreateCommentMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createComment({ postId: id, comment: commentText })
      if (comments) {
        setComments([...comments, { _id: Date.now(), comment: commentText, createdAt: new Date(), likes: [] }])
      } else {
        setComments([{ _id: Date.now(), comment: commentText, createdAt: new Date(), likes: [] }])
      }
      setCommentText("")
    } catch (error) {
      console.error("Ошибка при создании комментария:", error)
    }
  }

  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [editComment] = useChangeCommentMutation();

  const toggleDropdown = (commentId, commentText) => {
    setVisibleDropdown(visibleDropdown === commentId ? null : commentId);
    setEditedCommentText(commentText);
  };

  /*useEffect(() => {
    if(comment) {
      setEditedComment(comment.comment);
    }
  }, [comment]);  */
  
  const saveEditedComment = async () => {
    try {
      await editComment({ id: visibleDropdown, comment: editedCommentText });
      setIsEditing(false);
      updateLikes();
    } catch (error) {
      console.error("Ошибка при редактировании комментария:", error);
    }
  };

  const handleEditClick = (commentId, commentText, postId) => {
    toggleDropdown(commentId, commentText);
    setIsEditing(true);
    setEditedCommentText(commentText);
  };

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteClick = async (commentId) => {
    try {
      await deleteComment(commentId);
      updateLikes();
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
    }
  };

  const contentComment = comments ? comments.map((comment) => (
    <div className="created-comment" key={comment._id}>
      <button className="dropdown" onClick={() => toggleDropdown(comment._id, comment.comment)}>
        <div className="comment-post">
          {comment.comment}
          <div className="comment-datetime">
            <div className="comment-timecomment-date">
              {format(new Date(comment.createdAt), "HH:mm")}
            </div>
            <div className="comment-date">
              {format(new Date(comment.createdAt), "dd.MM.yyyy")}
            </div>
          </div>
        </div>
      </button>
      {visibleDropdown === comment._id && (
        <div className="dropdown-content show">
          <a>
            <button className="dropdown-edit" onClick={() => handleEditClick(comment._id, comment.comment, postId)}>Редактировать</button>
          </a>
          <a>
            <button className="dropdown-delete" onClick={() => handleDeleteClick(comment._id)}>Удалить</button>
          </a>
        </div>
      )}
      <div className="comment__button-heart">
        <button
          className="button-like"
          onClick={() => {
            handleLike(comment._id), updateLikes()
          }}
        >
          <img src={heart} alt="No image" />
          <p className="int">{comment.likes.length || 0}</p>
        </button>
      </div>
    </div>)) : null

  return (
    <div className="newComment">
      <div className="comment-block">
        {user.email ? (
          <li className="username">
            <Avatar
              className="avatar"
              name={user.username}
              round={true}
              size="50px"
            />
          </li>
        ) : (
          <li className="username">
            <Avatar
              className="avatar"
              round={true}
              size="50px"
            />
          </li>
        )}
        
        {user.email ? (
          <form onSubmit={handleSubmit} className="comment-form">
            {!isEditing ? (
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="comment-text"
                placeholder="Оставьте свой комментарий здесь..."
              />
            ) : (
              <textarea
                value={editedCommentText}
                onChange={(e) => setEditedCommentText(e.target.value)}
                className="comment-text"
                placeholder="Отредактируйте свой комментарий здесь..."
              />
            )}
            {!isEditing ? (
              <button type="submit" className="comment-button">
                Отправить
              </button>
            ) : (
              <button onClick={saveEditedComment} className="comment-button">
                Сохранить
              </button>
            )}
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              className="comment-text"
              placeholder="Войдите, чтобы оставить здесь свой комментарий..."
            />
            <button type="submit" className="unknown">
              Отправить
            </button>
          </form>
        )}
        
      </div>
      {isLoading ? (
        <p>Комментарии загружаются...</p>
      ) : (
        <div className="comments">{contentComment}</div>
      )}
    </div>
  )
}

export default Comment