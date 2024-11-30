import React from 'react'
import style from '../../styles/landing/howworks.module.css';

const HowWorks = () => {
  return (
    <div className={`${style.container}`}>
        <h3  className={`${style.heading}`}>How It Works</h3>
        <div className={`${style.item}`}>
            <div className={`${style.num}`}>1</div>
            <div className={`${style.description}`}>Sign up for a free account.</div>
        </div>
        <div className={`${style.item2}`}>
            <div className={`${style.num2}`}>2</div>
            <div className={`${style.description}`}>Create and manage your tasks easily.</div>
        </div>
        <div className={`${style.item3}`}>
            <div className={`${style.num}`}>3</div>
            <div className={`${style.description}`}>Stay on top of your deadlines and priorities.</div>
        </div>
        
    </div>
  )
}

export default HowWorks