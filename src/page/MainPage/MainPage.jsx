import React from 'react'
import './MainPage.css'

function MainPage() {
  return (
    <>
      <main>
        <section>
          <div className="container">
            <div className="main">
              <div className='main-content'>
                <div className='post'><button className='main__button'>Знакомство</button></div>
                <div className='post'><button className='main__button'>2</button></div>
                <div className='post'><button className='main__button'>3</button></div>
                <div className='post'><button className='main__button'>4</button></div>
                <div className='post'><button className='main__button'>5</button></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default MainPage