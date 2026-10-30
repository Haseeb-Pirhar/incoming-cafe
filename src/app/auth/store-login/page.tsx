import React from "react";
import { LoginForm } from "@/components/auth/login-form";
import OnboardingLayout from "@/components/OnboardingLayout";
import { storeLogin } from "@/api/api-call/auth-api";

function Login() {
  return (
    <OnboardingLayout>
      <LoginForm api={storeLogin} />
    </OnboardingLayout>
  );
}

export default Login;
