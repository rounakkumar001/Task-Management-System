import React from 'react'
import style from '../../styles/landing/home.module.css';
import { Button, styled } from '@mui/material';
import { Element } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Element name='home' className={`${style.container}`}>
       <div className={style.bubble}></div>
    <h1 className={`${style.heading}`}>Welcome to Your  TaskTrack</h1>
    <h3 className={`${style.title}`}>Stay organized and boost your productivity with our simple task management system.</h3>
    <Button
        variant="contained"
        color="primary"
        sx={{
            borderRadius : 50,
            marginTop : 3,
            padding : '10px 30px',
            cursor : 'pointer'

        }}
        onClick={() => navigate('/register')}
    >Get Started</Button>
</Element>
  )
}

export default Home