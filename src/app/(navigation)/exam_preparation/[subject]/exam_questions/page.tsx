"use client"
import React, { ChangeEvent, useEffect, useState} from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ChefHatIcon } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useParams } from 'next/navigation'; // ✅ Use this instead
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  type PQItem = {
    question: string;
    optionA:string,
    optionB:string,
    optionC:string,
    optionD:string,
    answer:string,
    optE:string,
    subject:string,
    id:number
  };
  import { useSearchParams, useRouter } from 'next/navigation';
import { subjects } from '../../page'
import {FaChevronRight} from "react-icons/fa"



export default function Page() {
  const params = useParams();
  let subject = params.subject as string; // if TypeScript complains
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>();
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setIsLoading] = useState<boolean>(true);
  const matched = subjects.find((subj) => subj.url === subject);
const [showAnswer, setShowAnswer] = useState<number | null>(null);

  const [formData, setFormData] = useState<any>({
    subject: `${matched?.name}`,
    examType: "",
    questionType: "",
  });

  const handleSelectExamType = (value: string) => {
    setFormData({ ...formData, examType: value });
  };
  const handleSelectSubject = (value: string) => {
    setFormData({ ...formData, subject: value });
    const matched = subjects.find((subj) => subj.name === value);
    const subjectUrl = matched?.url;
    router.push(`/exam_preparation/${subjectUrl}/exam_questions`);
  };
  const handleSelectQuestionType = (value: string) => {
    setFormData({ ...formData, questionType: value });
  };

  const [isManualSubmit, setIsManualSubmit] = useState(false);

  const fetchPQ = async () => {
    if (!subject || !currentPage) return;
    setError("");
    setIsLoading(true);
    let offset = currentPage * 10 - 10;

    try {
      const res = await fetch(
        `https://api.citadel-i.com.ng/api/v1/past_question/get_questions?page=${currentPage}&offset=${offset}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();
      console.log(result);
      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch question");
      }

      setData(result.data);
      console.log("Fetched:", result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error connecting to server");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isManualSubmit) {
      fetchPQ();
      setIsManualSubmit(false); // reset after manual fetch
      return;
    }

    // Auto-fetch only when there's no manual submit in progress
    fetchPQ();
  }, [subject, currentPage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsManualSubmit(true); // mark manual submit
    fetchPQ();
  };

  const router = useRouter();

  return (
    <main className="xl:px-[100px] md:px-[24px] py-3 px-[16px] bg-[#F3F3F3] py-[24px]">
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-[7px]">
        <span className="">
          <p className='flex gap-[8px]'>
          <span className='flex gap-[8px] items-center text-[#8C3100]'>{`${formData.examType !== '' ? formData.examType: 'All'}` } <FaChevronRight/> </span>
          <span className="text-[#FF5900] text-[16px]">
            {matched ? `${matched.name} Past Question` : "Loading..."}
          </span>
          </p>
         
          <p className="md:text-[32px] text-[24px] font-bold">
            {matched ? `${matched.name} Past Question` : "Loading..."}
          </p>
        </span>
        <Button
          className="bg-[#FF5900] text-[12px] md:text-white md:text-[18px]"
          variant="outline"
        >
          <Link href="" className="flex gap-2 items-center">
            Study Saved questions
            <ChefHatIcon />
          </Link>{" "}
        </Button>
      </div>
      <section className=" flex gap-[20px] md:flex-row flex-col pt-[24px] ">
        <aside className="md:w-[836px] bg-[#FFFFFF] flex flex-col gap-[48px] md:px-[32px] py-[24px] p-[8px]">
          <form
            className="grid grid-cols-2 gap-[24px] p-[16px] items-center md:border-1"
            onSubmit={handleSubmit}
          >
            <span className="flex flex-col gap-[12px]">
              <Label className="tet-[18px] font-semibold">Subject</Label>

              <Select onValueChange={handleSelectSubject}>
                <SelectTrigger className="lg:w-[250px] md:w-[150px] w-[100%]">
                  <SelectValue placeholder={matched?.name} />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem value={subject.name}>{subject.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </span>

            <span className="flex flex-col gap-[12px]">
              <Label className="tet-[18px] font-semibold">Exam Type</Label>

              <Select onValueChange={handleSelectExamType}>
                <SelectTrigger className="lg:w-[250px] md:w-[150px] w-[100%]">
                  <SelectValue
                    placeholder={formData.examType ? formData.examType : "All"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JAMB">JAMB</SelectItem>
                  <SelectItem value="WAEC">WAEC</SelectItem>
                  <SelectItem value="NECO">NECO</SelectItem>
                  <SelectItem value="POST UTME">POST UTME</SelectItem>
                </SelectContent>
              </Select>
            </span>

            <span className="flex flex-col gap-[12px]">
              <Label className="tet-[18px] font-semibold">Question Type</Label>

              <Select onValueChange={handleSelectQuestionType}>
                <SelectTrigger className="lg:w-[250px] md:w-[150px] w-[100%]">
                  <SelectValue
                    placeholder={
                      formData?.questionType ? formData?.questionType : "All"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Objective">Objective</SelectItem>
                  <SelectItem value="Theory">Theory</SelectItem>
                </SelectContent>
              </Select>
            </span>
            <span className="flex flex-col gap-[12px]">
              <Label className="tet-[18px] font-semibold">Submit</Label>
              <Input
                className="bg-[#FF5900] text-white text-center
 lg:w-[250px] md:w-[150px] w-[100%] placeholder:text-white"
                placeholder="Search"
                type="submit"
              />
            </span>
          </form>

          <article className="flex flex-col gap-[24px]">
            <span className="justify-end w-[40%] md:hidden flex">
              <Select>
                <SelectTrigger className="lg:w-[300px] md:w-[150px] bg-[#3E414E] w-[100%]">
                  <SelectValue placeholder="Subjects" className="text-white" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>{" "}
            </span>
            <div className="flex flex-col gap-2.5">
              {loading && (
                <p className="mt-6 text-center w-full text-[18px] ">
                  Loading Question...
                </p>
              )}

              {!loading && error && (
                <p className="mt-6 w-full text-center text-[18px] font-[500] text-black">
                  {error}
                </p>
              )}
             {!loading &&
  data?.length > 0 &&
  !error &&
  data.map((pq: PQItem, index: number) => (
    <div key={pq.id} className="space-y-3">
      {/* Question */}
     <div className="flex items-start gap-5 flex-col md:flex-row">
  <p
    className="h-[25px] w-[25px] flex-shrink-0 bg-[#FFCCB0] text-[10px]
    border border-[#FF5900] text-[#FF5900] rounded-full
    flex items-center justify-center"
  >
    {index + 1}
  </p>

  <p className=" text-[18px] leading-relaxed">
    {pq.question}
  </p>
</div>


      {/* Options */}
      <div className="px-3">
        <p className="text-[18px]">A. {pq.optionA}</p>
        <p className="text-[18px]">B. {pq.optionB}</p>
        <p className="text-[18px]">C. {pq.optionC}</p>
        <p className="text-[18px]">D. {pq.optionD}</p>
      </div>

      {/* Correct Answer (Hidden by default) */}
      {showAnswer === pq.id && (
        <p className="text-green-600 font-semibold text-[16px]">
          ✅ Correct Answer: {pq.answer}
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center flex-col md:flex-row gap-3 w-full md:w-[261px]">
        <Button
          variant="outline"
          className="border border-[#FF5900] text-[#FF5900] w-full"
          onClick={() =>
            setShowAnswer(showAnswer === pq.id ? null : pq.id)
          }
        >
          {showAnswer === pq.id ? "Hide Answer" : "View Answer"}
        </Button>

        <Button
          variant="outline"
          className="border border-[#FF5900] text-[#FF5900] w-full"
        >
           <Link
    href={`/exam_preparation/${matched?.url}/exam_questions/${pq.id}/view_answer`}
  >
    View Explanation
  </Link>
        </Button>

        <Button
          variant="outline"
          className="border border-[#FF5900] text-[#FF5900] w-full"
        >
          <ChefHatIcon /> Save Question
        </Button>
      </div>
    </div>
  ))}

            </div>
          </article>

          <span className="flex justify-between">
            <Button variant="outline" className=" border border-[#FF5900]">
              <Link href="/exam_preparation">Go Back</Link>{" "}
            </Button>

            <span className="flex justify-between gap-[24px]">
              <Button
                variant="outline"
                className=" border border-[#FF5900]"
                disabled={currentPage === 1}
              >
                <Link
                  href={`/exam_preparation/${matched?.name}/exam_questions?page=${Math.max(
                    currentPage - 1,
                    1
                  )}`}
                >
                  Previous
                </Link>
              </Button>

              <Button
                variant="outline"
                className=" border border-[#FF5900]"
                disabled={currentPage === totalPage}
              >
                <Link
                  href={`/exam_preparation/${matched?.name}/exam_questions?page=${
                    currentPage + 1
                  }`}
                >
                  Next
                </Link>
              </Button>
            </span>
          </span>
        </aside>

        <aside className="lg:w-[370px] flex flex-col gap-[40px] pb-[40px]">
          <div className="md:flex flex-col gap-2.5 hidden bg-[#FFFBF9] p-[16px]">
            <h2 className="lg:w-[338px] h-[54px] text-white p-[16px] text-[18px] rounded-[4px] bg-[#3E414A]">
              Subjects
            </h2>
            <span className="flex flex-col gap-[20px]">
              {subjects.map((subject) => (
                <Link href={`/exam_preparation/${subject.url}/exam_questions`} className="text-[16px] text-[#OFOFOF]">{subject.name}</Link>    
              ))}
            </span>
          </div>

          <div className="bg-[#FFCCB0] p-[16px] flex flex-col gap-[24px] ">
            <p className="text-[20px]">
              Start Free CBT Exam Simulation on WAEC and JAMB
            </p>
            <Button
              variant="outline"
              className="w-[50%] text-[#FF5900] border border-[#FF5900] bg-transparent"
            >
              <Link href="">Start Now </Link>{" "}
            </Button>
          </div>

          <div className="bg-[#FBE3B0] p-[16px] flex flex-col gap-[24px] mb-[50px]">
            <p className="text-[18px]">
              Watch Video Lessons on various subjects and Topics to be better
              prepared for your Exams{" "}
            </p>
            <Button
              variant="outline"
              className="w-[50%] text-[#FF5900] border border-[#FF5900] bg-transparent"
            >
              <Link href="">Watch Now </Link>{" "}
            </Button>
          </div>
        </aside>
      </section>
    </main>
  );
}
