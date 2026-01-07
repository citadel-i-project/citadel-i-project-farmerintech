'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronUp, FaUser } from 'react-icons/fa';
import { useUser } from '@/app/context/reducer';


export default function Page() {
  const {state} = useUser()

  return (
    <>
      <section className="flex flex-col md:flex-row gap-[12px] justify-between bg-[#F3F3F3] xl:px-[100px] px-[16px] py-[24px]">
        <div>
          <h2 className="text-[32px] font-[700]">Exam Instruction</h2>
        </div>
        <button className="w-[280px] px-[24px] py-[12px] bg-[#FF5900] rounded-[8px] text-white">
          Study Saved questions
        </button>
      </section>

      <section className="xl:px-[100px] px-[16px]  gap-[20px] bg-[#F3F3F3] py-[24px]">
        <main className='flex flex-col justify-center items-center gap-[16px] bg-white pb-[24px]'>
        <main className=' flex md:flex-row flex-col bg-white px-[16px] py-[32px] gap-[32px] rounded-[4px] w-full'>
        <aside className="bg-[#FFFFFF] flex flex-col gap-[16px] lg:px-[32px] px-[16px] py-[40px] rounded-[8px] md:w-[25%] w-full border-1 border-[#E7E7E7]">
            <p className='border-b-[1px] font-[500]'>Candidate details</p>
            <div className='flex justify-center items-center w-[80px] h-[80px] rounded-full border-1 border-[#E7E7E7]'>
            <FaUser/>
            </div>
            <p>{'Yakub Shakirudeen'}</p>
            <p>Exam Duration:  {state?.examMode === 'Practice Mode' ? "40 minutes":"2 hours"}</p>
            <div>
                <p>Selected Subjects</p>
                <ul>
                  {
                    state?.subjects.map((subject, index) =>(
                      <li className='text-[#076037]' key={index}>{subject}</li>
                    ))
                  }
                </ul>
            </div>
        </aside>
        <aside className="bg-[#FFFFFF] flex flex-col gap-[48px] lg:px-[32px] px-[16px] py-[40px] md:w-[45%] rounded-[8px] border-1 border-[#E7E7E7]">
            <p className='border-b-[1px] font-[500]'>Exam Instructions</p>
        </aside>
        <aside className="bg-[#FFFFFF] flex flex-col gap-[48px] lg:px-[32px] px-[16px] py-[40px] md:w-[30%] rounded-[8px] border-1 border-[#E7E7E7]">
        <p className='border-b-[1px] font-[500]'>Keyboard Usage</p>
        <div className='flex flex-col gap-[16px]'>
            <div className='flex gap-[16px]'>
                <span className='bg-[#4473FF] text-white w-[32px] h-[32px] rounded-[2px] flex justify-center items-center'>A</span>
                <span>Select Option A</span>
            </div>
            <div className='flex gap-[16px]'>
                <span className='bg-[#4473FF] text-white w-[32px] h-[32px] rounded-[2px] flex justify-center items-center'>B</span>
                <span>Select Option B</span>
            </div>
            <div className='flex gap-[16px]'>
                <span className='bg-[#4473FF] text-white w-[32px] h-[32px] rounded-[2px] flex justify-center items-center'>C</span>
                <span>Select Option C</span>
            </div>
            <div className='flex gap-[16px]'>
                <span className='bg-[#4473FF] text-white w-[32px] h-[32px] rounded-[2px] flex justify-center items-center'>D</span>
                <span>Select Option D</span>
            </div>
            <div className='flex gap-[16px]'>
                <span className='bg-[#4473FF] text-white w-[32px] h-[32px] rounded-[2px] flex justify-center items-center'>N</span> OR 
                <span className='bg-[#4473FF] text-white w-[32px] h-[32px] rounded-[2px] flex justify-center items-center'><FaChevronRight/></span>  
                <span>Next/Forward</span>
            </div>
            <div className='flex gap-[16px]'>
                <span className='bg-[#4473FF] text-white w-[32px] h-[32px] rounded-[2px] flex justify-center items-center'>P</span> OR
                <span className='bg-[#4473FF] text-white w-[32px] h-[32px] rounded-[2px] flex justify-center items-center'><FaChevronLeft/></span>  
                <span>Previous/Back</span>
            </div>
            <div className='flex gap-[16px]'>
                <span className='bg-[#4473FF] text-white w-[32px] h-[32px] rounded-[2px] flex justify-center items-center'><FaChevronUp/></span>  
                <span>MoveUP</span>
            </div>
            <div className='flex gap-[16px]'>
                <span className='bg-[#4473FF] text-white w-[32px] h-[32px] rounded-[2px] flex justify-center items-center'><FaChevronDown/></span>  
                <span>MoveDown</span>
            </div>
            <div className='flex gap-[16px]'>
                <span className='bg-[#4473FF] text-white w-[32px] h-[32px] rounded-[2px] flex justify-center items-center'>S</span>  
                <span>Submit</span>
            </div>
        </div>
        </aside>
        </main>
        <button className='w-[278px] py-[12px] px-[24px] text-white bg-[#FF5900] rounded-[8px]'>
          <Link href={'/exam_preparation/jamb_simulator/exam'}>Start Exam</Link>
          </button>
        </main>
      </section>
    </>
  );
}
