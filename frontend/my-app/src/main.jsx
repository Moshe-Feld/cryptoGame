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
import Profile from './pages/Profile.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/login' element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path='/home' element={<Home />} />
            <Route path='/startGame' element={<App />} />
            <Route path='/creatGame' element={<CreatGame />} />
            <Route path='/profile' element={<Profile/>}/>
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
