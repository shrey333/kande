import express from "express";
import {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/taskController.js";
import { verifyToken } from "../middleware/auth.js";
import { validateTask } from "../middleware/validateTask.js";

const router = express.Router();

router.post("/tasks", verifyToken, validateTask, createTaskController);
router.get("/tasks", verifyToken, getTasksController);
router.get("/tasks/:id", verifyToken, getTaskByIdController);
router.put("/tasks/:id", verifyToken, validateTask, updateTaskController);
router.delete("/tasks/:id", verifyToken, deleteTaskController);

export default router;
