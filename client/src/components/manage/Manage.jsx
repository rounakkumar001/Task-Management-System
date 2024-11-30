import React from 'react';
import styles from '../../styles/manage/manage.module.css'; 
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';

const Manage = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const handleLogout = () => {
    const confirmLogOut = window.confirm("Are you sure you want to logout?");
    if (confirmLogOut) {
      dispatch(logoutUser());
      navigate('/');
    }
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.subcontainer}`}>
        <h2>User Management</h2>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Username</td>
              <td><strong>{userInfo.username}</strong></td>
            </tr>
            <tr>
              <td>Email</td>
              <td><strong>{userInfo.email}</strong></td>
            </tr>
            <tr>
              <td>Account Created On</td>
              <td><strong>{new Date(userInfo.createdAt).toLocaleDateString()}</strong></td>
            </tr>
          </tbody>
        </table>

        <div className={styles.logoutButton}>
          <Button
            onClick={handleLogout}
            variant='contained' 
            sx={{
              background: 'var(--primary)',
              marginTop: '20px',
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Manage;