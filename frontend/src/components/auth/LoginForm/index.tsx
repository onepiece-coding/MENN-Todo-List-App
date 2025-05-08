"use client";

import { LoginFormInputs } from "@/validations/auth";
import useLoginForm from "./useLoginForm";

const LoginForm = () => {
  const { handleSubmit, onSubmit, register, isSubmitting, errors } =
    useLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {["email", "password"].map((name) => {
        const key = name as keyof LoginFormInputs;
        return (
          <label key={name} className="block mb-4">
            {name.charAt(0).toUpperCase() + name.slice(1)}
            <input
              {...register(key)}
              type={
                name === "email"
                  ? "email"
                  : name === "password"
                  ? "password"
                  : "text"
              }
              className="w-full mt-1 p-2 border rounded"
              required
            />
            {errors[key] && (
              <p className="mt-1 text-red-600">{errors[key].message}</p>
            )}
          </label>
        );
      })}
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
