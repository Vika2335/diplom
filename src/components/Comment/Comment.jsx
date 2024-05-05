import React, { useEffect, useState } from "react"
import "./Comment.css"
import { useSelector } from "react-redux"
import Avatar from "react-avatar"
import {
  useCreateCommentMutation,
  useGetCommentPostsMutation,
} from "../../redux/commentPost"
import heart from "../../image/icons/heart.svg"
import { format } from "date-fns"

function Comment({ postId }) {
  const user = useSelector((state) => state.user)

  const [test, { isLoading }] = useGetCommentPostsMutation()
  const [comments, setComments] = useState(null)

  const [likedCount, setLikedCount] = useState(0);

  useEffect(() => {
    if (postId) {
      test(postId)
        .unwrap()
        .then((res) => setComments(res))
    }
  }, [postId])

  const [commentText, setCommentText] = useState("")
  const [createComment] = useCreateCommentMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createComment({ postId, comment: commentText })
      test(postId)
        .unwrap()
        .then((res) => setComments(res))
      setCommentText("")
    } catch (error) {
      console.error("Ошибка при создании комментария:", error)
    }
  }

  const contentComment = comments
    ? comments.map((comment) => (
        <div className="comment-block" key={comment._id}>
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
          <div className="comment__button-heart">
            <button className="button-like">
              <img src={heart} alt="No image" />
              <p className="int">{likedCount}</p>
            </button>
          </div>
        </div>
      ))
    : null

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
          <p></p>
        )}
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="comment-text"
            placeholder="Оставьте свой комментарий здесь..."
          />
          <button type="submit" className="comment-button">
            Отправить
          </button>
        </form>
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