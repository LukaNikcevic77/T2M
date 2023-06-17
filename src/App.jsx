import './styles/style.scss'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import WelcomeScreen from './components/WelcomeScreen'
import { SignInUpContextProvider } from "./context/SignInUpContext";
function App() {
  
  return (
    <>
    <SignInUpContextProvider>
    <BrowserRouter>
    <div className='mobile-navbar mobile-navbar-text-big' style={{display: 'none'}}>
    
    </div>
      <Routes>
      <Route path='/' element={<WelcomeScreen/>}></Route>
      <Route path='/Home' element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
    </SignInUpContextProvider>
    </>
  )

}

export default App
