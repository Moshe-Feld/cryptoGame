import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import MainLayout from './layout/MainLayout.jsx'
import CreatGame from './pages/CreatGame.jsx'
import { UserProvider } from './context/userContext.jsx'
import Signup from './pages/Signup.jsx'
import Class from './pages/Class.jsx'
import ClassPage from './pages/ClassPage.jsx'
import Qoute from './pages/Qoute.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/sign-up' element={<Signup />} />
          <Route element={<MainLayout />}>
            <Route path='/home' element={<Home />} />
            <Route path='/startGame' element={<App />} />
            <Route path='/creatGame' element={<CreatGame />} />
            <Route path='/class' element={<ClassPage/>}/>
            <Route path='/class/:classId' element={<Class/>}/>
            <Route path='/qoute/:_id' element={<Qoute/>}/>
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
