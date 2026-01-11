"use client";

import { X } from "lucide-react";
import { FaChevronRight, FaUser, FaUserGraduate } from "react-icons/fa";
import Image from "next/image";
import logo from "@/app/assets/Logo.svg";
import asideImage from "@/app/assets/reg.jpg";

interface SignInPageProps {
  setShowLogin: (show: boolean) => void;
}

export default function SignInPage({ setShowLogin }: SignInPageProps) {
  return (
    <section className="flex items-start md:items-center justify-center h-full p-4 bg-black/10">
      <div className="relative flex flex-col md:flex-row w-full md:max-w-4xl shadow-lg md:rounded-lg overflow-hidden">

        {/* Left side - Image with overlay */}
        <div className="relative w-full md:w-1/2 h-64 md:h-120 ">
          <Image
            src={asideImage}
            alt="Education background"
            fill
            className="object-cover rounded-t-lg md:rounded-t-none"
            priority
          />
          <div className="absolute inset-0 bg-black/50 rounded-t-lg md:rounded-t-none" />
          
          {/* Logo */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <Image src={logo} alt="Citadel logo" width={100} height={30} />
            <p className="text-white text-xs">| Education is all we do</p>
          </div>

          {/* Quote */}
          <div className="absolute bottom-12 left-4 md:left-12 right-4 text-white z-10 max-w-md md:max-w-[50%]">
            <p className="font-semibold text-sm md:text-base">
              “The beautiful thing about learning is that no one can take it away from you.”
            </p>
            <p className="text-xs text-right mt-3">– B.B. King</p>
          </div>
        </div>

        {/* Right side - Sign In Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 bg-orange-50">
          <h3 className="text-xl font-bold mb-2">Welcome Back</h3>
          <p className="text-gray-500 text-xs mb-4">Login to your account</p>

          <div className="space-y-3">
            <a
              href="/teachers/login"
              className="flex items-center justify-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-lg w-full"
            >
              <FaUserGraduate /> Login as a teacher <FaChevronRight />
            </a>
            <a
              href="/student/login"
              className="flex items-center justify-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-lg w-full"
            >
              <FaUser /> Login as a student <FaChevronRight />
            </a>
          </div>
        </div>

        {/* Close button */}
        <div
          className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white cursor-pointer z-20 shadow"
          onClick={() => setShowLogin(false)}
        >
          <X />
        </div>
      </div>
    </section>
  );
}
