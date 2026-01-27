"use client";

import { useState } from "react";
import { LoginForm } from "@/components/login/LoginForm";
import { SignUpForm } from "@/components/login/SignUpForm";

export default function LoginPage() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {mode === "login" ? <LoginForm /> : <SignUpForm />}
      <p className="mt-4 text-center">
        {mode === "login"
          ? " Dont have an account?"
          : "Already have an account?"}
        <button
          type="button"
          onClick={() =>
            setMode((prev) => (prev === "login" ? "signup" : "login"))
          }
          className="text-blue-500 hover:underline ml-2"
        >
          {mode === "login" ? "Sign up" : "Log in"}
        </button>
      </p>
    </div>
  );
}
