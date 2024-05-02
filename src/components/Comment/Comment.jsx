import React, { useState } from 'react';
import './Comment.css'
import { useSelector } from 'react-redux';
import Avatar from 'react-avatar';
import { useCreateCommentMutation, useGetCommentPostsQuery } from "../../redux/commentPost"

function Comment({ postId }) {

  console.log(postId)
  const user = useSelector((state) => state.user);

  const { comments, isLoading, isError } = useGetCommentPostsQuery(postId);
  const [commentText, setCommentText] = useState('');
  const [createComment] = useCreateCommentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment({ postId, comment: commentText });
      setCommentText('');
    } catch (error) {
      console.error('Ошибка при создании комментария:', error);
    }
  };

  console.log(comments)

  const contentComment = comments ? (
    comments.map((comment) => (
      <ul className='comments' key={comment._id}>
        <li className='comment'>
          <div>{comment.text}</div>
          <button className='button-heart'>Like</button>
        </li>
      </ul>
    ))
  ) : null;

  console.log(comments, contentComment)
  return (
    <div className='newComment'>
      <div className='comment-block'>
        {user.email ? (
          <li className='username'>
            <Avatar className='avatar' name={user.username} round={true} size='50px' />
          </li>
        ) : (
          <p></p>
        )}
        <form onSubmit={handleSubmit} className='comment-form'>
          <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} className='comment-text' placeholder='Оставьте свой комментарий здесь...'/>
          <button type='submit' className='comment-button'>Отправить</button>
        </form>
      </div>
      {isLoading ? (
        <p>Комментарии загружаются...</p>
      ) : isError ? (
        <p>Ошибка загрузки комментариев.</p>
      ) : (
        <ul className='comments'>
          {contentComment}
        </ul>
      )}
    </div>
  )
}

export default Comment;