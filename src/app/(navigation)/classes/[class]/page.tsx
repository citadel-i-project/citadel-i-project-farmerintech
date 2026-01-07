"use client"
import { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link"
import { useParams } from "next/navigation"    
import Image from 'next/image'
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { subjects } from "@/app/components/subjects";

const menuItems =[
        {
            id:0,
            name:"KS1",
            years:["Year1", "Year2"],
            uri:"KS1"
        },
        {
            id:1,
            name:"KS2",
            years:[ "Year3", "Year4", "Year5", "Year6"], 
            uri:"KS2"
        },
        {
            id:2,
            name:"KS3",
            years:["Year1", "Year2", "Year3", "Year4", "Year5", "Year6"], 
            uri:"KS3"
        },
        {
            id:3,
            name:"SSCE/GSCE",
            years:[],
            uri:"SSCE/GSCE"
        },
    ]
const Terms=[
  {
    id:1,
    name:"First Term"
  },
  {
    id:2,
    name:"Second Term"
  },
  {
    id:3,
    name:"Third Term"
  }
]



export default function Myclass (){
//dynamic route folder

  const [yearIndex, setYearIndex] = useState<number>(0);
  const [classIndex, setClassIndex] = useState<number>(0);
  const [term, setTerm] = useState<string>("First Term");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>();
  const params = useParams<any>();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showTerm, setShowTerm] = useState<boolean>(false);
  let theClass = params.class as string; //
  const [loading, setLoading] = useState<boolean>(true);
  const years = ["Year1", "Year2", "Year3", "Year4", "Year5", "Year6"];

  const formatYear = (index: number): string => {
    return years[index] || "year1";
  };
const [page, setPage] = useState<number>(1); // current page
const [totalPages, setTotalPages] = useState<number>(1); // total pages from backend

useEffect(() => {
  if (!params.class) return;
  setLoading(true);
  const theClass = params.class as string;
  const year = formatYear(yearIndex);

  const body = {
    class: decodeURIComponent(theClass),
    year,
    term,
  };

  const fetchClassNote = async () => {
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `https://api.citadel-i.com.ng/api/v1/note/get_class_note?page=${page}&limit=6`, // <-- added page & limit
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        setError(result.message);
        throw new Error(result.message || "Failed to fetch class material");
      }

      setData(result.data);
      setTotalPages(result.pagination?.totalPages || 1); // <-- set total pages from backend
      console.log("Fetched:", result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  fetchClassNote();
}, [params.class, yearIndex, term, page]); // <-- added page as dependency

  const [form, setForm] = useState<any>({
    subject: "",
    term,
    year: "year1",
    class: decodeURIComponent(theClass),
  });

  const handleSelectYear = (value: string) => {
    setForm({
      ...form,
      year: value,
    });
  };
  const handleSelectSubject = (value: string) => {
    setForm({
      ...form,
      subject: value,
    });
  };
  const handleSelectTerm = (value: string) => {
    setForm({
      ...form,
      term: value,
    });
  };

 


  useEffect(() => {
    setTerm(form.term);
    let index = 0;
    menuItems.find((item) =>
      item.years.find((year) =>
        year === form.year ? (index = item.years.indexOf(year)) : (index = 0)
      )
    );
    setYearIndex(index);
  }, [form.term, form.year]);

  const filterBySubject = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(form);

    event.preventDefault();
    if (!params.class) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await fetch(
        `https://citadel-i-project.onrender.com/api/v1/note/get_note_by_subject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const result = await res.json();
      console.log(result)
      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch class material");
        setError(result.message);
      }
      setData(result.data);
      console.log("Fetched:", result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  type materialItem = {
    subject: string;
    classFor: string;
    year: string;
    term: string;
    id: number;
    filePath: any;
    imagePath:any
  };
    return(
        <>
  
        <section className="lg:px-[100px] md:px-[50px] py-[16px] px-[16px] bg-[#F3F3F3] ">
        <section className="flex lg:flex-row flex-col gap-[10px] lg:justify-between justify-center items-center ">
        <div>
          <h3 className="font-[600] text-[20px]">All your learning materials in one place</h3>
        </div>
        <form onSubmit={filterBySubject} className="w-full md:w-auto  md:items-center md:justify-center gap-[10px] border-1 border-gray-300 p-[16px] rounded-[8px] 
                grid grid-cols-2 md:flex ">
          <div className="hidden lg:block">
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 2.6C1 2.03995 1 1.75992 1.10899 1.54601C1.20487 1.35785 1.35785 1.20487 1.54601 1.10899C1.75992 1 2.03995 1 2.6 1H19.4C19.9601 1 20.2401 1 20.454 1.10899C20.6422 1.20487 20.7951 1.35785 20.891 1.54601C21 1.75992 21 2.03995 21 2.6V3.26939C21 3.53819 21 3.67259 20.9672 3.79756C20.938 3.90831 20.8901 4.01323 20.8255 4.10776C20.7526 4.21443 20.651 4.30245 20.4479 4.4785L14.0521 10.0215C13.849 10.1975 13.7474 10.2856 13.6745 10.3922C13.6099 10.4868 13.562 10.5917 13.5328 10.7024C13.5 10.8274 13.5 10.9618 13.5 11.2306V16.4584C13.5 16.6539 13.5 16.7517 13.4685 16.8363C13.4406 16.911 13.3953 16.9779 13.3363 17.0315C13.2695 17.0922 13.1787 17.1285 12.9971 17.2012L9.59711 18.5612C9.22957 18.7082 9.0458 18.7817 8.89827 18.751C8.76927 18.7242 8.65605 18.6476 8.58325 18.5377C8.5 18.4122 8.5 18.2142 8.5 17.8184V11.2306C8.5 10.9618 8.5 10.8274 8.46715 10.7024C8.43805 10.5917 8.39014 10.4868 8.32551 10.3922C8.25258 10.2856 8.15102 10.1975 7.94789 10.0215L1.55211 4.4785C1.34898 4.30245 1.24742 4.21443 1.17449 4.10776C1.10986 4.01323 1.06195 3.90831 1.03285 3.79756C1 3.67259 1 3.53819 1 3.26939V2.6Z" stroke="#1B1B1B" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </div>
          <Select onValueChange={handleSelectYear}>
            <SelectTrigger className="w-full md:w-[132px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year=>(
              <SelectItem value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleSelectSubject}>
            <SelectTrigger className="w-full md:w-[132px]">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map(subject=>(
              <SelectItem value={subject.name}>{subject.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleSelectTerm}>
            <SelectTrigger className="w-full md:w-[132px]">
              <SelectValue placeholder="Term" />
            </SelectTrigger>
            <SelectContent>
              {Terms.map(term=>(
              <SelectItem value={term.name}>{term.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center justify-between px-[8px] py-[4px] bg-orange-500 text-white rounded-[8px] w-full md:w-[101px]">
            <button>Search</button>
            <span>
            <svg width="16" height="16" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 19L15.15 14.65M17.5 9C17.5 13.4183 13.9183 17 9.5 17C5.08172 17 1.5 13.4183 1.5 9C1.5 4.58172 5.08172 1 9.5 1C13.9183 1 17.5 4.58172 17.5 9Z" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </div>
          </form>
      </section>
      {/* side bar */}
      <div className="flex gap-[12px] mt-[16px]">
      <section className="bg-white w-[164px] min-h-screen  rounded-[2px] hidden md:block">
            <ul className="flex items-center flex-col justify-center px-[32px] py-[16px] ">
                {
                    menuItems.map((menu)=>(
                        <li className="cursor-pointer" onClick={()=>{setClassIndex(menu.id)}} key={menu.id}>
                            <div >
                                <div className={`flex justify-between items-center ${classIndex == menu.id ? "bg-[#F6C354]":''} w-[132px] px-[8px] py-[12px]`} >
                                    <Link href={`/classes/${menu.uri}`}>{menu.name}</Link>
                                </div>                      
                                 <ul  className={` ${classIndex == menu.id ? 'block': 'hidden' }`}>
                                    {menu.years.map((year)=>(
                                    <li className={`${yearIndex === menu.years.indexOf(year) ? "bg-gray-200": "bg-gray-100"} px-[16px] py-[12px] text-center hover:bg-gray-200`} onClick={()=>{setYearIndex(menu.years.indexOf(year))}}>{year}</li>
                                    ))}
                                 </ul>
                            </div>
                        </li>
                    ))
                }
           </ul>

        </section>
        {/* main */}
        <section className="bg-white w-full min-h-screen  rounded-[2px] px-[16px] py-[16px] md:px-[40px] md:py-[32px] ">  
        <div className=" grid grid-cols-2 gap-[12px] absolute left-8 right-5">
          {/* mobile navigation side bar */}
          <ul className="md:hidden w-[95%]" onClick={()=>{setShowMenu(!showMenu)}}>
            {
            showMenu &&    menuItems.map((menu)=>(
                    <li className="cursor-pointer z-[80px]  " onClick={()=>{setClassIndex(menu.id)}} key={menu.id}>
                        <div className=''>
                            <div className={`flex justify-between items-center  ${classIndex == menu.id ? "bg-[#F6C354]":'bg-white'} px-[8px] py-[12px] `} >
                            <Link href={`/classes/${menu.uri}`}>{menu.name}</Link>
                            </div>                      
                             <ul  className={` ${classIndex == menu.id ? 'block': 'hidden' }`}>
                                {menu.years.map((year)=>(
                                <li className={`${yearIndex === menu.years.indexOf(year) ? "bg-gray-200": "bg-gray-100"}  px-[16px] py-[12px] text-center hover:bg-gray-200`} onClick={()=>{setYearIndex(menu.years.indexOf(year))}}>{year}</li>
                                ))}
                                
                             </ul>
                        </div>
                    </li>
                ))
            }
            <li className={`w-full px-[8px] py-[12px] bg-[#F6C354] flex items-center justify-between ${!showMenu ? "block":"hidden"}`}>
                
                <span>{decodeURIComponent(theClass)}</span>
                <span className="text-black"></span>

            </li>
       </ul>
        <div className="w-[95%] ">
            <ul className="  w-full  flex flex-col  items-center justify-between
             border-[1.5px] bg-white md:hidden block text-white" onClick={()=>{setShowTerm(!showTerm)}}>
              {showTerm &&
                Terms.map(term=>(
                  <li className="w-full hover:bg-orange-500 hover:text-white  px-[16px] py-[12px] flex items-center justify-between text-black" onClick={()=>{setTerm(term.name)}}>
                  <span className="">
                    {term.name}
                  </span>
                  </li>
                ))
              }
              {!showTerm ?
              <li className="bg-orange-500 w-full  px-[16px] py-[12px] flex items-center justify-between">
                <span>{term}</span>
              </li>:''}
            </ul>
        </div>
        </div>          
            <div className="md:flex items-center justify-center gap-[24px] hidden ">
                <button className={` ${term === "First Term" ? " bg-[#FF5900] hover:bg-[#E85100] text-white": "bg-white border-[1.5px] border-black"} px-[16px] py-[12px] w-full border-[1.5px] hover:border-none hover:bg-[#E85100] hover:text-white:`} onClick={()=>{setTerm("First Term")}}>
                    First Term
                </button>
                <button className={` ${term === "Second Term"? " bg-[#FF5900] hover:bg-[#E85100] text-white": "bg-white border-[1.5px] border-black"} px-[16px] py-[12px] w-full border-[1.5px] hover:border-none hover:bg-[#E85100] hover:text-white`} onClick={()=>{setTerm("Second Term")}}>
                    Second Term
                </button>
                <button className={` ${term === "Third Term"? " bg-[#FF5900] hover:bg-[#E85100] text-white": "bg-white border-[1.5px] border-black"} px-[16px] py-[12px] w-full border-[1.5px] hover:border-none hover:bg-[#E85100] hover:text-white`} onClick={()=>{setTerm("Third Term")}}>
                    Third Term
                </button>

            </div>
            {loading && (
              <p className="mt-[50px] md:mt-[0px] text-center w-full text-[18px] ">Loading material...</p>
            )}

          {!loading && error && (
           <p className="mt-[50px] md:mt-[0px] w-full text-center text-[18px] font-[500] text-black">
                {error}
            </p>
          )}
         <div className="mt-[50px] md:mt-[0px] grid md:grid-cols-2 lg:grid-cols-3 gap-[32px] py-[32px]">
  {!loading && data?.length > 0 &&
    data.map((material: materialItem, index: number) => (
      <div className="w-full h-[177px]" key={index}>

        {/* IMAGE AREA */}
        <div className="relative bg-[#F3F3F3] w-full h-[137px] overflow-hidden pb-2 px-2">
          <Image
            src={material.imagePath}
            alt={material.subject}
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* FOOTER */}
        <div className="bg-[#3E414A] h-[40px] w-full text-center text-white flex items-center justify-center">
          <Link
            href={`/classes/${theClass}/${subjects.find(sub => sub.name === material.subject)?.url}?id=${material.id}`}
          >
            {material.subject}
          </Link>
        </div>

      </div>
      
    ))}
   
</div>

<div className="flex justify-center items-center gap-4 mt-8 mb-8">
  <button
    className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-orange-500 text-white"}`}
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Previous
  </button>

  <span className="text-lg font-semibold">
    Page {page} of {totalPages}
  </span>

  <button
    className={`px-4 py-2 rounded ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-orange-500 text-white"}`}
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>
</div>

            <div className="md:flex-row flex-col flex flex-start gap-[32px] md:items-center">
                    <p className="font-[400] text-[18px] text-xl">Need help with understanding your subjects?</p>
                    <button className="text-white rounded-[8px] w-[200px] px-[16px] py-[8px]  bg-[#FF5900]">
                    Book a Tutor Now
                    </button>
                </div>
        </section>
          </div>
        </section>
        
        </>
    )
}
