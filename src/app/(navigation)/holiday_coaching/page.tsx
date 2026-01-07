"use client"

import HomeNavBar from "@/app/navbar"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { toggle } from "@/lib/utils";
import holiday from '@/app/assets/holiday.png'
import Image from 'next/image'
import stem from "@/app/assets/stem.png"
import graphics from "@/app/assets/graphic.png"
import coding from "@/app/assets/coding.png"

export default function Coaching (){
    return(
        <>
    
        <section className="bg-[#FFFFFF] lg:p-[64px] lg:pt-[32px] lg:px-[100px] px-[32px] py-[16px] gap-[24px] flex flex-col items-center  ">
            <div className=" flex flex-col items-center justify-center">
                <h2 className="text-[32px] :text-[48px] font-[600] text-[#0F0F0F] text-center">Holiday Coaching: Learn, Grow & Excel!</h2>
                <h4 className="md:text-[20px] text-[16px] max-w-[320px] font-[400] md:max-w-[784px] text-center">
                    Make the most of your holiday with our Holiday Coaching 
                    Program, designed to help students stay ahead academically 
                    and build essential skills.
                </h4>
            </div>
            <div className="gap-[32px] flex md:flex-row flex-col items-center justify-center md:flex-wrap ">
                <div className="w-[295px] md:w-[273px] h-[132px] bg-[#FBE3B0] p-[16px] gap-[12px] rounded-[8px]">
                    <p className="text-[18px] font-[600]">Subjects Covered</p>
                    <p className="text-[18px] font-[400]">Science, Mathematics, English, Graphic Design, and Coding for Kids/Teens.</p>

                </div>
                <div className="w-[295px] md:w-[273px] h-[132px] bg-[#FFCCB0] p-[16px] gap-[12px] rounded-[8px]">
                    <p className="text-[18px] font-[600]">Interactive Learning</p>
                    <p className="text-[18px] font-[400]">Engage in hands-on lessons and practical exercises.</p>

                </div>
                <div className="w-[295px] md:w-[273px] h-[132px] bg-[#D0D5DD] p-[16px] gap-[12px] rounded-[8px]">
                    <p className="text-[18px] font-[600]">Expert Tutors</p>
                    <p className="text-[18px] font-[400]">Learn from experienced teachers who make learning fun and effective.</p>

                </div>
            </div>
            <button className="bg-[#FF5900] px-[32px] py-[16px] rounded-[8px] flex gap-[4px] w-[173px] md:w-[312px] text-white justify-center items-center">
                Enroll Now
                <span>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 17L11.5 12L6.5 7M13.5 17L18.5 12L13.5 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </button>
            <div className="flex  gap-[48px] md:gap-[56px] flex-col md:flex-row">
                <div className="flex flex-col gap0 ">
                    <Image src={stem} alt={""} sizes="300" height={300}/>
                    <p className="bg-[#3E414A] px-[24px] py-[16px] text-white">STEM Class</p>
                </div>
                <div className="flex flex-col -gap-10 ">
                    <Image src={graphics} alt={""} sizes="300" height={300}/>
                    <p className="bg-[#3E414A] px-[24px] py-[16px] text-white">Graphic Design Class</p>
                </div><div className="flex flex-col -gap-10 ">
                    <Image src={coding} alt={""} sizes="300" height={300}/>
                    <p className="bg-[#3E414A] px-[24px] py-[16px] text-white">Coding</p>
                </div>
            </div>
        </section>
        
        </>
    )
}