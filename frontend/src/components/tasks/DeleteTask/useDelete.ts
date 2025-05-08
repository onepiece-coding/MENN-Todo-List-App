import { axiosErrorHandler, axiosInstance } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const useDeleteTask = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const remove = async (id: string) => {
    setLoading(true);

    try {
      await axiosInstance.delete(`/api/tasks/${id}`);
      toast.success("Task Deleted");
      router.refresh();
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    } finally {
      setLoading(false);
    }
  };

  return { loading, remove };
};

export default useDeleteTask;
