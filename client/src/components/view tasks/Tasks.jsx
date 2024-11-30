import React, { useState } from 'react';
import styles from '../../styles/create task/createtask.module.css';
import style2 from '../../styles/tasks/tasks.module.css';
import { AssignmentTurnedIn, AddCircleRounded, SyncRounded, SearchRounded, TuneRounded } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import TaskList from './TaskList';

const Task = () => {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 

  const handlePriorityChange = (e) => {
    // alert(e.target.value)
    setSearchQuery(e.target.value);
  }

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.subcontainer}`}>
        <div className={`${style2.innerContainer}`}>
          <div className={`${styles.heading}`}>
            <div className={`${styles.companyTitle}`}>
              <AssignmentTurnedIn sx={{ fontSize: 18 }} />
              <p>TaskTrack <sup> ©</sup></p>
            </div>
            <p className={`${styles.sectionTitle}`}>Your Tasks</p>
          </div>

          {/* Search Section */}
          <div className={`${style2.searchSection}`}>
            <div className={`${style2.searchIcon}`}>
              <SearchRounded />
            </div>
            <input
              type="text"
              className={`${style2.searchInput}`}
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <div style={{ marginTop: '10px' }}>
              <label
                style={{ fontSize: '.8rem', paddingRight: '8px' }}
                htmlFor="priority">Priority</label>
              <select
                id='priority'
                value={searchQuery}
                onChange={handlePriorityChange}
                variant="outlined"
                style={{
                  borderRadius: '10px',
                  fontWeight: 'bold'
                }}
              >
                <option value="">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            
          </div>

        </div>

        {/* Task List Section */}
        <div className={`${style2.CardContainer}`}>
        

          <TaskList searchQuery={searchQuery} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>

      </div>
    </div>
  );
}

export default Task;