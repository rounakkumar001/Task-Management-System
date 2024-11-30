import React, { useEffect, useState } from 'react';
import styles from '../../styles/dashboard/dashboard.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import { ViewList, PlaylistAdd, ManageAccounts } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

const Dashboard = () => {
    const [position, setPosition] = useState({ x: -130, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e) => {
        if (dragging) {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y
            });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    useEffect(() => {
        if (dragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);

    return (
        <div className={styles.container}>
            <Outlet />
            <nav 
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`, 
                    cursor: dragging ? 'grabbing' : 'grab',
                    background :'var(--ternary)' 
                }} 
                onMouseDown={handleMouseDown}
                className={styles.nav} 
            >
                 <Tooltip title='Dashboard' arrow>
                <NavLink to={'/dashboard/view-task'}>
                    {({ isActive }) => (
                        <>
                            {isActive && <div className={styles.activeCircle}></div>}
                           
                            <ViewList className={isActive ? styles.navIconActive : styles.navIcon} />
                           
                        </>
                    )}
                </NavLink>
                </Tooltip>


                <Tooltip title='Create new task' arrow>
                <NavLink to={'/dashboard/create-task'}>
                    {({ isActive }) => (
                        <>
                            {isActive && <div className={styles.activeCircle} style={{ left: '110px' }}></div>}
                            <PlaylistAdd className={isActive ? styles.navIconActive : styles.navIcon} />
                        </>
                    )}
                </NavLink>
                </Tooltip>

                <Tooltip title='Profile' arrow>
                <NavLink to={'/dashboard/manage'}>
                    {({ isActive }) => (
                        <>
                            {isActive && <div className={styles.activeCircle} style={{ left: '186px' }}></div>}
                            <ManageAccounts className={isActive ? styles.navIconActive : styles.navIcon} />
                        </>
                    )}
                </NavLink>
                </Tooltip>
            </nav>
        </div>
    );
};

export default Dashboard;