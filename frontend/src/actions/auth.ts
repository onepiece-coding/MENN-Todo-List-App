"use server";

import { axiosErrorHandler, axiosInstance } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAction(formData: FormData) {
  const username = formData.get("username")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  try {
    await axiosInstance.post("/api/auth/register", {
      username,
      email,
      password,
    });
  } catch (error) {
    // Forward backend error message
    throw new Error(axiosErrorHandler(error));
  }
}

export async function loginAction(formData: FormData) {
  // Extract credentials
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  try {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });

    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: response.data.token,
      // Restricts access from client-side scripts (JS)
      httpOnly: true,
      // Sent only over HTTPS
      secure: process.env.NODE_ENV === "production",
      // CSRF Attacks (XSS)
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
  } catch (error) {
    // Forward backend error message
    throw new Error(axiosErrorHandler(error));
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/login");
}
