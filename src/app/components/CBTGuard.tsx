"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/user";

export default function CBTGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isStudent = useAuthStore((s) => s.isStudent());

  useEffect(() => {
    if (!user) {
      router.replace("/student/login");
      return;
    }

    if (isStudent) {
      router.replace("/exam_preparation/jamb_simulator"); // or /teacher/dashboard
    }
  }, [user, isStudent, router]);

  if (!user || !isStudent) {
    return null; // prevent flash
  }

  return <>{children}</>;
}
