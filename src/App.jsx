import './styles/style.scss'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import WelcomeScreen from './components/WelcomeScreen'

function App() {
  
  return (
    <>
    <BrowserRouter>
    <div className='mobile-navbar mobile-navbar-text-big' style={{display: 'none'}}>
    
    </div>
      <Routes>
      <Route path='/' element={<WelcomeScreen/>}></Route>

      </Routes>
    </BrowserRouter>
    </>
  )

}

export default App
