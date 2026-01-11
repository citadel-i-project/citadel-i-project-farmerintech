"use client";

import { useCBTStore } from "@/app/store/cbt";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { FaCalculator, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface Question {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
}

export default function Page() {
  const {
    subjects: subjectState, // { subject, score }[]
    answers,
    answerQuestion,
    updateScore,
    timeLeft,
    setTimeLeft,
    resetCBT
  } = useCBTStore();

  const subjects = useMemo(() => subjectState.map((s) => s.subject), [
    subjectState,
  ]);

  const [currentSubject, setCurrentSubject] = useState<string>(
    subjects[0] || ""
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Record<string, Question[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================
     Sync current subject
  ======================= */
  useEffect(() => {
    if (subjects.length && !currentSubject) {
      setCurrentSubject(subjects[0]);
    }
  }, [subjects, currentSubject]);

  /* =======================
     API PAYLOAD
  ======================= */
  const formData = useMemo(
    () => ({
      examType: "JAMB",
      subject1: subjects[0],
      subject2: subjects[1],
      subject3: subjects[2],
      subject4: subjects[3],
    }),
    [subjects]
  );

  /* =======================
     FETCH QUESTIONS
  ======================= */
  useEffect(() => {
    if (subjects.length !== 4) return;

    const fetchQuestion = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          "https://api.citadel-i.com.ng/api/v1/cbt/jamb",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Failed to fetch CBT questions");
        }

        setQuestions({
          [result.data.subjects[0]]: result.data.subject1,
          [result.data.subjects[1]]: result.data.subject2,
          [result.data.subjects[2]]: result.data.subject3,
          [result.data.subjects[3]]: result.data.subject4,
        });

        setCurrentSubject(result.data.subjects[0]);
        setQuestionIndex(0);
      } catch (err: any) {
        setError(err.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [formData, subjects.length]);

  /* =======================
     ANSWER HANDLER
  ======================= */
  const handleOption = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    answerQuestion(currentSubject, index, event.target.value);
  };

  /* =======================
     SCORE CALCULATION
  ======================= */

const router = useRouter();
const calculateScore = () => {
  // Calculate individual subject scores dynamically
  subjectState.forEach(({ subject }) => {
    const subjectQuestions = questions[subject] || [];
    const subjectAnswers = answers[subject] || {};

    const totalQuestions = subjectQuestions.length;
    let correct = 0;

    subjectQuestions.forEach((item, idx) => {
      if (subjectAnswers[idx] === item.answer) correct++;
    });

    // Scale to 100
    const score = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

    updateScore(subject, score);
  });

  // Redirect to score page
  router.push("/exam_preparation/jamb_simulator/score");
};


  /* =======================
     COUNTDOWN TIMER 2hrs
  ======================= */
useEffect(() => {
  // initialize timer if not set
  if (timeLeft === 0) setTimeLeft(2 * 60 * 60);

  const interval = setInterval(() => {
    const current = useCBTStore.getState().timeLeft; // ✅ get current value
    if (current <= 1) {
      clearInterval(interval);
      calculateScore(); // auto-submit
      setTimeLeft(0);
    } else {
      setTimeLeft(current - 1);
    }
  }, 1000);
    return () => clearInterval(interval);
  }, [setTimeLeft]); // run once

  /* =======================
     FORMAT TIMER
  ======================= */
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const Next = () => {
    const total = questions[currentSubject]?.length || 0;
    if (questionIndex < total - 1) setQuestionIndex((prev) => prev + 1);
  };

  const Prev = () => {
    if (questionIndex > 0) setQuestionIndex((prev) => prev - 1);
  };

  const currentQuestions = questions[currentSubject] || [];
  const currentAnswers = answers[currentSubject] || {};
  const currentAnswered = Object.keys(currentAnswers).map(Number);

  /* =======================
     UI
  ======================= */
  return (
    <section className="flex flex-col gap-[12px] bg-[#F3F3F3] xl:px-[100px] px-[16px] py-[24px]">
      {/* HEADER */}
      <aside className="bg-white py-[16px] px-[8px] flex flex-col gap-[24px]">
        <div className="flex justify-between items-center">
          <p>{currentSubject}</p>
          <div className="flex gap-[24px] items-center">
            <div className="p-[8px] border text-[#F1A500] rounded-[4px] flex gap-1">
              <FiClock />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={calculateScore}
              className="bg-[#FF5900] text-white px-[24px] py-[12px] rounded-[8px]"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-[8px]">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => {
                  setCurrentSubject(subject);
                  setQuestionIndex(0);
                }}
                className={`${
                  currentSubject === subject
                    ? "bg-[#0DAF64] text-white"
                    : "bg-[#F2F4F7]"
                } rounded-[4px] p-[8px]`}
              >
                {subject}
              </button>
            ))}
          </div>
          <div className="p-[8px] border rounded-[4px]">
            <FaCalculator />
          </div>
        </div>
      </aside>

      {/* QUESTIONS */}
      <aside className="bg-white py-[16px] px-[8px] flex flex-col gap-[24px]">
        {currentQuestions.map((item, index) => (
          <div
            key={index}
            className={questionIndex === index ? "block" : "hidden"}
          >
            <p className="font-semibold py-[8px]">
              {index + 1}. {item.question}
            </p>

            <ul className="flex flex-col gap-[8px]">
              {["A", "B", "C", "D"].map((letter) => {
                const value = item[`option${letter}` as keyof Question];
                return (
                  <li key={letter} className="flex gap-[6px]">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={value}
                      checked={currentAnswers[index] === value}
                      onChange={(e) => handleOption(e, index)}
                    />
                    {letter}. {value}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* NAV */}
        <div className="flex gap-[32px] ">
          <button onClick={Prev} className="bg-orange-500 px-[16px] text-white items-center flex gap-2 rounded-md py-[8px]">
            <FaChevronLeft /> Previous
          </button>
          <button onClick={Next} className="bg-orange-500 px-[16px] text-white items-center flex gap-2  rounded-md py-[8px]">
            Next <FaChevronRight />
          </button>
        </div>

        {/* GRID */}
        <div className="flex gap-[8px] flex-wrap">
          {currentQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setQuestionIndex(index)}
              className={`w-[24px] h-[24px] rounded-[4px] ${
                index === questionIndex
                  ? "bg-[#F1A500] text-white"
                  : currentAnswered.includes(index)
                  ? "bg-green-500 text-white"
                  : "bg-[#D0D5DD]"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {questionIndex === currentQuestions.length - 1 && (
          <div className="flex justify-center">
            <button
              onClick={calculateScore}
              className="bg-orange-500 text-white px-[24px] py-[12px] rounded-[8px]"
            >
              Submit
            </button>
          </div>
        )}
      </aside>
    </section>
  );
}
