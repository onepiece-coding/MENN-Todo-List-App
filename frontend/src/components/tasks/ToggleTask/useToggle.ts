import { axiosErrorHandler, axiosInstance } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useToggleTask = () => {
  const router = useRouter();

  const toggle = async (id: string, done: boolean) => {
    try {
      await axiosInstance.put(`/api/tasks/${id}`, { completed: !done });
      router.refresh();
    } catch (error) {
      toast.error(axiosErrorHandler(error));
    }
  };

  return { toggle };
};

export default useToggleTask;
