import React from 'react'
import './MainPage.css'
import { useGetPostsQuery } from '../../redux/postsApi'
import { Link } from 'react-router-dom'
import comment from '../../image/comment.svg';

function MainPage() {
  const { data: posts, isLoading } = useGetPostsQuery();
  
  if (isLoading) return <h1>Loading...</h1>

  const contentPosts = posts.map((item) => {
    return(
      <div className='post' key={item._id}>
        <Link className='link' to={`/post/${item._id}`}>
          <div className='post__button'>
            <h2 className='title'>{item.header}</h2>
            <p className='description'>{item.body}</p>
            <p className='tags'>{item.tags}</p>
            <div className='post__content'>
              <div className='views'>
                <p className='int'>2.2K</p>
              </div>
              <div className='comment'>
                <p className='int'>10</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }) 

  return (
    <>
      <main>
        <section className='main'>
          <div className="container">
            <div className="posts__gallery">
              {contentPosts}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default MainPage;