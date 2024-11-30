import React from 'react';
// import Lottie from 'lottie-react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Star, StarHalf, StarBorder } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
// import Dp from '../img/dp.json'
import slides from './testimonial-slides-data.js';


const img = 'https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg'



const Testimonial = () => {


    return (
        <>
            <Box mt={7} mb={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.4rem', color: '#ffffff' }}>Testimonial</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', color: 'grey' }}>My client saying</Typography>

            </Box>
            <Carousel
                autoPlay={true}
                interval={3000} // 1 second interval
                infiniteLoop={true} // Enable infinite looping
                showArrows={false}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                emulateTouch={true}
                centerMode={true}
                renderArrowPrev={(clickHandler, hasPrev) => hasPrev && <button onClick={clickHandler}>Previous</button>}
                renderArrowNext={(clickHandler, hasNext) => hasNext && <button onClick={clickHandler}>Next</button>}
            >
                {slides.map((slide, index) => (
                    <div key={index}>
                        <div style={slideContainerStyle}>
                            {slide.map((card, cardIndex) => (
                                <div key={cardIndex} style={cardStyle}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={card.imageUrl} alt={`Slide ${index + 1}`} style={imageStyle} />
                                    
                                        <Box>
                                            <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#ffffff', padding : '0px 10px' }}>{card.name}</Typography>
                                            {
                                                card.rating === 2 ?
                                                    <Box>
                                                        <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                        <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                        <StarBorder sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                        <StarBorder sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                        <StarBorder sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                    </Box>
                                                    :
                                                    (card.rating === 3) ?
                                                        <Box>
                                                            <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                            <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                            <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                            <StarBorder sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                            <StarBorder sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                        </Box>
                                                        :
                                                        (card.rating === 4) ?
                                                            <Box>
                                                                <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                                <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                                <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                                <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                                <StarBorder sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                            </Box>
                                                            :
                                                            (card.rating === 4.5) ?
                                                                <Box>
                                                                    <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                                    <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                                    <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                                    <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                                    <StarHalf sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                                </Box>
                                                                : (card.rating === 5) ?
                                                                    <Box>
                                                                        <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                                        <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                                        <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                                        <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                                        <Star sx={{ fontSize: '.8rem', color: '#fc6736' }} />
                                                                    </Box> :
                                                                    null
                                            }

                                        </Box>
                                    </Box>
                                    <Typography sx={{    fontSize: '.9rem', marginTop : '.5rem' }}>"{card.message}"</Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </Carousel>
            <Box id={"contact"}></Box>
        </>
    );
};

const slideContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
};

const cardStyle = {
    flex: '0 0 30%', // Adjust card width as needed (33.33% to display three cards per row)
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    // textAlign: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    margin: '0 5px', // Adjust card margin as needed
    transition: 'transform 0.3s ease', // Transition effect
    '&:hover': {
        transform: 'scale(1.05)' // Scale up on hover
    }
};

const imageStyle = {
    width: '40px',
    height: '40px',
    // marginBottom: '10px',
    borderRadius : '50px'
};

export default Testimonial;
