import { Request, Response } from "express";
import { Task, validateAddTask } from "../models/Task";

/**------------------------------------------------
 * @desc   Get User's Tasks
 * @route  /api/tasks
 * @method GET
 * @access private (only logged in user)
---------------------------------------------------*/
export const getTasks = async (req: any, res: Response) => {
  const tasks = await Task.find({ user: req.userId });
  res.status(200).json(tasks);
};

/**------------------------------------------------
 * @desc   Add New Task
 * @route  /api/tasks
 * @method POST
 * @access private (only logged in user)
---------------------------------------------------*/
export const createTask = async (req: any, res: Response) => {
  const { title } = req.body;

  const { error } = validateAddTask(req.body);

  if (error) {
    res.status(400).json(error.details[0].message);
    return;
  }

  const task = await Task.create({ title, user: req.userId });
  res.status(201).json(task);
};

/**------------------------------------------------
 * @desc   Update Task By ID
 * @route  /api/tasks/:id
 * @method PUT
 * @access private (user himself)
---------------------------------------------------*/
export const updateTask = async (req: any, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404).json({ message: "Task not found!" });
    return;
  }

  if (req.userId !== task?.user?.toString()) {
    res.status(403).json({
      message: "access denied, only user himself can edit his task",
    });
    return;
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTask);
};

/**------------------------------------------------
 * @desc   Delete Task By ID
 * @route  /api/tasks/:id
 * @method DELETE
 * @access private (user himself)
---------------------------------------------------*/
export const deleteTask = async (req: any, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404).json({ message: "Task not found!" });
    return;
  }

  if (req.userId !== task?.user?.toString()) {
    res.status(403).json({
      message: "access denied, only user himself can delete his task",
    });
    return;
  }

  await Task.findByIdAndDelete(req.params.id);
  //   await Task.findOneAndDelete({ user: req.userId, _id: req.params.id });
  res.status(204).send();
};
