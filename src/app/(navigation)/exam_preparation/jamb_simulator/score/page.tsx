"use client";

import { useCBTStore } from "@/app/store/cbt";
import { useAuthStore } from "@/app/store/user";
import { useRouter } from "next/navigation";

export default function ScorePage() {
  const { subjects: subjectState, resetCBT } = useCBTStore();
  const user = useAuthStore((s) => s.user);
  const router = useRouter()
  // Calculate total
  const totalScore = subjectState.reduce((acc, curr) => acc + curr.score, 0);
  const finish = () =>{
    router.push("http://localhost:3000/exam_preparation/jamb_simulator");
    resetCBT()
  }
  return (
    <section className="flex flex-col gap-6 items-center justify-center py-16 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold">Your Exam Scores</h1>
        <p>Dear{user?.firstName || "Candidate"} {user?.lastName || "Candidate"}, Below is the breaking down of your eam score </p>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4">
        {subjectState.map(({ subject, score }) => (
          <div key={subject} className="flex justify-between">
            <span className="font-semibold">{subject}</span>
            <span>{score}</span>
          </div>
        ))}

        <hr className="my-2" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total Score</span>
          <span>{totalScore}</span>
        </div>

        <button
          className="mt-6 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          onClick={() =>finish() }
        >
          Finish
        </button>
      </div>
    </section>
  );
}
