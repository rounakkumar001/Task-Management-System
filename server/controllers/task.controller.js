import { Task } from "../models/task.model.js";

const createAndUpdateTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;
        // const taskId = req.params.id; 
        const taskId = req.body.taskId;


        if (!title || title.trim() === "") {
            return res.status(400).json({ error_message: "Title should not be empty." });
        }

        if (!priority || priority.trim() === "") {
            return res.status(400).json({ error_message: "Priority should not be empty." });
        }


        if (!dueDate) {
            return res.status(400).json({ error_message: "Due date is required." });
        }

        if (taskId) {

            const existingTask = await Task.findById(taskId);
            if (!existingTask) {
                return res.status(404).json({ error_message: "Task not found." });
            }


            existingTask.title = title;
            existingTask.description = description;
            existingTask.dueDate = dueDate;
            existingTask.priority = priority;


            const updatedTask = await existingTask.save();

            return res.status(200).json({
                message: "Task updated successfully.",
                data: updatedTask
            });
        } else {

            const newTask = new Task({
                title,
                description,
                dueDate,
                priority,
                userId: req.user._id
            });


            await newTask.save();

            return res.status(201).json({
                message: "New task created successfully.",
                data: newTask
            });
        }
    } catch (error) {
        console.error("Error while creating or updating a task:", error);
        return res.status(500).json({ error_message: "Something went wrong while processing your request." });
    }
}


const fetchTasks = async (req, res) => {
    try {
        // Get pagination parameters from query
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default limit to 10

        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Fetch tasks from database with pagination
        const tasks = await Task.find({ userId: req.user._id }) // Assuming you want to fetch tasks for the logged-in user
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // Sort by creation date, descending order

        // Get total count of tasks for pagination metadata
        const totalTasks = await Task.countDocuments({ userId: req.user._id });

        return res.status(200).json({
            message: "Tasks fetched successfully.",
            data: tasks,
            totalTasks,
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit), // Calculate total pages
        });
    } catch (error) {
        console.error("Error while fetching tasks:", error);
        return res.status(500).json({ error_message: "Something went wrong while fetching tasks." });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id; // Get task ID from request parameters

        // Find and delete the task
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error_message: "Task not found." });
        }

        return res.status(200).json({
            message: "Task deleted successfully.",
            data: deletedTask,
        });
    } catch (error) {
        console.error("Error while deleting task:", error);
        return res.status(500).json({ error_message: "An error occurred while deleting the task." });
    }
};


const updateTaskStatus = async (req, res) => {
    try {
        const taskId = req.params.id; // Get task ID from request parameters
        const { status } = req.body; // Get new status from request body
        console.log(taskId, status);
        
        // Validate input
        if (!status) {
            return res.status(400).json({ error_message: "Status is required." });
        }

        // Find the task by ID
        const existingTask = await Task.findById(taskId);
        if (!existingTask) {
            return res.status(404).json({ error_message: "Task not found." });
        }

        // Update the task status
        existingTask.status = status;

        const updatedTask = await existingTask.save();

        return res.status(200).json({
            message: "Task status updated successfully.",
            data: updatedTask,
        });
    } catch (error) {
        console.error("Error while updating task status:", error);
        return res.status(500).json({ error_message: "An error occurred while updating the task status." });
    }
};

export { updateTaskStatus };

export { deleteTask };

export { fetchTasks };

export { createAndUpdateTask };