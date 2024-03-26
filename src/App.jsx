import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import MainPage from './page/MainPage/MainPage.jsx'
import './App.css'
import Footer from './components/Footer/Footer.jsx'
import Authorization from './page/Authorization/Authorizatiom.jsx'
import Post from './page/Post/Post.jsx'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/authorization' element={<Authorization />}/>
        <Route path='/post' element={<Post />}/>
      </Routes> 
      <Footer />
    </>
  )
}

export default App
