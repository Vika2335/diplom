import React from 'react'
import './Post.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOnePostQuery } from '../../redux/postsApi';
import comment from '../../image/icons/comment.svg';
import eye from '../../image/icons/eye.svg'
import heart from '../../image/icons/heart.svg'
import datetime from '../../image/icons/datetime.svg'
import { format } from 'date-fns';

function Post() {
  const { id } = useParams();
  const { data: post, isLoading } = useGetOnePostQuery(id);

  //const [liked, setLiked] = useState(false);

  const navigate = useNavigate();

  const backButton = () => {
    navigate('/');
  }

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
                        <p className='int'>{post.likes.length}</p>
                        <button className='button-heart' onClick={() => alert('jgjgj')}><img src={heart} alt='No image'/></button>
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
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Post