import React from 'react'
import './MainPage.css'
import { posts } from '../../utils/post'
import { Link } from 'react-router-dom'

function MainPage() {
  const contentPosts = posts.map((item) => {
    return(
      <div className='post' key={item.id}>
        <Link to={`/post/${item.id}`}>
          <button className='post__button'>
            <h2 className='title'>{item.name}</h2>
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
            <div className="post-content">
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