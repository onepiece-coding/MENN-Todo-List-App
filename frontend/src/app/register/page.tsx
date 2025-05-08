import { RegisterForm } from "@/components/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Page",
};

const RegisterPage = async () => {
  return (
    <section className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Register</h2>
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
