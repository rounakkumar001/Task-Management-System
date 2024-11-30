import React, { useState, useEffect } from 'react';
import styles from '../../styles/create task/createtask.module.css';
import { AssignmentTurnedIn, AddCircleRounded, SyncRounded } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import api from '../../axios/axios.js';
import { useLocation } from 'react-router-dom';

const CreateTask = () => {
    const location = useLocation(); 
    const task = location.state?.task; 

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('medium'); 
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setDueDate(task.dueDate.split('T')[0]); 
            setPriority(task.priority);
        }
    }, [task]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); 
        setSuccessMessage('');

   
        if (!title.trim()) {
            setErrorMessage('Task title is required.');
            return;
        }

        if (!dueDate) {
            setErrorMessage('Due date is required.');
            return;
        }

        try {
            const token = localStorage.getItem('accessToken');

            let response;

            if (task) {
           
                response = await api.post('/tasks/createTask', {
                    title,
                    description,
                    dueDate,
                    priority,
                    taskId: task._id 
                }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                
                response = await api.post('/tasks/createTask', {
                    title,
                    description,
                    dueDate,
                    priority,
                }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            
            setSuccessMessage(response.data.message);
           
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('medium');
        } catch (error) {
           
            if (error.response) {
                setErrorMessage(error.response.data.error_message || 'An error occurred while processing your request.');
            } else {
                setErrorMessage('An error occurred while processing your request.');
            }
        }
    };

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.subcontainer}`}>
                <div className={`${styles.heading}`}>
                    <div className={`${styles.companyTitle}`}>
                        <AssignmentTurnedIn sx={{ fontSize: 18 }} />
                        <p>TaskTrack <sup> ©</sup></p>
                    </div>
                    <p className={`${styles.sectionTitle}`}>{task ? 'Edit Task' : 'Create New Task'}</p>
                </div>
                <form onSubmit={handleSubmit} className={`${styles.formContainer}`}>
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                    {successMessage && <p className={styles.success}>{successMessage}</p>}

                    <div className={`${styles.inputBox}`}>
                        <div>
                            <label className={`${styles.label}`} htmlFor="task-title">Task Title*</label>
                        </div>
                        <div>
                            <input
                                id="task-title"
                                className={`${styles.input}`}
                                type="text"
                                placeholder='Enter task title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={`${styles.inputBox}`}>
                        <div style={{ marginTop: '20px' }}>
                            <label className={`${styles.label}`} htmlFor="task-description">Task Description (optional)</label>
                        </div>
                        <div>
                            <textarea
                                id="task-description"
                                style={{ height: '100px' }}
                                className={`${styles.input}`}
                                placeholder='Enter task description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={`${styles.inputBox}`}>
                        <div style={{ marginTop: '20px' }}>
                            <label className={`${styles.label}`} htmlFor="due-date">Due Date*</label>
                        </div>
                        <div>
                            <input
                                id="due-date"
                                className={`${styles.input}`}
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={`${styles.inputBox}`}>
                        <div style={{ marginTop: '20px' }}>
                            <label className={`${styles.label}`} htmlFor="priority-select">Priority Level</label>
                        </div>
                        <div>
                            <select
                                id="priority-select"
                                className={styles.select}
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                    </div>

                    <div className={`${styles.btnGroup}`}>
                       

                        <IconButton sx={{ color: 'var(--white)' }}>
                            <SyncRounded />
                        </IconButton>

                        <Button variant='contained' endIcon={<AddCircleRounded />}
                            sx={{ borderRadius: '20px' }}
                            type="submit" 
                        >
                            {task ? 'Update Task' : 'Add Task'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTask;