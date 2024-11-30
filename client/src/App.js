import React from 'react'
import Landing from './components/landing/Landing'
import './App.css';
import Wrapper from './components/global/Wrapper';
import Login from './components/login and signup/Login';
import Signup from './components/login and signup/Signup';
import { Outlet } from 'react-router-dom';
const App = () => {
  return (

    <>
    <Outlet/>
    </>
   

  )
}

export default App