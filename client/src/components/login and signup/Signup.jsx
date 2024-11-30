import React, { useState } from 'react';
import style from '../../styles/login/login.module.css';
import TodoImg from '../../images/todo.png';
import { Person, VisibilityOff, Key, Home, VisibilityRounded } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import api from "../../axios/axios.js"


const Signup = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });


  const [errorMessage, setErrorMessage] = useState('');


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      
      const response = await api.post('/users/register', formData);
      console.log(response.data); 
      alert('User registered successfully!');
      navigate('/login'); 
    } catch (error) {
     
      if (error.response) {
        console.error(error.response.data);
        setErrorMessage(error.response.data.message || 'An error occurred. Please try again.');
      } else {
        console.error('Error:', error.message);
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className={`${style.container}`}>
      <div className={`${style.subContaier}`}>
        <div className={`${style.left}`}>
          <img width={250} src={TodoImg} alt="" />
          <div className={`${style.contentBox}`}>
            <IconButton
              sx={{
                background: 'var(--blue)',
                color: 'var(--white)',
              }}
              onClick={() => navigate('/')}
            >
              <Home />
            </IconButton>
            <p className={`${style.heading}`}>Task Management System</p>
            <p className={`${style.subtitle}`}>Join us today to start managing your tasks and boost your productivity</p>
          </div>
        </div>
        <div className={`${style.right}`}>
          <h2 className={`${style.title}`}>Register</h2>
          {errorMessage && <p className={style.error}>{errorMessage}</p>} 
          <form onSubmit={handleSubmit}>
            <div className={`${style.inputContainer}`}>
              <div className={`${style.inputBox}`}>
                <label className={`${style.inputLabel}`} htmlFor="username">Username*</label>
                <div className={`${style.inputField}`}>
                  <div className={`${style.inputFieldIconBox}`}>
                    <Person className={`${style.inputFieldIcon}`} />
                  </div>
                  <div className={`${style.inputfieldMain}`}>
                    <input
                      className={`${style.inputEle}`}
                      type="text"
                      name="username"
                      placeholder='Enter username'
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={`${style.inputBox}`}>
                <label className={`${style.inputLabel}`} htmlFor="email">Email*</label>
                <div className={`${style.inputField}`}>
                  <div className={`${style.inputFieldIconBox}`}>
                    <Person className={`${style.inputFieldIcon}`} />
                  </div>
                  <div className={`${style.inputfieldMain}`}>
                    <input
                      className={`${style.inputEle}`}
                      type="email"
                      name="email"
                      placeholder='Enter email address'
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={`${style.inputBox}`}>
                <label className={`${style.inputLabel}`} htmlFor="password">Password*</label>
                <div className={`${style.inputField}`}>
                  <div className={`${style.inputFieldIconBox}`}>
                    <Key className={`${style.inputFieldIcon}`} />
                  </div>
                  <div className={`${style.inputfieldMain}`}>
                    <input
                      className={`${style.inputEle}`}
                      type={show ? 'text' : 'password'}
                      name="password"
                      placeholder='Enter password'
                      value={formData.password}
                      onChange={handleChange}
                      required

                    />
                  </div>
                  <div className={`${style.inputFieldIconBox2}`}>
                    {
                      show ?


                        <IconButton size='small'>
                          <VisibilityRounded className={`${style.inputFieldIcon}`}
                            onClick={() => setShow((prev) => !prev)}
                          />
                        </IconButton>
                        :

                        <IconButton size='small'>
                          <VisibilityOff className={`${style.inputFieldIcon}`}
                            onClick={() => setShow((prev) => !prev)}
                          />
                        </IconButton>
                    }
                  </div>
                </div>
              </div>

              <div className={`${style.buttonBox}`}>
                <Button variant='contained' type="submit"
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: '20px',
                    padding: '8px 40px',
                    boxShadow: 'none'
                  }}
                >
                  Signup
                </Button>
              </div>

              <div className={`${style.otherOption}`}>
                <p>Already have an account?</p>
                <Button variant='text'
                  sx={{
                    textTransform: 'none',
                    borderRadius: 20
                  }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;