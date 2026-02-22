import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Login from './pages/Login.jsx'
import ResetPass from './pages/ResetPass.jsx'
import Home from './pages/Home.jsx'
import Game from './pages/Game.jsx'
import MainLayout from './layout/MainLayout.jsx'
import { UserProvider } from './context/userContext.jsx'
import Signup from './pages/Signup.jsx'
import Class from './pages/Class.jsx'
import ClassPage from './pages/ClassPage.jsx'
import Wiki from './pages/Wiki.jsx'
import WikiHome from './pages/WikiHome.jsx'
import Qoute from './pages/Qoute.jsx'
import Profile from './pages/Profile.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/reset-pass' element={<ResetPass/>}/>
          <Route element={<MainLayout />}>
            <Route path='/home' element={<Home />} />
            <Route path='/startGame' element={<Game/>}/>
            <Route path='/startWiki/:category' element={<Wiki />} />
            <Route path='/homeWiki' element={<WikiHome />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/class' element={<ClassPage />} />
            <Route path='/class/:_id' element={<Class />} />
            <Route path='/quote/:_id' element={<Qoute/>}/>
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
