import { Router } from "express";
import { createAndUpdateTask, deleteTask, fetchTasks, updateTaskStatus } from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createTask").post(verifyJWT, createAndUpdateTask);
router.route("/fetchTask").get(verifyJWT, fetchTasks);
router.route("/deleteTask/:id").delete(verifyJWT, deleteTask);
router.route("/updateTaskStatus/:id").post(verifyJWT, updateTaskStatus)




export default router;