import { LoginForm } from "@/components/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page",
};

const LoginPage = async () => {
  return (
    <section className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      <LoginForm />
    </section>
  );
};

export default LoginPage;
