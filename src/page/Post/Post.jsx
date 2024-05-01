import React, { useState } from 'react'
import './Post.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOnePostQuery } from '../../redux/postsApi';
import { useLikePostMutation } from '../../redux/likePost'
import comment from '../../image/icons/comment.svg';
import eye from '../../image/icons/eye.svg'
import heart from '../../image/icons/heart.svg'
import datetime from '../../image/icons/datetime.svg'
import { format } from 'date-fns';
import Comment from '../../components/Comment/Comment';

function Post() {
  const { id } = useParams();
  const { data: post, isLoading } = useGetOnePostQuery(id);
  const firstLikes = post?.likes?.length || 0;


  const [likedCount, setLikedCount] = useState(firstLikes);

  const navigate = useNavigate();

  const backButton = () => {
    navigate('/');
  }

  const { data: likedPost, error: likeError } = useLikePostMutation(id);

  const handleLike = async () => {
    try {
      if (likedPost) {
        setLikedCount(likedPost.likes.length);
      }
    } catch (error) {
      console.error('Ошибка при лайке поста:', error);
    }
  };

  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
      <main>
        <section>
          <div className="container">
            <div className='posts'>
              <div className='post-content'>
                <div className='button__back'>
                  <button className='back' onClick={backButton}>&lt;&lt;</button>
                </div>
                <div className='post__name'>
                  <h2 className='post__title'>{post.header}</h2>
                  <p className='post__description'>{post.body}</p>
                  <div className='information__post'>
                    <div className='post__content'>
                      <div className='views'>
                        <p className='view__int'>{post.viewCount}</p>
                        <img src={eye} alt='No image'/>
                      </div>
                      <div className='comment'>
                        <p className='int'>{post.comments.length}</p>
                        <img src={comment} alt='No image'/>
                      </div>
                      <div className='hearts'>
                        <p className='int'>{likedCount}</p>
                        <button className='button-heart' onClick={handleLike}><img src={heart} alt='No image'/></button>
                      </div>
                      <div className='post__tags'>
                        <p className='tag'>{post.tags}</p>
                      </div>
                    </div>
                    <div className='datetime'>
                      <p className='date'>{format(new Date(post.createdAt), 'dd.MM.yyyy')}</p>
                      <img src={datetime} alt='No image'/>
                    </div>
                  </div>
                </div>
              </div>
              <Comment postId={id}/>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Post