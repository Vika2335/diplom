import React from 'react'
import './Post.css'
import { posts } from '../../utils/post'
import { useParams } from 'react-router-dom';

function Post(props) {
  const { id } = useParams();
  const postId = parseInt(id);
  
  const postData = posts.find(post => post.id === postId) || {};

  return (
    <>
      <main>
        <section>
          <div className="container">
          <div className='posts'>
            <div className='post-content'>
              <div className='post__name'>
                <h2 className='post__title'>{postData.name}</h2>
                <p>{postData.description}</p>
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