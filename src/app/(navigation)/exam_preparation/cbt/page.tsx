import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Maths from '@/app/assets/maths.png'
import { FiPhoneOutgoing } from 'react-icons/fi'
import EXamt from '@/app/assets/examtuto.png'
import jamb from "@/app/assets/jamb.png"
import image from "@/app/assets/imageholder.png"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Schools } from '../page'


export default function page (){

    return (
    <>
    <section className='flex flex-col md:flex-row gap-[12px] justify-between bg-[#F3F3F3] xl:px-[100px] px-[16px] py-[24px]'>
        <div>
            <h2 className='text-[32px] font-[700]'>WAEC & JAMB CBT SIMULATOR</h2>
        </div>
        <button className='w-[280px] px-[24px] py-[12px] bg-[#FF5900] rounded-[8px] text-white'>
        Study Saved questions
        </button>
    </section>
     <section className="xl:px-[100px] px-[16px] flex gap-[20px] md:flex-row flex-col bg-[#F3F3F3] py-[24px]">
        <aside className="lg:w-[836px] bg-[#FFFFFF] flex flex-col gap-[48px] lg:px-[32px] px-[16px]  py-[40px]">
            <p>
            Get ready for JAMB, WAEC, and other CBT exams with our interactive simulator! Practice with real-time questions, timed sessions, and instant results. Select your subjects and start your mock exam now.
            </p>
            <div className='bg-[#FEF6E6] p-[24px] gap-[32px] rounded-[8px] flex flex-col'>
                <Image src={jamb} alt='jamb'/>
                <div>
                    <p className='text-[24px] font-[500]'>JAMB Simulator</p>
                    <p>Great for practicing JAMB past questions</p>
                </div>
                <button className='px-[24px] py-[12px] rounded-[8px] bg-[#FF5900] w-[171px] text-white'>
                    <Link href={'/exam_preparation/jamb_simulator'}>Start Now</Link>
                </button>
            </div>
            <div className='bg-[#F3F3F3] p-[24px] gap-[32px] rounded-[8px] flex flex-col'>
                <div className='flex gap-[14.19px] w-[275px] flex-wrap'>
                   <button className='p-[8.87px] bg-[#B4E6CF]'>
                    <a href={'/exam_preparation/jamb_simulator'}  className='bg-[#097C47] p-[5px] text-white text-[14.19px]'>WAEC</a >
                    </button>
                    <button className='p-[8.87px] bg-[#B4E6CF]'>
                    <a href={'/exam_preparation/jamb_simulator'}  className='bg-[#097C47] p-[5px] text-white text-[14.19px]'>NECO</a >

                    </button>
                    <button className='p-[8.87px] bg-[#B4E6CF]'>
                    <a href={'/exam_preparation/jamb_simulator'} className='bg-[#097C47] p-[5px] text-white text-[14.19px]'>UTME</a>
                    </button>
                    <button className='p-[8.87px] bg-[#B4E6CF]'>
                    <a href={'/exam_preparation/jamb_simulator'} className='bg-[#097C47] p-[5px] text-white text-[14.19px]'>IGCSE</a>
                    </button>
                    <button className='p-[8.87px] bg-[#B4E6CF]'>
                    <a href={'/exam_preparation/jamb_simulator'} className='bg-[#097C47] p-[5px] text-white text-[14.19px]'>School exam</a>
                    </button>
                </div>
                <div>
                    <p className='text-[24px] font-[500]'>Custom Simulator</p>
                    <p>Great for practicing NECO, WAEC, UTME, School exams etc.</p>
                </div>
                <a href={'/exam_preparation/jamb_simulator'}  className='px-5 py-2 flex items-center w-[171px] justify-center text-center rounded-[8px] bg-[#FF5900] text-white'>
                    Start Now
                </a>
            </div>

        </aside>
        
        <aside className="lg:w-[370px] flex flex-col gap-[40px] border-1 p-2">
          <article className="flex flex-col gap-[24px]">
            <div className="grid grid-cols-5 pt-3 gap-[20px]">
              {Schools.map((school) => (
                <div
                  className={`rounded-none text-[12px]  lg:text-[10px] p-[2px] lg:p-[10px] text-white ${school.bgColor1}`}
                >
                  <Link
                    href="/"
                    className={`flex   items-center justify-center lg:text-[9px] xl:text-[9px] 
                lg:px-[2px] ${school.bgColor2}`}
                  >
                    {school.name}
                  </Link>
                </div>
              ))}
            </div>
            <Link href="/admission_info" className="text-[#097C46] underline">
              Access guide on how to get admission into your desired school and
              courses
            </Link>
          </article>

          <div className="md:flex hidden">
            <div className="bg-[#FEF6E6] p-[16px] flex flex-col gap-[24px]">
              <span className="flex items-center px-[16px] py-[8px] gap-[12px]  ">
                <FiPhoneOutgoing className="w-[50px] h-[50px]" />{" "}
                <p className="font-semibold text-[24px] leading-[100%]">
                  Need Help? Book a one-on-one Tutor
                </p>
              </span>
              <p className="text-[16px]">
                Need extra help with you studies? Connect with experienced
                tutors for one-on-one or Goup lessons tailored to your needs.
              </p>
            </div>
          </div>

          <div className="md:flex hidden">
            <span className="">
              <Image src={image} alt="" layout="" />
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
              <Link href={'/exam_preparation/jamb_simulator'} >Start Now </Link>{" "}
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
              <Link href="href={'/exam_preparation/jamb_simulator'} ">Watch Now </Link>{" "}
            </Button>
          </div>
        </aside>
      </section>
    </>
    );
}