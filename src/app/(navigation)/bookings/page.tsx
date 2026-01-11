"use client"

import Image from "next/image";
import { FaGraduationCap } from "react-icons/fa";
import Bookings1 from "@/app/assets/bookings1.png"
import Bookings2 from "@/app/assets/bookings2.jpg"
import { useEffect, useState } from "react";
import TutorBookingForm from "./booking";


interface Subject {
  name: string;
}

interface ClassLevel {
  group: string;
  years: string[];
}

interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  discipline: string;
  subjects: string[] | Subject[];
  isVerified: boolean;
  classLevels: ClassLevel[];
  passportPhoto:any
  courseOfStudy:string
  qualifications:string
  gender:string
  bio:string
}

interface PaginatedTeachersResponse {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  teachers: Teacher[];
}

export default function page (){
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
const [showDetails, setShowDetails] = useState(false);
  const limit = 10;

  const fetchTeachers = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.citadel-i.com.ng/api/v1/admin/get_teachers?page=${pageNumber}&limit=${limit}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch teachers");

      const data: PaginatedTeachersResponse = await res.json();
      setTeachers(data.teachers);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers(page);
  }, [page]);
  const normalizeClassLevels = (
    levels: ClassLevel | ClassLevel[] | undefined
  ): ClassLevel[] => {
    if (Array.isArray(levels)) return levels;
    if (levels) return [levels];
    return [];
  };
    return(
        <>
       <section className=" bg-[#FFFBF9] lg:px-[100px] px-[32px] py-[64px]">
          <aside className="bg-[#FFEEE6] lg:px-[100px] py-[64px] px-[32px] gap-[24px] rounded-[40px] flex flex-col items-center">
            <h2 className="max-w-[912px]  font-[600] lg:text-[32px] md:text-[24px] text-[16px] text-center">
                Meet our Seasoned tutors with over 10 years of Experience
            </h2>
            <p className="max-w-[912px]  text-center ">
                Get one-on-one support from experienced and trusted tutors. Whether you're preparing for an exam, need help with assignments, or want to improve in specific subjects — we’ve got you covered.
            </p>
            <button className="bg-[#FF5900] text-white px-[24px] py-[12px] gap-[8px] rounded-[8px]">Book a Tutor Now</button>
           {/* teachers should be fecthed here  */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-[40px] mt-10">
  {teachers.map((teacher) => (
    <div
      key={teacher.id}
      className="bg-white rounded-[16px] p-[16px] shadow-sm hover:shadow-md transition"
    >
      {/* Image */}
      <div className="w-full h-[260px] rounded-[12px] overflow-hidden bg-[#F5F5F5]">
        <Image
          src={teacher.passportPhoto || "/avatar.png"}
          alt={`${teacher.firstName} ${teacher.lastName}`}
          width={300}
          height={260}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="mt-4 flex flex-col gap-2">
        <h3 className="font-[600] text-[18px]">
            
          {teacher.firstName} {teacher.lastName}
        </h3>
 <p className="text-sm text-gray-600">
         <span className="font-bold">Gender</span>: {teacher.gender} 
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-bold">Descipline:</span>  {teacher.discipline} - {teacher.courseOfStudy} ({teacher.qualifications})
        </p>

         <p className="text-sm text-gray-600">
          <span className="font-bold">Bio</span>: {teacher.bio}
        </p>
        {/* Subjects */}
        <div className="flex flex-wrap gap-2 mt-2">
          
          {teacher.subjects?.slice(0, 3).map((subject: any, index) => (
            <span
              key={index}
              className="text-xs bg-[#FFEEE6] text-[#FF5900] px-3 py-1 rounded-full"
            >
              {typeof subject === "string" ? subject : subject.name}
            </span>
          ))}
        </div>
{normalizeClassLevels(teacher.classLevels).length > 0 ? (
              <ul className="space-y-1 text-sm">
                {normalizeClassLevels(teacher.classLevels).map((level, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-50 border rounded-md px-3 py-2"
                  >
                    <span className="font-medium">{level.group}:</span>{" "}
                    {level.years.join(", ")}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">—</p>
            )}
        {/* Footer */}
        <button className="mt-4 w-full bg-[#FF5900] text-white py-[10px] rounded-[8px] text-sm hover:opacity-90">
          <a href="#book">Book Tutor</a>
        </button>
      </div>
    </div>
  ))}
</div>

            
          </aside>
          <aside className="mt-10">
            <h2 className="font-[600] text-center mb-5">Why Book a Tutor With Us?</h2>
            <div className="flex flex-col md:flex-row gap-[80px] items-center justify-center ">
                <div className="flex gap-[24px] flex-col">
                <div className="flex gap-[24px]">
                    <div className="bg-white border-1 border-[#F1A500] rounded-[6px] h-[160px] md:w-[245px] p-[16px] flex flex-col justify-between">
                        <span className="w-[32px] h-[32px] rounded-full bg-[#FBE3B0] p-[8px] gap-[10px]">
                            <FaGraduationCap/>
                        </span>
                        <span>Qualified Tutors</span>
                    </div>
                    <div className="bg-white border-1 border-[#F1A500] rounded-[6px] h-[160px] md:w-[245px] p-[16px] flex flex-col justify-between">
                        <span className="w-[32px] h-[32px] rounded-full bg-[#FBE3B0] p-[8px] gap-[10px]">
                            <FaGraduationCap/>
                        </span>
                        <span>Flexible Scheduling</span>
                    </div>
                </div>
                <div className="flex gap-[24px]">
                    <div className="bg-white border-1 border-[#F1A500] rounded-[6px] h-[160px] md:w-[245px] p-[16px] flex flex-col justify-between">
                        <span className="w-[32px] h-[32px] rounded-full bg-[#FBE3B0] p-[8px] gap-[10px]">
                            <FaGraduationCap/>
                        </span>
                        <span>Fully Online</span>
                    </div>
                    <div className="bg-white border-1 border-[#F1A500] rounded-[6px] h-[160px] md:w-[245px] p-[16px] flex flex-col justify-between">
                        <span className="w-[32px] h-[32px] rounded-full bg-[#FBE3B0] p-[8px] gap-[10px]">
                            <FaGraduationCap/>
                        </span>
                        <span>Customized Learning Plans</span>
                    </div>
                </div>

                </div>
                <div className=" ">
                    <Image src={Bookings2} alt='' className="w-full  md:w-[360px] h-[360px] rounded-[24px]"/>
                </div>
            </div>
          </aside>
        </section>
        <section id="book" className="bg-[#F9D68A] flex md:flex-row flex-col gap-[32px] justify-center px-[32px] py-[24px]">
           <TutorBookingForm/>
            <aside className="max-w-[477px]">
              <h2 className="font-[600] mb-5">Terms and Conditions/Process</h2>
              <ul>
                <li>After making your payment. You’ll received a confirmation email immediately</li>
              </ul>
            </aside>
          </section>

        </>
    )
}
