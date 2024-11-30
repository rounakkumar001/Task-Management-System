import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../../features/taskSlice'; // Adjust path as necessary
import Task from './Task'; // Import the Task component

const TaskList = ({ searchQuery, currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();
  const { tasks, loading, error, totalPages } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks(currentPage)); // Fetch tasks when component mounts or page changes
  }, [dispatch, currentPage]);

  const handleEdit = (task) => {
    console.log('Editing task:', task);
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId)); // Dispatch delete action
  };

  // Filter tasks based on the search query (title, priority or status)
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {loading && <p>Loading...</p>}
      {/* {error && <p>{error}</p>} */}
      
      {/* Render filtered list of tasks */}
      {filteredTasks.map((task) => (
        <Task key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
      
      {/* Handle case where no tasks match the search query */}
      {filteredTasks.length === 0 && !loading && (
        <p>No tasks found matching your search.</p>
      )}

      {/* Pagination Controls */}
      <div>
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default TaskList;