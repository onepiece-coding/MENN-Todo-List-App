import { Router } from "express";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

/** @route /api/tasks */
router.route("/").get(getTasks).post(createTask);

/** @route /api/tasks/:id */
router.route("/:id").put(updateTask).delete(deleteTask);

export default router;
