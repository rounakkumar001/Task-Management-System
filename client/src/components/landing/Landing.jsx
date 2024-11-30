import React, { useEffect, useState } from 'react'
import style from '../../styles/landing/landing.module.css';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-scroll';

// material icons 
import { AssignmentTurnedInSharp } from '@mui/icons-material';
import Home from './Home';
import Features from './Features';
import HowWorks from './HowWorks';
import Testimonial from './Testimonial';
import Ready from './Ready';
import Footer from './Footer';
import { useSelector } from 'react-redux';


const Landing = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const userInfo = useSelector((state) => state.user.userInfo);

    useEffect(() => {
        if(userInfo){
            navigate('/dashboard', );
        }
    },[userInfo, navigate])

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false); 
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll); 
        return () => {
            window.removeEventListener('scroll', handleScroll); 
        };
    }, []);

    return (
        <div>
            <nav className={`${style.navbar} ${isScrolled && style.scrolled}`}>
                <div className={`${style.logoSection}`}>
                    <AssignmentTurnedInSharp
                        style={{ margin: 5 }}
                    />
                    <span className={`${style.logoName}`}> Task Track <sup>©</sup></span>
                </div>
                <ul className={`${style.navlinks}`} type="none">
                    <Link  to='home' className={`${style.link}`}>Home</Link>
                    <Link to='features' className={`${style.link}`}
                   
                    >Features</Link>
                    <li className={`${style.link}`}
                            onClick={() => navigate('/register')}
                        >Signup</li>
                    <li className={`${style.link}`}
                            onClick={() => navigate('/login')}
                    
                    >Login</li>
                    <Link to='footer' className={`${style.link}`}
                        
                    >Feedback</Link>
                </ul>
            </nav>

            {/* Home Section  */}
            <Home />

            {/* features section */}
            <Features/>

            {/* How It Works Section  */}
            <HowWorks/>

            {/* Testimonial  */}
            <Testimonial/>

            {/* how it works section  */}
            <Ready/>

            {/* footer  */}
            <Footer/>

        </div>
    )
}

export default Landing