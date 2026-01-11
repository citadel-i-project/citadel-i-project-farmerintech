interface SubjectScore {
  subject: string;
  score: number;
}

type SubjectAnswers = Record<number, string>; 
// questionIndex -> selected answer

interface CBTState {
  examMode: string;

  subjects: SubjectScore[]; // English + 3 others

  answers: Record<string, SubjectAnswers>;
  // subject -> answers

  timeLeft: number;

  setExamMode: (mode: string) => void;

  addSubject: (subject: string) => void;
  removeSubject: (subject: string) => void;

  answerQuestion: (
    subject: string,
    questionIndex: number,
    answer: string
  ) => void;

  updateScore: (subject: string, score: number) => void;

  setTimeLeft: (time: number) => void;
  resetCBT: () => void;
}

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCBTStore = create<CBTState>()(
  persist(
    (set) => ({
      examMode: "",
      subjects: [],
      answers: {},
      timeLeft: 0,

      // -------------------
      // EXAM MODE
      // -------------------
      setExamMode: (mode) => set({ examMode: mode }),

      // -------------------
      // SUBJECTS
      // -------------------
      addSubject: (subject) =>
        set((state) => {
          if (state.subjects.some((s) => s.subject === subject)) {
            return state;
          }

          if (state.subjects.length === 4) {
            return state;
          }

          return {
            subjects: [...state.subjects, { subject, score: 0 }],
          };
        }),

      removeSubject: (subject) =>
        set((state) => ({
          subjects: state.subjects.filter(
            (s) => s.subject !== subject
          ),
          answers: Object.fromEntries(
            Object.entries(state.answers).filter(
              ([key]) => key !== subject
            )
          ),
        })),

      // -------------------
      // ANSWERS (PER SUBJECT)
      // -------------------
      answerQuestion: (subject, questionIndex, answer) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [subject]: {
              ...(state.answers[subject] || {}),
              [questionIndex]: answer,
            },
          },
        })),

      // -------------------
      // SCORE
      // -------------------
      updateScore: (subject, score) =>
        set((state) => ({
          subjects: state.subjects.map((s) =>
            s.subject === subject ? { ...s, score } : s
          ),
        })),

      // -------------------
      // TIMER
      // -------------------
      setTimeLeft: (time) => set({ timeLeft: time }),

      // -------------------
      // RESET
      // -------------------
      resetCBT: () =>
        set({
          examMode: "",
          subjects: [],
          answers: {},
          timeLeft: 0,
        }),
    }),
    {
      name: "cbt-storage",
    }
  )
);
