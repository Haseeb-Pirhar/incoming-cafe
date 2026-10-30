import { completeProfile } from "@/api/api-call/auth-api";
import { useAuthStore } from "@/store/profileStore";
import { convertToFormData } from "@/utils";
import { useRouter } from "next/navigation";
import { CompleteProfileFormType } from "./schema";
import { setClientAuthCookies } from "@/utils/client-cookies";
import toast from "react-hot-toast";

const useCompleteProfile = () => {
  const { push } = useRouter();
  const { setUser, setToken } = useAuthStore();

  const onCompleteProfile = async (data: CompleteProfileFormType) => {
    const formData = convertToFormData(data);
    const response = await completeProfile(formData);
    if (response?.error || !response?.data) {
      toast.error(response?.error || "Profile Completion failed");
      return;
    }
    toast.success(response?.data?.message || "Profile Completed Successfully");
    localStorage.removeItem("email");
    localStorage.removeItem("otp");
    const user = response?.data?.data;
    setUser(user);
    setToken(user.token || null);
    // Set cookies with the real user data
    setClientAuthCookies({
      user,
      accessToken: user.token || `token_${Date.now()}`,
    });

    if (response?.data?.data?.type === "business") {
      push("/store");
    } else {
      push("/public");
    }
  };

  return {
    onCompleteProfile,
  };
};

export { useCompleteProfile };
