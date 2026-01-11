"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff, ChevronsRight, Loader2 } from "lucide-react";
import googleLogo from "@/app/assets/google.svg";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/app/context/reducer";
import { useAuthStore } from "@/app/store/user";

export const SignInForm = () => {
   const router = useRouter();
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { dispatch } = useUser();
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    const { email, password } = formData;

    if (!email.trim()) {
      setIsLoading(false);
      return setError("Email is required");
    }
    if (password.length < 8) {
      setIsLoading(false);
      return setError("Password must be at least 8 characters");
    }

    try {
      const res = await fetch("https://api.citadel-i.com.ng/api/v1/user/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(typeof result.message === "string" ? result.message : "Login successful");
        setFormData({ email: "", password: "" });
        setIsChecked(false);
        // Redirect or save token if needed
        router.push("/student/dashboard");
        useAuthStore.getState().login({
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        token: result.user.token,
        role: result.user.role, // "student" | "teacher"
        id:result.user.id,
        profileImage:result.user.profileImage
        
        });
  //       dispatch({
  //   type: 'LOGIN',
  //   payload: {
  //     email:result.user.email,
  //     firstName:result.user.firstName,
  //     lastName:result.user.lastName,
  //     token:result.user.token,
  //     role:result.user.role,
  //     subjects:[],
  //     examMode:''
  //   },
  // });
      } else {
        const errorMsg =
          typeof result.message === "string"
            ? result.message
            : "Invalid credentials or server error.";
        setError(errorMsg);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      {message && <p className="text-green-500 text-sm">{message}</p>}

      <label className="text-sm">Email Address</label>
      <input
        type="email"
        className="w-full p-2 border outline-none rounded-lg text-sm border-gray-500 focus:border-black"
        placeholder="Email Address"
        value={formData.email}
        name="email"
        onChange={handleInput}
      />

      <div className="relative">
        <label className="text-sm">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          className="w-full p-2 border outline-none rounded-lg text-sm border-gray-500 focus:border-black"
          placeholder="Password"
          value={formData.password}
          name="password"
          onChange={handleInput}
        />
        <button
          type="button"
          className="absolute right-3 top-8 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div className="flex items-center text-xs justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 bg-gray-300 rounded"
            onChange={handleCheck}
            checked={isChecked}
          />
          Remember me
        </label>
        <a href="#" className="text-orange-500">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className={`w-full ${
          isChecked ? "bg-orange-500" : "bg-gray-400"
        } text-white py-2 rounded-lg text-sm flex gap-3 items-center justify-center`}
        disabled={!isChecked || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Logging in...
          </>
        ) : (
          <>
            Login
            <ChevronsRight size={20} />
          </>
        )}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex items-center my-2">
        <hr className="flex-grow border-gray-300" />
        <span className="text-gray-500 text-xs px-2">Or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* <div className="flex items-center justify-center w-full">
        <button
          type="button"
          className="w-full rounded-[8px] border border-gray-300 py-2 flex items-center justify-center text-sm"
        >
          <Image
            src={googleLogo}
            alt="Google"
            width={18}
            height={18}
            className="mr-2"
          />
          Continue with Google
        </button>
      </div> */}

      <p className="text-center text-xs text-gray-500">
        Don’t have an account?{" "}
        <a href="/student/register" className="text-orange-500">
          Register now!
        </a>
      </p>
    </form>
  );
};
