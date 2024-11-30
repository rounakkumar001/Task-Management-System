import React from 'react'

import style from '../../styles/landing/footer.module.css';
import { Phone, Markunread, PinDrop, LinkedIn, Facebook, X, Instagram, MailOutline, Send } from '@mui/icons-material'
import { Button } from '@mui/material';
import { Element } from 'react-scroll';

const Footer = () => {
    return (
        <Element name='footer' className={`${style.container}`}>
            <div className={`${style.grid}`}>
                <div className={`${style.gridItem}`}>
                    <p className={`${style.contactTitle}`}>Contact us</p>
                    <div className={`${style.contactItems}`}>
                        <div className={`${style.item}`}>
                            <Phone className={`${style.icon}`} /> <p className={`${style.contact}`}>+91 (000) 000-0000</p>
                        </div>
                        <div className={`${style.item}`}>

                            <Markunread className={`${style.icon}`} /> <p className={`${style.contact}`}>support@tasktrack.com</p>
                        </div>
                        <div className={`${style.item}`}>
                            <PinDrop className={`${style.icon}`} /> <p className={`${style.contact}`}>501010, Electronic City, Bengaluru, Karnataka</p>
                        </div>
                    </div>
                </div>
                <div className={`${style.gridItem}`}>
                    <p className={`${style.contactTitle}`}>Social media</p>
                    <div className={`${style.socialIcons}`}>
                        <LinkedIn className={`${style.socialIcon}`} />
                        <Facebook className={`${style.socialIcon}`} />
                        <X className={`${style.socialIcon}`} />
                        <Instagram className={`${style.socialIcon}`} />
                    </div>
                </div>
                <div className={`${style.gridItem}`}>
                    <p className={`${style.contactTitle}`}>Newsletter</p>
                    <p className={`${style.subtitle}`}>Stay updated with the latest features and tips! Subscribe to our newsletter.</p>
                    <div className={`${style.inputBox}`}>
                        <div className={`${style.inputIcon}`}>
                            <MailOutline />
                        </div>
                        <div  className={`${style.inputTextBox}`}>

                            <input className={`${style.input}`} type="text" name="" id="" 
                            placeholder='Email address'
                            />
                        </div>
                    </div>
                    <div className={`${style.subscribeBox}`} >
                            <Button variant='contained'
                            sx={{
                                borderRadius : '20px',
                                textTransform : 'none',
                                fontSize : '1rem'
                            }}
                            endIcon={<Send/>}
                            >
                                Subscribe
                            </Button>
                        </div>
                </div>
            </div>
            <p className={`${style.copyrightLine}`}>© 2024 | www.tasktrack.com | All rights reserved</p>
        </Element>
    )
}

export default Footer