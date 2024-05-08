import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import MainPage from './page/MainPage/MainPage.jsx'
import './App.css'
import Footer from './components/Footer/Footer.jsx'
import Authorization from './page/Authorization/Authorization.jsx'
import Post from './page/Post/Post.jsx'
import Registration from './page/Registration/Registration.jsx'
import React, { useState } from "react";
import UserCabinet from './page/UserCabinet/UserCabinet.jsx'
import CreatePost from './page/CreatePost/CreatePost.jsx'
import LikePosts from './page/LikePosts/LikePosts.jsx'

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Header user={user}/>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/authorization' element={<Authorization setUser={setUser}/>}/>
        <Route path='/registration' element={<Registration />}/>
        <Route path='/post/:id' element={<Post />}/>
        <Route path='/userCabinet' element={<UserCabinet />}></Route>
        <Route path='/createPost' element={<CreatePost />}></Route>
        <Route path='/likePosts' element={<LikePosts />}></Route>
      </Routes> 
      <Footer />
    </>
  )
}

export default App
