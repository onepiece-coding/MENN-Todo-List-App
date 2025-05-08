import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Joi from "joi";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = mongoose.model("User", userSchema);

export function validateRegisterUser(obj: {
  username: string;
  email: string;
  password: string;
}) {
  return Joi.object({
    username: Joi.string().trim().required(),
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().min(8),
  }).validate(obj);
}

export function validateLoginUser(obj: { email: string; password: string }) {
  return Joi.object({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required(),
  }).validate(obj);
}
