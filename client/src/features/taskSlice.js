import { createSlice } from '@reduxjs/toolkit';
// import api from '../../axios/axios.js'; // Adjust the path as necessary

import api from '../axios/axios.js';
// Create task slice
const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
        totalPages: 0,
        currentPage: 1,
    },
    reducers: {
        setTasks(state, action) {
            state.tasks = action.payload.data; // Set fetched tasks
            state.totalPages = action.payload.totalPages; // Set total pages
            state.currentPage = action.payload.currentPage; // Set current page
        },
        addTask(state, action) {
            state.tasks.push(action.payload); // Add new task to tasks array
        },
        setLoading(state, action) {
            state.loading = action.payload; // Set loading status
        },
        setError(state, action) {
            state.error = action.payload; // Set error message
        },
        clearTasks(state) {
            state.tasks = [];
            state.totalPages = 0;
            state.currentPage = 1;
        },
    },
});

// Export actions and reducer
export const { setTasks, addTask, setLoading, setError, clearTasks } = taskSlice.actions;
export default taskSlice.reducer;

// Async actions for fetching and creating tasks
export const fetchTasks = (page) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await api.get(`/tasks/fetchTask?page=${page}&limit=10`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } // Include bearer token
        });
        dispatch(setTasks(response.data)); // Dispatch action to set tasks in the store
    } catch (error) {
        dispatch(setError(error.response?.data.error_message || 'An error occurred while fetching tasks.'));
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteTask = (taskId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await api.delete(`/tasks/deleteTask/${taskId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } // Include bearer token
        });
        dispatch(fetchTasks(1)); // Optionally clear tasks after deletion or refetch them if needed
    } catch (error) {
        dispatch(setError(error.response?.data.error_message || 'An error occurred while deleting the task.'));
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateTask = (updatedTask) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await api.put(`/tasks/${updatedTask._id}`, updatedTask, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });

        dispatch(fetchTasks(1)); // Refetch tasks after updating or update local state accordingly.
    } catch (error) {
        dispatch(setError(error.response?.data.error_message || 'An error occurred while updating the task.'));
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateTaskStatus = (id, status) => async (dispatch) => {
    console.log("update task status pre : ", id , status);
    
    dispatch(setLoading(true));
    try {
        await api.post(`/tasks/updateTaskStatus/${id}`, { status }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });

        dispatch(fetchTasks(1)); // Refetch tasks after updating or update local state accordingly.
    } catch (error) {
        dispatch(setError(error.response?.data.error_message || 'An error occurred while updating the task.'));
    } finally {
        dispatch(setLoading(false));
    }
};