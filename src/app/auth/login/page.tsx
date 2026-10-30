import React from "react";
import { LoginForm } from "@/components/auth/login-form";
import OnboardingLayout from "@/components/OnboardingLayout";
import { login } from "@/api/api-call/auth-api";

function Login() {
  return (
    <OnboardingLayout>
      <LoginForm api={login} />
    </OnboardingLayout>
  );
}

export default Login;
