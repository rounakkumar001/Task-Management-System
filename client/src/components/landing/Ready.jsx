import React from 'react'
import style from '../../styles/landing/ready.module.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {KeyboardDoubleArrowRight} from '@mui/icons-material'
const Ready = () => {
  const navigate = useNavigate();
  return (
    <div className={`${style.container}`}>
        <div className={`${style.subcontainer}`}>
            <h2 className={`${style.heading}`}>Ready to Get Started?</h2>
            <p className={`${style.para}`}>Join thousands of users who are managing their tasks effectively</p>

            <Button variant='contained'
            
            sx={{
                borderRadius : '20px',
                marginTop : 2
            }}
            onClick={() => navigate('/register')}
            endIcon={<KeyboardDoubleArrowRight/>}
            >Sign Up Now</Button>
            <Button variant='text'
            sx={{
                color : '#ffffff',
                textTransform: 'none'
            }}
          
            >Learn more</Button>
        </div>
        
    </div>
  )
}

export default Ready