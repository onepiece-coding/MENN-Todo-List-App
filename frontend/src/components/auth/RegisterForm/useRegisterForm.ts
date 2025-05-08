import { registerAction } from "@/actions/auth";
import { RegisterFormInputs, registerSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const useRegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      await registerAction(formData);
      toast.success("User created");
      router.push("/login");
    } catch (error) {
      toast.error((error as Error).message);
    }
    reset();
  };

  return { handleSubmit, onSubmit, register, errors, isSubmitting };
};

export default useRegisterForm;
