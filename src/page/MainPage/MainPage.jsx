import React from 'react'
import './MainPage.css'
import { useGetPostsQuery } from '../../redux/postsApi'
import { Link } from 'react-router-dom'

function MainPage() {
  const { data: posts, isLoading } = useGetPostsQuery();
  
  if (isLoading) return <h1>Loading...</h1>

  const contentPosts = posts.map((item) => {
    return(
      <div className='post' key={item._id}>
        <Link to={`/post/${item._id}`}>
          <button className='post__button'>
            <h2 className='title'>{item.header}</h2>
          </button>
        </Link>
      </div>
    )
  }) 

  return (
    <>
      <main>
        <section>
          <div className="container">
            <div className="main__post-content">
              <h1 className='posts__heading'>Blog</h1>
              <div className='posts'>
                {contentPosts}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default MainPage