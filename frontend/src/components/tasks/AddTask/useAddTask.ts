import { axiosErrorHandler, axiosInstance } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const useAddTask = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = async () => {
    if (!title.trim()) {
      return toast.error("Title is required!");
    }

    setLoading(true);

    try {
      await axiosInstance.post("/api/tasks", { title });
      toast.success("Task added");
      router.refresh();
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    } finally {
      setLoading(false);
    }

    setTitle("");
  };

  return { title, loading, setTitle, addTask };
};

export default useAddTask;
