"use client";

import { SignInForm } from "@/app/authPage/signin/signinForm";
import { X } from "lucide-react";



export default function SignInPage() {
  return (
    <section className="flex items-center justify-center w-full h-screen bg-[#FFEEE6]">
      <div className="w-full md:w-1/3 flex flex-col justify-center p-6 md:p-16 gap-3">
        <h3 className="text-xl font-bold text-left">Sign In</h3>
        <p className="text-gray-500 text-xs text-left mb-3">
          Welcome back! Please sign in to your account.
        </p>
        <SignInForm />
      </div>
    </section>
  );
}
