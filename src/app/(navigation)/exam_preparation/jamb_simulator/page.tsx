'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FiPhoneOutgoing } from 'react-icons/fi';
import image from '@/app/assets/imageholder.png';
import { Schools, subjects } from '../page';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useUser } from '@/app/context/reducer';
import { useRouter } from 'next/navigation';
import { toggle } from '@/lib/utils';
import SignInPage from '@/app/authPage/signin/signinPage';

export default function Page() {
  const [checkedSubjects, setCheckedSubjects] = useState<string[]>(['English Language']); // always selected

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    const subject = e.target.name;

    setCheckedSubjects((prev) => {
      if (prev.includes(subject)) {
        // prevent removing English
        if (subject === 'English Language') return prev;
        return prev.filter((item) => item !== subject);
      } else {
        if (prev.length === 4) {
          alert('You can only select four subjects (English + 3 others)');
          return prev;
        }
        
        return [...prev, subject];
      }
    });
  };
  const { state, dispatch } = useUser();
const [mode, setMode] = useState('')
  const handleValuChange =(value:string)=>{
    setMode(value)
  }
  
  const router = useRouter()
              const [showLogin, setShowLogin] = useState(false)
     
    const showLoginPage = () =>{
    toggle(setShowLogin, showLogin); // then toggle the registration page
                 }           
const handleNavigate = () =>{
  const email =''
  const firstName=''
  const lastName =''
  const token =''
  const role=''
    if (checkedSubjects.length !== 4) {
          alert('Please select up to four subjects (English + 3 others)');
          return checkedSubjects;
        }
  dispatch({
           type: 'CBT',
           payload: {
             email:state.email,
             firstName:state.firstName,
             lastName:state.lastName,
             token:state.token,
             role:state.role,
             subjects:checkedSubjects,
             examMode:mode
           }
         });
 console.log(state)
         // Redirect to dashboard after login
        state.firstName!== null && state.firstName!=='' 
        ? router.push('/exam_preparation/jamb_simulator/exam_instructions'):
        showLoginPage()
    }

  return (
    <>
     {showLogin  && 
          <div className='md:fixed absolute p-10 md:p-0 inset-0 bg-[#0000008F] bg-opacity-50  z-40'>
            <SignInPage setShowLogin={setShowLogin}/>
          </div>
          }    
      <section className="flex flex-col md:flex-row gap-[12px] justify-between bg-[#F3F3F3] xl:px-[100px] px-[16px] py-[24px]">
        <div>
          <h2 className="text-[32px] font-[700]">JAMB SIMULATOR</h2>
        </div>
        <button className="w-[280px] px-[24px] py-[12px] bg-[#FF5900] rounded-[8px] text-white">
          Study Saved questions
        </button>
      </section>

      <section className="xl:px-[100px] px-[16px] flex gap-[20px] md:flex-row flex-col bg-[#F3F3F3] py-[24px]">
        <aside className="lg:w-[836px] bg-[#FFFFFF] flex flex-col gap-[48px] lg:px-[32px] px-[16px] py-[40px]">
          <p>
            Select your subject combination. English language has been selected
            for you because it is compulsory. Select three other subjects of
            your choice.
          </p>
          <div className="flex flex-col gap-2">
            {subjects.map((subject, index) => (
              <span key={index} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name={subject.name}
                  checked={checkedSubjects.includes(subject.name)}
                  disabled={subject.name === 'English Language'}
                  onChange={handleCheckBox}
                />
                <span>{subject.name}</span>
              </span>
            ))}
            <div className='flex flex-col gap-[12px] mt-[12px]'>
            <p>Select Test Mode</p>
           <Select onValueChange={handleValuChange}>
                <SelectTrigger className="w-full md:w-[257px]">
                    <SelectValue placeholder="Select Test Mode" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='Practice Mode'>Practice Mode</SelectItem>
                    <SelectItem value='Exam Mode'>Exam Mode</SelectItem>
                </SelectContent>
            </Select>
          <button className='px-[24px] py-[12px] rounded-[8px] bg-[#FF5900] w-[171px] text-white' onClick={handleNavigate}>Next
            {/* <Link href={'/exam_preparation/jamb_simulator/exam_instructions'}>Next</Link> */}
          </button>

            </div>
          </div>

          </aside>

        {/* RIGHT SIDEBAR (unchanged from your original) */}
        <aside className="lg:w-[370px] flex flex-col gap-[40px] border-1 p-2">
          <article className="flex flex-col gap-[24px]">
            <div className="grid grid-cols-5 pt-3 gap-[20px]">
              {Schools.map((school, index) => (
                <div
                  key={index}
                  className={`rounded-none text-[12px] lg:text-[10px] p-[2px] lg:p-[10px] text-white ${school.bgColor1}`}
                >
                  <Link
                    href="/"
                    className={`flex items-center justify-center lg:text-[9px] xl:text-[9px] lg:px-[2px] ${school.bgColor2}`}
                  >
                    {school.name}
                  </Link>
                </div>
              ))}
            </div>
            <Link href="" className="text-[#097C46] underline">
              Access guide on how to get admission into your desired school and
              courses
            </Link>
          </article>

          <div className="md:flex hidden">
            <div className="bg-[#FEF6E6] p-[16px] flex flex-col gap-[24px]">
              <span className="flex items-center px-[16px] py-[8px] gap-[12px]">
                <FiPhoneOutgoing className="w-[50px] h-[50px]" />
                <p className="font-semibold text-[24px] leading-[100%]">
                  Need Help? Book a one-on-one Tutor
                </p>
              </span>
              <p className="text-[16px]">
                Need extra help with your studies? Connect with experienced
                tutors for one-on-one or group lessons tailored to your needs.
              </p>
            </div>
          </div>

          <div className="md:flex hidden">
            <span>
              <Image src={image} alt="" />
              <figcaption className="text-center pt-2.5">
                <Link className="underline text-[#097647]" href="">
                  Sign Up for Our Various Holiday Classes
                </Link>
              </figcaption>
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
              <Link href="">Start Now </Link>
            </Button>
          </div>

          <div className="bg-[#FBE3B0] p-[16px] flex flex-col gap-[24px] mb-[50px]">
            <p className="text-[18px]">
              Watch Video Lessons on various subjects and topics to be better
              prepared for your exams
            </p>
            <Button
              variant="outline"
              className="w-[50%] text-[#FF5900] border border-[#FF5900] bg-transparent"
            >
              <Link href="">Watch Now </Link>
            </Button>
          </div>
        </aside>
      </section>
    </>
  );
}
