import { Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import MainPage from './page/MainPage/MainPage.jsx'
import Footer from './components/Footer/Footer.jsx'
import Authorization from './page/Authorization/Authorization.jsx'
import Post from './page/Post/Post.jsx'
import Registration from './page/Registration/Registration.jsx'
import React, { useState, useEffect } from "react";
import UserCabinet from './page/UserCabinet/UserCabinet.jsx'
import CreatePost from './page/CreatePost/CreatePost.jsx'
import LikePosts from './page/LikePosts/LikePosts.jsx'
import './App.css'
import { useDispatch } from 'react-redux';
import { setUsers } from './redux/userSlice';
import { useGetMeQuery } from './redux/userAuthAPI';

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { data: userData, refetch } = useGetMeQuery();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      refetch().then(({ data }) => {
        if (data) {
          dispatch(setUsers(data));
          setUser(data);
        } else {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refToken');
          localStorage.removeItem('user');
          setUser(null);
        }
      });
    }
  }, [dispatch, refetch]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

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
