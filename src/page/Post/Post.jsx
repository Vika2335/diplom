import React from 'react'
import './Post.css'
import { useParams } from 'react-router-dom';
import { useGetOnePostQuery } from '../../redux/postsApi';

function Post() {
  const { id } = useParams();
  const { data: post, isLoading } = useGetOnePostQuery(id);

  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
      <main>
        <section>
          <div className="container">
          <div className='posts'>
            <div className='post-content'>
              <div className='post__name'>
                <h2 className='post__title'>{post.header}</h2>
                <p>{post.body}</p>
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