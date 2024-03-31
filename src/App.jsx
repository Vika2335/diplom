import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import MainPage from './page/MainPage/MainPage.jsx'
import './App.css'
import Footer from './components/Footer/Footer.jsx'
import Authorization from './page/Authorization/Authorization.jsx'
import Post from './page/Post/Post.jsx'
import Registration from './page/Registration/Registration.jsx'
import React, { useState } from "react";

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
      </Routes> 
      <Footer />
    </>
  )
}

export default App
