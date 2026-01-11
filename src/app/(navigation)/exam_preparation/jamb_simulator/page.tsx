"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FiPhoneOutgoing } from "react-icons/fi";
import image from "@/app/assets/imageholder.png";
import { Schools, subjects } from "../page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import CBTGuard from "@/app/components/CBTGuard";
import { useCBTStore } from "@/app/store/cbt";

export default function Page() {
  const router = useRouter();

  const {
    setExamMode,
    resetCBT,
    addSubject,
    subjects: storedSubjects,
  } = useCBTStore();

  // English is compulsory
  const [checkedSubjects, setCheckedSubjects] = useState<string[]>([
    "English Language",
  ]);

  const [mode, setMode] = useState<string>("");

  /**
   * Sync local checkbox UI with Zustand (important for refresh / back nav)
   */
  useEffect(() => {
    if (storedSubjects.length) {
      setCheckedSubjects(storedSubjects.map((s) => s.subject));
    }
  }, [storedSubjects]);

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    const subject = e.target.name;

    setCheckedSubjects((prev) => {
      // English cannot be removed
      if (subject === "English Language") return prev;

      if (prev.includes(subject)) {
        return prev.filter((s) => s !== subject);
      }

      if (prev.length === 4) {
        alert("You can only select 4 subjects (English + 3 others)");
        return prev;
      }

      return [...prev, subject];
    });
  };

  const handleNavigate = () => {
    if (!mode) {
      alert("Please select a test mode");
      return;
    }

    if (checkedSubjects.length !== 4) {
      alert("Please select English and exactly 3 other subjects");
      return;
    }

    // reset previous CBT session
    resetCBT();

    // save exam mode
    setExamMode(mode);

    // save subjects into CBT store
    checkedSubjects.forEach((subject) => {
      addSubject(subject);
    });

    router.push("/exam_preparation/jamb_simulator/exam_instructions");
  };

  return (
    <CBTGuard>
      {/* HEADER */}
      <section className="flex flex-col md:flex-row gap-[12px] justify-between bg-[#F3F3F3] xl:px-[100px] px-[16px] py-[24px]">
        <h2 className="text-[32px] font-[700]">JAMB SIMULATOR</h2>

        <button className="w-[280px] px-[24px] py-[12px] bg-[#FF5900] rounded-[8px] text-white">
          Study Saved questions
        </button>
      </section>

      {/* MAIN */}
      <section className="xl:px-[100px] px-[16px] flex gap-[20px] md:flex-row flex-col bg-[#F3F3F3] py-[24px]">
        {/* LEFT */}
        <aside className="lg:w-[836px] bg-white flex flex-col gap-[48px] lg:px-[32px] px-[16px] py-[40px]">
          <p>
            Select your subject combination. English Language has been selected
            for you because it is compulsory. Select three other subjects.
          </p>

          <div className="flex flex-col gap-2">
            {subjects.map((subject, index) => (
              <label key={index} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name={subject.name}
                  checked={checkedSubjects.includes(subject.name)}
                  disabled={subject.name === "English Language"}
                  onChange={handleCheckBox}
                />
                {subject.name}
              </label>
            ))}

            {/* TEST MODE */}
            <div className="flex flex-col gap-[12px] mt-[12px]">
              <p>Select Test Mode</p>

              <Select value={mode} onValueChange={setMode}>
                <SelectTrigger className="w-full md:w-[257px]">
                  <SelectValue placeholder="Select Test Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Practice Mode">
                    Practice Mode
                  </SelectItem>
                  <SelectItem value="Exam Mode">Exam Mode</SelectItem>
                </SelectContent>
              </Select>

              <button
                onClick={handleNavigate}
                className="px-[24px] py-[12px] rounded-[8px] bg-[#FF5900] w-[171px] text-white"
              >
                Next
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT SIDEBAR */}
        <aside className="lg:w-[370px] flex flex-col gap-[40px] p-2">
          <article className="flex flex-col gap-[24px]">
            <div className="grid grid-cols-5 pt-3 gap-[20px]">
              {Schools.map((school, index) => (
                <div
                  key={index}
                  className={`text-[12px] p-[10px] text-white ${school.bgColor1}`}
                >
                  <Link
                    href="/"
                    className={`flex justify-center ${school.bgColor2}`}
                  >
                    {school.name}
                  </Link>
                </div>
              ))}
            </div>

            <Link href="" className="text-[#097C46] underline">
              Access guide on admission into your desired school
            </Link>
          </article>

          <div className="md:flex hidden bg-[#FEF6E6] p-[16px] flex-col gap-[24px]">
            <span className="flex items-center gap-[12px]">
              <FiPhoneOutgoing className="w-[40px] h-[40px]" />
              <p className="font-semibold text-[20px]">
                Need Help? Book a Tutor
              </p>
            </span>
            <p>
              Connect with experienced tutors for one-on-one or group lessons.
            </p>
          </div>

          <div className="md:flex hidden">
            <figure>
              <Image src={image} alt="Promo" />
              <figcaption className="text-center pt-2.5">
                <Link className="underline text-[#097647]" href="">
                  Sign Up for Holiday Classes
                </Link>
              </figcaption>
            </figure>
          </div>

          <div className="bg-[#FFCCB0] p-[16px] flex flex-col gap-[24px]">
            <p>Start Free CBT Exam Simulation on WAEC & JAMB</p>
            <Button variant="outline" className="border-[#FF5900] text-[#FF5900]">
              <Link href="">Start Now</Link>
            </Button>
          </div>
        </aside>
      </section>
    </CBTGuard>
  );
}
