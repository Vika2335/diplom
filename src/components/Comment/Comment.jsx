import React, { useState } from 'react';
import './Comment.css'
import { useSelector } from 'react-redux';
import Avatar from 'react-avatar';
import { useCommentPostMutation } from '../../redux/commentPost'

function Comment({ postId }) {
  const user = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div className='newComment'>
      <div className='comment-block'>
        {user.email ? ( <li className='username'><Avatar className='avatar' name={user.username} round={true} size='50px'/></li> ) : (<p></p>)}
        <CommentForm postId={postId} onAddComment={addComment} />
      </div>
      <ul className='comments'>
        {comments.map((comment, index) => (
          <li key={index}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}

function CommentForm({ postId }) {
  const [commentText, setCommentText] = useState('');
  const [commentPost, { isLoading, isError }] = useCommentPostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await commentPost(postId, { commentText });
      setCommentText('');
    } catch (error) {
      console.error('Ошибка при отправке комментария:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='comment-form'>
      <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} className='comment-text'placeholder='Оставьте свой комментарий здесь...'/>
      <button type="submit" disabled={isLoading} className='comment-button'>{isLoading ? 'Отправка...' : 'Отправить'}</button>
      {isError && <div className='error'>Ошибка при отправке комментария</div>}
    </form>
  );
}

export default Comment;