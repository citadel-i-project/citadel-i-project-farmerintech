"use client";

import { useState, useEffect } from "react";
import { courses } from "./courses";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StaticPage  } from "./static";
// =======================
//   TYPES
// =======================
type CourseItem = {
  id: string;
  course: string;
  OLevel: string[];
  Jamb: string[];
  PostUTME: string[];
  school?: string;
  year?: string;
  requirements?: string;
  additional?: string;
};

type AdmissionFilters = {
  school?: string;
  course?: string;
  year?: string;
};



// =======================
//   API CALL
// =======================
const fetchAllAdmissions = async () => {
  try {
    const response = await fetch(
      "https://api.citadel-i.com.ng/api/v1/admin/get_admission_requirements/all"
      
    );
    const result = await response.json();
    if (!response.ok) return [];

    return result.data;
  } catch (err) {
    console.error("Fetch All Error:", err);
    return [];
  }
};

const fetchAdmission = async (filters: AdmissionFilters) => {
  try {
    const response = await fetch(
      "https://api.citadel-i.com.ng/api/v1/admin/admission_requirements/filter",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      }
    );

    const result = await response.json();
    if (!response.ok) return [];

    return result.data;
  } catch (error) {
    console.error("Fetch filter error:", error);
    return [];
  }
};

// =======================
//   COMPONENT
// =======================
export default function AdmissionInfo() {
  const [apiData, setApiData] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(false);
const [courseSearch, setCourseSearch] = useState<string>("Medicine And Surgery");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [year, setYear] = useState("");
const schools = [
  "University of Lagos (UNILAG)",
  "University of Ibadan (UI)",
  "Obafemi Awolowo University (OAU)",
  "University of Ilorin (UNILORIN)",
  "Ahmadu Bello University (ABU Zaria)",
  "University of Nigeria Nsukka (UNN)",
  "Lagos State University (LASU)",
  "Olabisi Onabanjo University (OOU)",
  "University of Benin (UNIBEN)",
  "University of Port Harcourt (UNIPORT)",
  "Federal University of Technology Akure (FUTA)",
  "Federal University of Technology Minna (FUTMINNA)",
  "Federal University of Technology Owerri (FUTO)",
  "Kwara State University (KWASU)",
  "Federal University Dutse",
  "Federal University Lafia",
  "Federal University Oye-Ekiti (FUOYE)",
  "University of Calabar (UNICAL)",
  "University of Jos (UNIJOS)",
  "Nnamdi Azikiwe University (UNIZIK)",
  "Ekiti State University (EKSU)",
  "Osun State University (UNIOSUN)",
  "Adekunle Ajasin University (AAUA)",
  "Ambrose Alli University (AAU Ekpoma)",
  "Bayero University Kano (BUK)",
  "Benue State University (BSU)",
  "Delta State University (DELSU)",
  "Rivers State University (RSU)",
  "Kaduna State University (KASU)",
  "Yaba College of Technology (YABATECH)",
  "Federal Polytechnic Ilaro",
  "Federal Polytechnic Ede",
  "Kwara State Polytechnic",
  "Auchi Polytechnic",
  "Lagos State Polytechnic (LASPOTECH)",
  "Federal Polytechnic Ado-Ekiti",
  "Osun State College of Technology",
  "College of Health Technology Offa",
  "College of Health Technology Ibadan",
  "School of Health Technology Kano",
  "College of Education Ilorin",
  "College of Education Oro",
  "Federal College of Education Oyo",
  "Federal College of Education Zaria",
  "Nigerian Defence Academy (NDA)",
  "National Open University of Nigeria (NOUN)",
  "Babcock University",
  "Covenant University",
  "Bowen University",
  "Redeemer’s University",
  "Joseph Ayo Babalola University"
];
const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => 
  { 
    setCourseSearch(e.target.value); 

  };
  // FIRST PRIORITY → Fetch ALL admission requirements
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      const allData = await fetchAllAdmissions();
      setApiData(allData);
      setLoading(false);
    };

    loadAll();
  }, []);

  // SECOND PRIORITY → Fetch FILTERED data only when filters change
  useEffect(() => {
    // If no filter selected → use ALL data (do nothing)
    if (!selectedSchool && !selectedCourse && !year) return;

    const loadFiltered = async () => {
      setLoading(true);
      const filtered = await fetchAdmission({
        school: selectedSchool,
        course: selectedCourse,
        year: year,
      });

      setApiData(filtered);
      setLoading(false);
    };

    loadFiltered();
  }, [selectedSchool, selectedCourse, year]);

  const [active, setActive] = useState<number>(1);
    return(
        <section className=" md:bg-[#F3F3F3] md:px-6 lg:px-[100px] py-2 flex flex-col-reverse md:flex-row-reverse  items-start justify-between gap-2">
           {/* <RightSide/> */}
           <StaticPage />
      <aside className="p-[16px] bg-[#F9D68A] lg:rounded-[4px] w-full md:w-2/3 flex-col flex gap-[24px] custom-scrollbar md:overflow-y-scroll md:h-[900px] lg:h-[800px]">

      {/* ======================================================
          IF API DATA AVAILABLE => SHOW FILTER BOX + API RESULTS
      ======================================================= */}
      <div className="py-3 px-5 flex gap-5 justify-between">
        <button className={`${active ===1 ? "border-b-2 border-[#FF5900]  text-[#FF5900]  font-[600]":"text-white"}`} onClick={()=>setActive(1)}>General Admission Requirements</button>
        <button className={`${active ===2 ? "border-b-2 border-[#FF5900]  text-[#FF5900]  font-[600]":"text-white"}`} onClick={()=>setActive(2)}>School Specific</button>
      </div>
     {active===2 &&  (
  <>
    {/* FILTERS */}
    <div className="flex flex-col gap-[16px] gap-2 bg-[#FFFBF9] p-[16px]  rounded-[4px]">
      {/* School */}
      <div className="flex flex-col gap-2">
        <label className="font-[600] text-[16px]">Select School</label>
        <Select value={selectedSchool} onValueChange={setSelectedSchool}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose your school" />
          </SelectTrigger>
          <SelectContent>
            {schools.map((school) => (
              <SelectItem key={school} value={school}>
                {school}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Course */}
      <div className="flex flex-col gap-2">
        <label className="font-[600] text-[16px]">Select Course</label>
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose your course" />
          </SelectTrigger>
          <SelectContent>
            {Array.isArray(courses) &&
              courses.map((item: any, index: number) => (
                <SelectItem key={index} value={item.course}>
                  {item.course}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Year */}
      <div className="flex flex-col ">
        <label className="font-[600] text-[16px]">Select Year</label>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose year" />
          </SelectTrigger>
          <SelectContent>
            {["2020", "2021", "2022", "2023", "2024", "2025", "2026"].map((yr) => (
              <SelectItem key={yr} value={yr}>
                {yr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        disabled={loading}
        className="bg-[#FF5900] text-white mt-2"
        onClick={async () => {
          setLoading(true);
          const data = await fetchAdmission({
            school: selectedSchool,
            course: selectedCourse,
            year,
          });
          setApiData(data || []);
          setLoading(false);
        }}
      >
        {loading ? "Searching..." : "Search Admission"}
      </Button>
    </div>

    {/* API RESULTS */}
    <div className="mt-4 flex flex-col gap-[12px]">
      {apiData?.length > 0 ?
        apiData.map((item) => (
          <div key={item?.id} className="bg-white p-4 rounded-md">
            <h4 className="font-[600] mb-2">
              Admission Requiremnets
            </h4>
            <p className="font-[600] text-[12px] mb-2 ">Institution: {item?.school}</p>
            <p className="font-[600]  text-[12px] mb-2 ">Course: {item?.course}</p>
            <p className="font-[600]  text-[12px] mb-2 ">year: {item?.year}</p>
              <div
            dangerouslySetInnerHTML={{ __html: item?.requirements || "" }}
            className="px-5"
          />
          </div>
        ))
       : apiData.length<1 && active ===2 && 
(
    <div>
    <p>No Admission information found </p>
  </div>
  
)
      }
    </div>
  </>
)
}
 {active ===1 &&
  <>
 
    {/* LOCAL SEARCH */}
    <div className="bg-[#FFFBF9] p-[16px] flex gap-[10px] rounded-[4px]">
      <input
        onChange={handleSearch}
        type="text"
        placeholder="Search for course"
        className="border border-[#101828] px-[8px] py-[4px] rounded-[8px] w-full"
      />

      <button
        className="bg-[#FF5900] py-[8px] px-[16px] flex items-center justify-center gap-[2px] text-white rounded-[8px]"
      >
        Search
      </button>
    </div>

    {/* LOCAL DATA RESULTS */}
    <div className="mt-4 flex flex-col gap-[12px]">
      {courses
        .filter((courseItems) => {
          const name = courseItems.course.toLowerCase();
          const query = courseSearch.toLowerCase();
          return name.includes(query) || name === query;
        })
        .map((courseItems, index) => (
          <div
            key={index}
            className="text-[#0F0F0F] bg-[#FFFFFF] p-[16px] rounded-[4px] md:flex flex-col gap-[12px]"
          >
            <h4 className="font-[600] text-[20px]">{courseItems.course}</h4>

            <p className="text-[12px]">Minimum of Credit score in the following Subjects</p>

            <div>
              <p className="font-[500] text-[18px] bg-[#F6F6F6]">O’Level Requirements</p>
              <ul className="list-disc p-[12px] flex flex-col gap-[12px]">
                {courseItems["O'Level Requirements"].map((olevel, idx) => (
                  <li key={idx}>{olevel}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-[500] text-[18px] bg-[#F6F6F6]">JAMB Requirements</p>
              <ul className="list-disc p-[12px] flex flex-col gap-[12px]">
                {courseItems["JAMB Requirements"].map((jamb, idx) => (
                  <li key={idx}>{jamb}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-[500] text-[18px] bg-[#F6F6F6]">Post UTME Requirements</p>
              <ul className="list-disc p-[12px] flex flex-col gap-[12px]">
                {courseItems["Post UTME Requirements"].map((post, idx) => (
                  <li key={idx}>{post}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
    </div>
  </>
 }

    </aside> 
</section>
    )
}
