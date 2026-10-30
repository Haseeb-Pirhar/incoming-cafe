import { register } from "@/api/api-call/auth-api";
import { useRouter } from "next/navigation";
import { SignupFormType } from "./schema";
import toast from "react-hot-toast";

const useSignup = () => {
  const { push } = useRouter();

  const onSignup = async (data: SignupFormType) => {
    const result = await register(data);
    if (result?.error || !result?.data) {
      toast.error(result?.error || "Signup failed");
      return;
    }
    toast.success(result?.data?.message || "Signup Successfully");
    localStorage.setItem("email", data.email);
    push("/signup/verify-otp");
    return result;
  };

  return {
    onSignup,
  };
};

export { useSignup };
