import mongoose from "mongoose";
import Joi from "joi";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export function validateAddTask(obj: { title: string }) {
  return Joi.object({
    title: Joi.string().trim().required(),
  }).validate(obj);
}

export const Task = mongoose.model("Task", taskSchema);
