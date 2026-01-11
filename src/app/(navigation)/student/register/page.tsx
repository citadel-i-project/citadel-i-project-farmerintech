"use client";

import { SignUpForm } from "@/app/authPage/signup/signupForm";


export default function SignUpPage() {
  return (
    <section className="flex items-center justify-center w-full bg-[#FFEEE6]">
      <div className="w-full md:w-2/3 flex flex-col justify-center p-6 md:p-16 gap-3">
        <h3 className="text-xl font-bold text-left">Sign as a student</h3>
        <p className="text-gray-500 text-xs text-left mb-3">
          Complete the form to register. Your account will be verified by admin.
        </p>

        <SignUpForm />
      </div>
    </section>
  );
}
