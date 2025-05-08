import { loginAction } from "@/actions/auth";
import { LoginFormInputs, loginSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const useLoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      await loginAction(formData);
      toast.success("Logged In");
      router.replace("/tasks");
    } catch (error) {
      toast.error((error as Error).message);
    }
    reset();
  };

  return { handleSubmit, onSubmit, register, isSubmitting, errors };
};

export default useLoginForm;
