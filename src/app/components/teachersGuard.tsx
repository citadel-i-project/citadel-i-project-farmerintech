"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/user";

export default function TeacherGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isTeacher = useAuthStore((s) => s.isTeacher());

  useEffect(() => {
    if (!user) {
      router.replace("/teachers/login");
      return;
    }

    if (isTeacher) {
      router.replace("/teachers/dashboard"); // or /teacher/dashboard
    }
  }, [user, isTeacher, router]);

  if (!user || !isTeacher) {
    return null; // prevent flash
  }

  return <>{children}</>;
}
