"use client";

import { RegisterFormInputs } from "@/validations/auth";
import useRegisterForm from "./useRegisterForm";

const RegisterForm = () => {
  const { handleSubmit, onSubmit, register, errors, isSubmitting } =
    useRegisterForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {["username", "email", "password"].map((name) => {
        const key = name as keyof RegisterFormInputs;
        return (
          <label key={name} className="block mb-4">
            {name.charAt(0).toUpperCase() + name.slice(1)}
            <input
              type={
                name === "email"
                  ? "email"
                  : name === "password"
                  ? "password"
                  : "text"
              }
              {...register(key)}
              className="w-full mt-1 p-2 border rounded"
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
        {isSubmitting ? "Loading..." : "Sign Up"}
      </button>
    </form>
  );
};

export default RegisterForm;
