"use client"

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import React, { useEffect, useState} from 'react'
import { ChefHatIcon } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { useParams } from 'next/navigation'
import { subjects } from "@/app/(navigation)/exam_preparation/page"

export default function page() {
  const params = useParams();
    let subject = params.subject as string;
    const questionId = parseInt(params.questionId as string, 10);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string>()
    const matched = subjects.find(subj => subj.url === subject);
    
    const [form, setForm] = useState({
      subject:(matched?.name)
    })
    console.log(form)
    useEffect(() => {
      const fetchPQ = async () => {
        if (!subject) return; // Wait until subject is available
  
        setError("");
    
        try {
          const response = await fetch(`https://api.citadel-i.com.ng/api/v1/past_question/view_answer/${questionId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify(form)
          });
    
          const result = await response.json();
          setData(result.data);
          console.log(data)
        } catch (error) {
          console.error(error);
          setError("Error connecting to server");
        }
      };
    
      fetchPQ();
    }, [data, form]);
  

  return (
    <main className="xl:px-[100px] md:px-[24px] py-3 px-[16px] bg-[#F3F3F3] py-[24px]">
      <div className="flex md:flex-row flex-col md:items-center justify-between gap-[7px]">
        <span className="">
          <p className='flex gap-[8px]'>
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
        <aside className="lg:w-[836px] bg-[#FFFFFF] flex flex-col gap-[48px] md:px-[32px] py-[24px] p-[8px]">
          <article className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-2.5">
              {data ? (
                <>
                  <div className="flex items-center gap-2" key={data.id}>
                    {/* <p
                      className="h-[24px] w-[24px] bg-[#FFCCB0] text-[10px]
    border border-[#FF5900] text-[#FF5900] rounded-full flex items-center justify-center"
                    >
                      {data.id}
                    </p> */}
                    <p key={data.id} className="font-semibold text-[18px]">
                      {data?.question}
                    </p>
                  </div>
                  <span className="">
                    <p className="text-[18px]"> A. {data?.optionA} </p>

                    <p className="text-[18px]"> B. {data?.optionB}</p>

                    <p className="text-[18px]"> C. {data?.optionC}</p>

                    <p className="text-[18px]"> D. {data?.optionD}</p>
                  </span>
                  <span className="flex flex-col w-[105px]">
                    <Button
                      variant="outline"
                      className="bg-[#0DAF64] text-white"
                    >
                      Answer
                    </Button>
                    <p className="text-[18px]"> {data?.answer}</p>
                  </span>

                  <span className="flex flex-col">
                    <Button
                      variant="outline"
                      className=" border border-[#0DAF64] w-[125px] text-black"
                    >
                      Explanation
                    </Button>
                    <p className="text-[14px]">{data?.explanation}</p>
                  </span>

                  <span className="flex justify-between">
                    <Button
                      variant="outline"
                      className=" border border-[#FF5900]"
                    >
                      <Link
                        href={`/exam_preparation/${subject}/exam_questions/`}
                      >
                        Go Back
                      </Link>{" "}
                    </Button>
                  </span>
                </>
              ) : (
                "Loading Question..."
              )}
            </div>

            <div className="">
              <span className="flex flex-col gap-2">
                <Label className="text-[18px]">Post Your contributions</Label>
                <Textarea
                  className="lg:w-[772px] border border-[#919191] h-[123px]"
                  placeholder="Type here..."
                />{" "}
              </span>
              <Button className="bg-[#FF5900] mt-4">Post comment</Button>
              <p className="pt-5 text-[18px]">No Contibutions yet</p>
            </div>
          </article>
        </aside>

        <aside className="md:w-[370px] flex flex-col gap-[40px] pb-[40px]">
          <div className="md:flex flex-col gap-2.5 hidden bg-[#FFFBF9] p-[16px]">
            <h2 className="lg:w-[338px] h-[54px] text-white p-[16px] text-[18px] rounded-[4px] bg-[#3E414A]">
              Subjects
            </h2>
            <span className="flex flex-col gap-[20px]">
              <span className="flex flex-col gap-[20px]">
                {subjects.map((subject) => (
                  <Link
                    href={`/exam_preparation/${subject.url}/exam_questions`}
                    className="text-[16px] text-[#OFOFOF]"
                  >
                    {subject.name}
                  </Link>
                ))}
              </span>
            </span>
          </div>

          <div className="bg-[#FFCCB0] p-[16px] flex flex-col gap-[24px]">
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
