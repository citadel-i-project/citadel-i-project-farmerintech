"use client";

import { subjects } from "@/app/components/subjects";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

/* ================= ROMAN NUMERAL HELPER ================= */
const toRoman = (num: number) => {
  const romans: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  for (const [value, symbol] of romans) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
};

export default function Page() {
  /* ================= STATE ================= */
  const [data, setData] = useState<any>(null);
  const [rawContent, setRawContent] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(true);

  /* ================= ROUTER ================= */
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const theClass = params.class as string;
  const subject = params.subject as string;
  const theSubject = subjects.find(
    (sub) => sub.url === subject
  )?.name;

  const idParam = searchParams.get("id");
  const currentId = idParam ? Number(idParam) : null;

  /* ================= FETCH CURRENT MATERIAL ================= */
  useEffect(() => {
    if (!currentId || !theSubject) return;

    const fetchContent = async () => {
      setLoading(true);
      setError(undefined);

      try {
        const res = await fetch(
          `https://api.citadel-i.com.ng/api/v1/note/get_note/${currentId}/${theSubject}`
        );

        if (res.status === 404) {
          setHasNext(false);
          throw new Error("Lesson not found");
        }

        const result = await res.json();

        setData(result.data);
        setRawContent(result.data?.content || "");

        setHasPrev(currentId > 1);
        setHasNext(true);
      } catch (err: any) {
        setError(err.message || "Error loading lesson");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [currentId, theSubject]);

  /* ================= TABLE OF CONTENT ================= */
  let TOC: string[] = [];
  if (data?.tableOfContent) {
    try {
      TOC = JSON.parse(data.tableOfContent);
    } catch {
      console.warn("Invalid TOC format");
    }
  }

  /* ================= UI ================= */
  return (
    <section className="lg:px-[100px] md:px-[20px] w-full overflow-x-hidden py-[16px] px-[16px] bg-[#F3F3F3] flex flex-col md:flex-row gap-[24px] justify-between">
      {/* ================= SIDEBAR ================= */}
      <aside className="md:w-[300px] lg:w-[30%] w-full md:h-[500px] py-[24px] px-[12px] flex flex-col gap-[16px] bg-white">
        <p className="p-[8px] bg-[#FBE3B0] font-semibold">
          Lesson Contents
        </p>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : TOC.length > 0 ? (
          TOC.map((item, i) => (
            <p
              key={i}
              className="text-sm flex gap-2 leading-relaxed"
            >
              <span className="font-semibold">
                {toRoman(i + 1)}.
              </span>
              <span>{item}</span>
            </p>
          ))
        ) : (
          <p>No Table of Content</p>
        )}
      </aside>

      {/* ================= MAIN ================= */}
      <main className="w-full md:w-[70%] p-[24px] rounded-[2px] bg-white">
        {data && (
          <div className="mb-4 space-y-1">
            <p className="font-bold text-[18px]">
              Subject: {data.subject}
            </p>
            <p className="font-bold text-[18px]">
              Class: {data.class} /{" "}
              <span>{data.year}</span>
            </p>
            <p className="font-bold text-[18px]">
              Term: {data.term}
            </p>
            <p className="font-bold text-[18px]">
              Topic: {data.topic}
            </p>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div
            className="p-8"
            dangerouslySetInnerHTML={{ __html: rawContent }}
          />
        )}

        {/* ================= NAV BUTTONS ================= */}
        <div className="flex justify-between mt-6">
          <button
            disabled={!hasPrev}
            onClick={() =>
              hasPrev &&
              router.push(`${pathname}?id=${currentId! - 1}`)
            }
            className={`px-4 py-2 rounded-md ${
              hasPrev
                ? "bg-[#FF5900]  text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            ← Previous Lesson
          </button>

          <button
            disabled={!hasNext}
            onClick={() =>
              hasNext &&
              router.push(`${pathname}?id=${currentId! + 1}`)
            }
            className={`px-4 py-2 rounded-md ${
              hasNext
                ? "bg-[#FF5900]  text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next Lesson →
          </button>
        </div>
      </main>
    </section>
  );
}
