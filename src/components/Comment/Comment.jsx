import React, { useEffect, useState } from "react"
import "./Comment.css"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import Avatar from "react-avatar"
import {
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

  const [getComments, { isLoading }] = useGetCommentPostsMutation()
  const [comments, setComments] = useState(null)

  const [likedComment] = useLikeCommentMutation()

  const handleLike = async (commentId) => {
    try {
      const response = await likedComment(commentId)
      if (response) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId ? { ...comment, likes: response.data.likes } : comment
          )
        )
      }
    } catch (error) {
      console.error("Ошибка при лайке комментария:", error)
    }
  }

  const fetchComments = () => {
    if (postId) {
      getComments(postId)
        .unwrap()
        .then((res) => setComments(res))
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  const [commentText, setCommentText] = useState("")
  const [createComment] = useCreateCommentMutation()
  const [editComment] = useChangeCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()

  const [visibleDropdown, setVisibleDropdown] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedCommentId, setEditedCommentId] = useState(null)
  const [editedCommentText, setEditedCommentText] = useState("")

  const toggleDropdown = (commentId, commentText) => {
    setVisibleDropdown(visibleDropdown === commentId ? null : commentId)
    setEditedCommentText(commentText)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isEditing && editedCommentId) {
      await saveEditedComment()
    } else {
      await addComment()
    }
  }

  const addComment = async () => {
    try {
      await createComment({ postId: id, comment: commentText })
      setComments((prevComments) => [
        ...prevComments,
        { _id: Date.now(), comment: commentText, createdAt: new Date(), likes: [] },
      ])
      setCommentText("")
    } catch (error) {
      console.error("Ошибка при создании комментария:", error)
    }
  }

  const saveEditedComment = async () => {
    try {
      await editComment({ id: editedCommentId, comment: editedCommentText })
      setIsEditing(false)
      setEditedCommentId(null)
      fetchComments()
    } catch (error) {
      console.error("Ошибка при редактировании комментария:", error)
    }
  }

  const handleEditClick = (commentId, commentText) => {
    toggleDropdown(commentId, commentText)
    setIsEditing(true)
    setEditedCommentId(commentId)
  }

  const handleDeleteClick = async (commentId) => {
    try {
      await deleteComment(commentId)
      fetchComments()
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error)
    }
  }

  console.log(comments)

  const contentComment = comments
    ? comments.map((comment) => (
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
              <button className="dropdown-edit" onClick={() => handleEditClick(comment._id, comment.comment)}>
                Редактировать
              </button>
              <button className="dropdown-delete" onClick={() => handleDeleteClick(comment._id)}>
                Удалить
              </button>
            </div>
          )}
          <div className="comment__button-heart">
            <button
              className="button-like"
              onClick={() => handleLike(comment._id)}
            >
              <img src={heart} alt="No image" />
              <p className="int">{comment.likes.length}</p>
            </button>
          </div>
        </div>
      ))
    : null

  return (
    <div className="newComment">
      <div className="comment-block">
        <li className="username">
          <Avatar className="avatar" name={user.username} round={true} size="50px" />
        </li>
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            value={isEditing ? editedCommentText : commentText}
            onChange={(e) => (isEditing ? setEditedCommentText(e.target.value) : setCommentText(e.target.value))}
            className="comment-text"
            placeholder={isEditing ? "Отредактируйте свой комментарий здесь..." : "Оставьте свой комментарий здесь..."}
          />
          <button type="submit" className="comment-button">
            {isEditing ? "Сохранить" : "Отправить"}
          </button>
        </form>
      </div>
      {isLoading ? <p>Комментарии загружаются...</p> : <div className="comments">{contentComment}</div>}
    </div>
  )
}

export default Comment
