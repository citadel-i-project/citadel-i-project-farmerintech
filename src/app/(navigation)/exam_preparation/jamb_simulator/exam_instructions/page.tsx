"use client";

import React from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronUp, FaUser } from "react-icons/fa";
import { useUser } from "@/app/context/reducer";
import { useCBTStore } from "@/app/store/cbt";
import { useAuthStore } from "@/app/store/user";

export default function Page() {
  const user = useAuthStore((s) => s.user);

  const { examMode, subjects } = useCBTStore();

  const examDuration =
    examMode === "Practice Mode" ? "40 minutes" : "2 hours";

  return (
    <>
      {/* HEADER */}
      <section className="flex flex-col md:flex-row gap-[12px] justify-between bg-[#F3F3F3] xl:px-[100px] px-[16px] py-[24px]">
        <h2 className="text-[32px] font-[700]">Exam Instruction</h2>

        <button className="w-[280px] px-[24px] py-[12px] bg-[#FF5900] rounded-[8px] text-white">
          Study Saved questions
        </button>
      </section>

      {/* CONTENT */}
      <section className="xl:px-[100px] px-[16px] bg-[#F3F3F3] py-[24px]">
        <main className="flex flex-col justify-center items-center gap-[16px] bg-white pb-[24px]">

          <main className="flex md:flex-row flex-col bg-white px-[16px] py-[32px] gap-[32px] rounded-[4px] w-full">

            {/* CANDIDATE DETAILS */}
            <aside className="flex flex-col gap-[16px] lg:px-[32px] px-[16px] py-[40px] rounded-[8px] md:w-[25%] border border-[#E7E7E7]">
              <p className="border-b font-[500]">Candidate details</p>

              <div className="flex justify-center items-center w-[80px] h-[80px] rounded-full border">
                <FaUser size={32} />
              </div>

              <p>{user?.firstName || "Candidate"} {user?.lastName || "Candidate"} </p>

              <p>Exam Mode: <strong>{examMode || "—"}</strong></p>
              <p>Exam Duration: <strong>{examDuration}</strong></p>

              <div>
                <p className="font-[500]">Selected Subjects</p>

                {subjects.length === 0 ? (
                  <p className="text-red-500 text-sm">No subjects selected</p>
                ) : (
                  <ul className="list-disc ml-[20px]">
                    {subjects.map((s) => (
                      <li key={s.subject} className="text-[#076037]">
                        {s.subject}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>

            {/* INSTRUCTIONS */}
            <aside className="flex flex-col gap-[24px] lg:px-[32px] px-[16px] py-[40px] md:w-[45%] rounded-[8px] border border-[#E7E7E7]">
              <p className="border-b font-[500]">Exam Instructions</p>

              <ul className="list-disc ml-[20px] text-sm leading-[22px]">
                <li>Read each question carefully before answering.</li>
                <li>You can navigate between questions freely.</li>
                <li>Your answers are saved automatically.</li>
                <li>Click submit once you are done.</li>
              </ul>
            </aside>

            {/* KEYBOARD USAGE */}
            <aside className="flex flex-col gap-[24px] lg:px-[32px] px-[16px] py-[40px] md:w-[30%] rounded-[8px] border border-[#E7E7E7]">
              <p className="border-b font-[500]">Keyboard Usage</p>

              <div className="flex flex-col gap-[14px] text-sm">
                {[
                  ["A", "Select Option A"],
                  ["B", "Select Option B"],
                  ["C", "Select Option C"],
                  ["D", "Select Option D"],
                ].map(([key, text]) => (
                  <div key={key} className="flex gap-[12px] items-center">
                    <span className="bg-[#4473FF] text-white w-[32px] h-[32px] flex justify-center items-center rounded">
                      {key}
                    </span>
                    <span>{text}</span>
                  </div>
                ))}

                <div className="flex gap-[12px] items-center">
                  <span className="bg-[#4473FF] text-white w-[32px] h-[32px] flex justify-center items-center rounded">N</span>
                  OR
                  <span className="bg-[#4473FF] text-white w-[32px] h-[32px] flex justify-center items-center rounded">
                    <FaChevronRight />
                  </span>
                  <span>Next</span>
                </div>

                <div className="flex gap-[12px] items-center">
                  <span className="bg-[#4473FF] text-white w-[32px] h-[32px] flex justify-center items-center rounded">P</span>
                  OR
                  <span className="bg-[#4473FF] text-white w-[32px] h-[32px] flex justify-center items-center rounded">
                    <FaChevronLeft />
                  </span>
                  <span>Previous</span>
                </div>

                <div className="flex gap-[12px] items-center">
                  <span className="bg-[#4473FF] text-white w-[32px] h-[32px] flex justify-center items-center rounded">
                    <FaChevronUp />
                  </span>
                  <span>Move Up</span>
                </div>

                <div className="flex gap-[12px] items-center">
                  <span className="bg-[#4473FF] text-white w-[32px] h-[32px] flex justify-center items-center rounded">
                    <FaChevronDown />
                  </span>
                  <span>Move Down</span>
                </div>

                <div className="flex gap-[12px] items-center">
                  <span className="bg-[#4473FF] text-white w-[32px] h-[32px] flex justify-center items-center rounded">S</span>
                  <span>Submit</span>
                </div>
              </div>
            </aside>
          </main>

          {/* START EXAM */}
          <Link
            href="/exam_preparation/jamb_simulator/exam"
            className="w-[278px] text-center py-[12px] px-[24px] text-white bg-[#FF5900] rounded-[8px]"
          >
            Start Exam
          </Link>
        </main>
      </section>
    </>
  );
}
