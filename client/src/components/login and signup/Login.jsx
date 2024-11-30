import React, { useEffect, useRef, useState } from 'react';
import style from '../../styles/login/login.module.css';
import TodoImg from '../../images/todo.png';
import { Person, VisibilityOff, Key, Home, VisibilityRounded } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../axios/axios.js'; // Ensure this path is correct

import { loginSuccess } from '../../features/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart } from '../../features/userSlice.js';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [userInfo, navigate])

  const [show, setShow] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    dispatch(loginStart());

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
     
      const response = await api.post('/users/login', { email, password });
      console.log(response.data);
      dispatch(loginSuccess(response.data.user))
      localStorage.setItem('accessToken', response.data.accessToken);
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
  
      if (error.response) {
        console.error(error.response.data);
        setErrorMessage(error.response.data.error_message || 'An error occurred. Please try again.');
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
          <h2 className={`${style.title}`}>Login</h2>
          {errorMessage && <p className={style.error}>{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className={`${style.inputContainer}`}>
              <div className={`${style.inputBox}`}>
                <label className={`${style.inputLabel}`} htmlFor="email">Email address*</label>
                <div className={`${style.inputField}`}>
                  <div className={`${style.inputFieldIconBox}`}>
                    <Person className={`${style.inputFieldIcon}`} />
                  </div>
                  <div className={`${style.inputfieldMain}`}>
                    <input
                      name='email'
                      ref={emailRef}
                      className={`${style.inputEle}`}
                      type="text"
                      placeholder='Enter email address'
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
                      ref={passwordRef}
                      name="password"
                      className={`${style.inputEle}`}
                      type={show ? 'text' : 'password'}
                      placeholder='Enter password'
                      required
                    />
                  </div>
                  <div className={`${style.inputFieldIconBox2}`}>
                    {
                      show ?
                        <IconButton size='small' onClick={() => setShow((prev) => !prev)}>
                          <VisibilityRounded className={`${style.inputFieldIcon}`} />
                        </IconButton>
                        :
                        <IconButton size='small' onClick={() => setShow((prev) => !prev)}>
                          <VisibilityOff className={`${style.inputFieldIcon}`} />
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
                  Login
                </Button>
              </div>

              <div className={`${style.otherOption}`}>
                <p>Don't have an account?</p>
                <Button variant='text'
                  sx={{
                    textTransform: 'none',
                    borderRadius: 20
                  }}
                  onClick={() => navigate('/register')}
                >
                  Signup
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;