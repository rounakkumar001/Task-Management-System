import React, { useState } from 'react';
import style2 from '../../styles/tasks/tasks.module.css';
import {
  HourglassTopRounded,
  MoreVertRounded,
  EditNoteRounded,
  DeleteSweepRounded,
  Close,
  Delete,
  EditNote,
  CheckCircle
} from '@mui/icons-material';
import { IconButton, Dialog, DialogTitle, DialogActions, Button, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { updateTaskStatus } from '../../features/taskSlice.js';
import { useDispatch } from 'react-redux';

const Task = ({ task, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog visibility
  const [openDetailDialog, setopenDetailDialog] = useState(false); // State to manage dialog visibility
  const [newStatus, setNewStatus] = useState(task.status); // State to hold new status
  const navigate = useNavigate();
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      onDelete(task._id); // Call the delete function passed as a prop
    }
  };

  const handleEdit = () => {
    navigate('/dashboard/create-task', { state: { task } }); // Navigate and pass task data
  };


  const handleStatusChange = () => {
    setOpenDialog(true); // Open dialog when changing status
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close dialog
  };

  const handleConfirmStatusChange = () => {


    dispatch(updateTaskStatus(task._id, newStatus))
    // Call function to update status
    handleCloseDialog(); // Close dialog after confirming
  };

  const getBgColor = (priority) => {
      if(priority === "high"){
        return 'var(--high)'
      }
      else if(priority === 'low'){
        return 'var(--success)';
      }
      else{
        return 'var(--medium)'
      }
  }

  return (
    <div className={`${style2.card}`}>
      <div className={`${style2.status} ${task?.status === "completed" && style2.done}`}>
        {
          task?.status === "completed" ?
          <CheckCircle sx={{ color: 'var(--primary)' }} />
          :
          <HourglassTopRounded sx={{ color: 'var(--primary)' }} />
        }
        
      </div>
      <div>
        
        <h2 className={`${style2.taskHead}`} onClick={() => setopenDetailDialog(true)}>
        <Tooltip title="Click to view details" arrow>  {task.title} </Tooltip>
          </h2>
        
        <div className={`${style2.details}`}>
          <div className={`${style2.detail}`} style={{ background: 'var(--secondary)' }}>
            Due Date: {new Date(task.dueDate).toLocaleDateString()}
          </div>
          <div className={`${style2.detail}`} style={{ background: 'var(--quaternary)' }}>
            Status: {task.status}
          </div>
          <div className={`${style2.detail}`} style={{ background: getBgColor(task.priority)}}>
            Priority: {task.priority}
          </div>
          <div>
            <Tooltip title="Change status" arrow>
            <IconButton

              onClick={() => handleStatusChange()}
            >
              <MoreVertRounded />
            </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className={`${style2.rightbtn}`}>
          {/* Edit Button */}
          <Tooltip title="Edit task" arrow>
          <IconButton
            sx={{
              color: 'var(--white)',
              background: 'var(--primary)',
              border: '5px solid var(--ternary)',
              '&:hover': {
                background: 'var(--medium)',
              }
            }}
            onClick={handleEdit} // Call the edit function passed as a prop
          >
            <EditNoteRounded sx={{ fontSize: '1.5rem' }} />
          </IconButton>
          </Tooltip>

          {/* Delete Button with Confirmation */}
          <Tooltip title="Delete task" arrow>
          <IconButton
            sx={{
              color: 'var(--primary)',
              background: 'var(--primary)',
              border: '5px solid var(--ternary)',
              marginTop: '10px',
              '&:hover': {
                background: 'var(--medium)',
              }
            }}
            onClick={handleDelete} // Call handleDelete for confirmation
          >
            <DeleteSweepRounded sx={{ fontSize: '1.5rem', color: 'var(--danger)' }} />
          </IconButton>
          </Tooltip>
        </div>
      </div>
      {/* Dialog for Status Change */}
      <Dialog open={openDetailDialog} onClose={() => setopenDetailDialog(false)}>
        <div className={`${style2.detailDialog}`}>
          <div style={{
            display: 'flex',
            justifyItems: 'center',
            justifyContent: 'end',
            cursor: 'pointer'
          }}>
            <Tooltip title="Close" arrow>
            <IconButton
              onClick={() => setopenDetailDialog(false)}
            >

              <Close />
            </IconButton>
            </Tooltip>
          </div>
          <h2 className={`${style2.dialoghead}`}>{task.title}</h2>
          <p>{task.description}</p>
          <div className={`${style2.details}`}>
            <div className={`${style2.detail}`} style={{ background: 'var(--secondary)' }}>
              Due Date: {new Date(task.dueDate).toLocaleDateString()}
            </div>
            <div className={`${style2.detail}`} style={{ background: 'var(--quaternary)' }}>
              Status: {task.status}
            </div>
            <div className={`${style2.detail}`} style={{ background: 'var(--high)' }}>
              Priority: {task.priority}
            </div>
            <div>
              <IconButton
                onClick={() => handleStatusChange()}
              >
                <MoreVertRounded />
              </IconButton>
            </div>
          </div>
          <div className={`${style2.dialogBtnGrp}`}>
          <Button endIcon={<EditNote/>}  sx={{background : 'var(--primary)', marginRight  : '10px'}} className={`${style2.btn}`} variant='contained'
          onClick={() => handleEdit()}
          
          >Edit</Button>

          <Button endIcon={<Delete/>} sx={{background : 'var(--danger)'}} className={`${style2.btn}`} variant='contained' 
           onClick={() => handleDelete()}
          >Delete</Button>
          </div>
        </div>
      </Dialog>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Select Task Status</DialogTitle>
        <div style={{ padding: 20 }}>
          <label className={`${style2.dialogLable}`}>
            <input
              type="radio"
              value="pending"
              checked={newStatus === "pending"}
              onChange={(e) => setNewStatus(e.target.value)}
            />
            &nbsp; Pending
          </label>
          <br />
          <label className={`${style2.dialogLable}`}>
            <input
              type="radio"
              value="completed"
              checked={newStatus === "completed"}
              onChange={(e) => setNewStatus(e.target.value)}
            />
            &nbsp; Complete
          </label>
        </div>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmStatusChange} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};




export default Task;