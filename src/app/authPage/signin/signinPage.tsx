"use client";

import { X } from "lucide-react";
import { SignInForm } from "./signinForm";
import { AuthPage } from "../authRightPage";
interface SignInPageProps {
  setShowLogin: (show: boolean) => void;
}



export default function SignInPage({ setShowLogin }: SignInPageProps) {
  return (
    <section className="flex items-start md:items-center justify-center h-screen">
      <div className="md:flex w-full md:max-w-4xl h-[45vh] md:h-[85vh] rounded-lg shadow md:overflow-hidden">
        {/* Left side */}
        <AuthPage />

        {/* Close button */}
        <div
          className="w-[50px] h-[50px] rounded-full flex items-center justify-center absolute md:right-0 top-6 md:top-12 right-[0%] lg:right-[10%] bg-white cursor-pointer"
          onClick={() => setShowLogin(false)}
        >
          <X />
        </div>

        {/* Right side - Sign In Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-15 bg-orange-50 rounded-b-lg md:rounded-b-none">
          <h3 className="text-xl font-bold text-left">Welcome Back</h3>
          <p className="text-gray-500 text-xs text-left mb-3">
            Login to your account
          </p>

          <SignInForm />
        </div>
      </div>
    </section>
  );
}
