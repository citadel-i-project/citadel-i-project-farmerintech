import React from 'react'
import Image from 'next/image'
import Mother from '@/app/assets/mother-spending-time-with-her-child 1.png'
import { Button } from '@/components/ui/button'
import Waec from '@/app/assets/Frame 70.png'
import { Checkbox } from '@/components/ui/checkbox'
import Client from '@/app/assets/Attending the Client 1.png'
import newasset from '@/app/assets/assetnew.jpg'
import Frame from '@/app/assets/Frame 99.png'
import sponsor from '@/app/assets/sponsor.jpg'
import Star from '@/app/assets/glowing-star.png'
import Link from 'next/link'
import { toggle } from "@/lib/utils";
import { useEffect, useState } from "react";
import SignUpPage from '../authPage/signup/signupPage'
import SignInPage from "../authPage/signin/signinPage";

export default function home() {
           const [showReg, setShowReg] = useState(false)
         const [showLogin, setShowLogin] = useState(false)
         const showRegPage = () =>{
           toggle(setShowReg, showReg); // then toggle the registration page
         }
         const showLoginPage = () =>{
          toggle(setShowLogin, showLogin); // then toggle the registration page
        }

  return (
    <>
       {showReg && (
        <div className='fixed pl-5 pr-5 pt-5 md:p-0 inset-0 bg-[#0000008F] bg-opacity-50 z-40'>
          <SignUpPage setShowReg={setShowReg} />
        </div>
      )}

      {showLogin && (
        <div className='fixed pl-5 pr-5 pt-5 md:p-0 inset-0 bg-[#0000008F] bg-opacity-50 z-40'>
          <SignInPage setShowLogin={setShowLogin} />
        </div>
      )}

      <main className="py-[32px] flex  md:flex-row flex-col  md:px-[100px] px-[24px]  bg-[#F4B733] ">
        <div className="md:w-[585px] flex flex-col gap-[32px] md:h-[286px]h-auto">
          <h2 className="text-[32px] max-w-[585px] font-semibold leading-[38.73px]">
            Are You a Parent looking to Home School Your Child?
          </h2>
          <span className="flex flex-col gap-[56px]">
            <p className="text-white text-[18px]">
              Give your child the best education from the comfort of your home
              with our comprehensive home schooling support. We provide
              top-quality learning materials, structured lesson plans, and
              expert guidance to help your child excel academically.
            </p>
            <Button className="w-[197px] h-[48px] text-[18px] bg-[#FF5900]"  onClick={()=>showRegPage()}>
              Register Now
            </Button>
          </span>
        </div>
        <div className="md:w-[481px] md:h-[365.48px] md:py-0 py-[32px]">
          <Image src={Mother} alt="" layout="responsive" />
        </div>
      </main>
      <main className="bg-[#FFF7F3] lg:px-[135px] md:py-[64px] py-[32px] px-[24px] h-auto">
        <h2 className="text-[32px] font-semibold">Our Services</h2>
        <div className="flex justify-between flex-col md:flex-row gap-[64px]">
          <div className="flex-1">
            <Image src={Waec} alt="" layout="responsive" />
          </div>
          <div className="flex-1 md:w-1/2">
            <h2 className="font-semibold md:text-[24px]">
              Exam Peparation, Guidance and Tutoring
            </h2>
            <span className="flex flex-col gap-[10px]">
              <h3 className="text-[18px] font-semibold">
                Pass your Exams with Confidence!
              </h3>
              <p className="text-[18px] leading-[21.78px]">
                We provide expert tutoring and resources to help you ace your
                exams. From standardized interntaional tests to national
                entrance exams, we equip you with the right knowledge,
                strategies and practice materials
              </p>
            </span>
            <span className="flex flex-col gap-[10px]">
              <h3 className="text-[18px] font-semibold">
                Exams We Prepare You For:
              </h3>
              <p className="flex gap-3 items-center">
                <span>
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.04883 10.9778L9.54883 13.4778L14.5488 8.47778M7.29883 18.4778H14.2988C15.699 18.4778 16.399 18.4778 16.9338 18.2053C17.4042 17.9656 17.7867 17.5832 18.0263 17.1128C18.2988 16.578 18.2988 15.8779 18.2988 14.4778V7.47778C18.2988 6.07765 18.2988 5.37759 18.0263 4.84281C17.7867 4.3724 17.4042 3.98995 16.9338 3.75027C16.399 3.47778 15.699 3.47778 14.2988 3.47778H7.29883C5.8987 3.47778 5.19863 3.47778 4.66385 3.75027C4.19345 3.98995 3.811 4.3724 3.57131 4.84281C3.29883 5.37759 3.29883 6.07765 3.29883 7.47778V14.4778C3.29883 15.8779 3.29883 16.578 3.57131 17.1128C3.811 17.5832 4.19345 17.9656 4.66385 18.2053C5.19863 18.4778 5.8987 18.4778 7.29883 18.4778Z"
                      stroke="#FF5900"
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                SAT, TOEFL, IELTS, IGCSE (for interntaional students)
              </p>
              <p className="flex gap-3 items-center">
                <span>
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.04883 10.9778L9.54883 13.4778L14.5488 8.47778M7.29883 18.4778H14.2988C15.699 18.4778 16.399 18.4778 16.9338 18.2053C17.4042 17.9656 17.7867 17.5832 18.0263 17.1128C18.2988 16.578 18.2988 15.8779 18.2988 14.4778V7.47778C18.2988 6.07765 18.2988 5.37759 18.0263 4.84281C17.7867 4.3724 17.4042 3.98995 16.9338 3.75027C16.399 3.47778 15.699 3.47778 14.2988 3.47778H7.29883C5.8987 3.47778 5.19863 3.47778 4.66385 3.75027C4.19345 3.98995 3.811 4.3724 3.57131 4.84281C3.29883 5.37759 3.29883 6.07765 3.29883 7.47778V14.4778C3.29883 15.8779 3.29883 16.578 3.57131 17.1128C3.811 17.5832 4.19345 17.9656 4.66385 18.2053C5.19863 18.4778 5.8987 18.4778 7.29883 18.4778Z"
                      stroke="#FF5900"
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                JAMB, WAEC (for Nigeria students)
              </p>
            </span>
            <div className="mt-5">
              <p className="flex gap-3 items-center">
                <span>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.39196 12.5433L7.87522 3.07217C8.17826 2.54873 8.32979 2.28701 8.52747 2.19911C8.69991 2.12243 8.89677 2.12243 9.06921 2.19911C9.26689 2.28701 9.41841 2.54873 9.72146 3.07217L15.2047 12.5433C15.5089 13.0686 15.6609 13.3312 15.6384 13.5468C15.6188 13.7349 15.5203 13.9057 15.3674 14.0169C15.1921 14.1444 14.8886 14.1444 14.2816 14.1444H3.31508C2.70807 14.1444 2.40456 14.1444 2.22925 14.0169C2.07635 13.9057 1.97783 13.7349 1.95823 13.5468C1.93576 13.3312 2.08782 13.0686 2.39196 12.5433Z"
                      fill="#F1A500"
                    />
                  </svg>
                </span>
                1-on-1 & Group Tutoring Sessions{" "}
              </p>
              <p className="flex gap-3 items-center">
                <span>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.39196 12.5433L7.87522 3.07217C8.17826 2.54873 8.32979 2.28701 8.52747 2.19911C8.69991 2.12243 8.89677 2.12243 9.06921 2.19911C9.26689 2.28701 9.41841 2.54873 9.72146 3.07217L15.2047 12.5433C15.5089 13.0686 15.6609 13.3312 15.6384 13.5468C15.6188 13.7349 15.5203 13.9057 15.3674 14.0169C15.1921 14.1444 14.8886 14.1444 14.2816 14.1444H3.31508C2.70807 14.1444 2.40456 14.1444 2.22925 14.0169C2.07635 13.9057 1.97783 13.7349 1.95823 13.5468C1.93576 13.3312 2.08782 13.0686 2.39196 12.5433Z"
                      fill="#F1A500"
                    />
                  </svg>
                </span>
                Comprehensive Study Plans & Past Questions
              </p>
              <p className="flex gap-3 items-center">
                <span>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.39196 12.5433L7.87522 3.07217C8.17826 2.54873 8.32979 2.28701 8.52747 2.19911C8.69991 2.12243 8.89677 2.12243 9.06921 2.19911C9.26689 2.28701 9.41841 2.54873 9.72146 3.07217L15.2047 12.5433C15.5089 13.0686 15.6609 13.3312 15.6384 13.5468C15.6188 13.7349 15.5203 13.9057 15.3674 14.0169C15.1921 14.1444 14.8886 14.1444 14.2816 14.1444H3.31508C2.70807 14.1444 2.40456 14.1444 2.22925 14.0169C2.07635 13.9057 1.97783 13.7349 1.95823 13.5468C1.93576 13.3312 2.08782 13.0686 2.39196 12.5433Z"
                      fill="#F1A500"
                    />
                  </svg>
                </span>
                Mock Exams and Personalized Feedback
              </p>
            </div>
            <span className=" flex  xl:flex-row flex-col gap-[20px] pt-8 ">
              <Button className="w-auto md:text-[18px] text-[12px]  bg-[#FF5900]">
                <Link href="/exam_preparation"> Access Guide and Past Questions</Link>
               
              </Button>
              <Button
                variant="outline"
                className="hover:bg-black w-auto md:text-[18px] text-[12px] hover:text-white border-[1px] border-black"
              >
                <Link href="/bookings">Book a free consultation</Link>
                
              </Button>
            </span>
          </div>
        </div>
      </main>

      <main className="flex md:flex-row flex-col-reverse   items-center md:px-[32px]  lg:px-[100px] md:py-[100px] py-[32px] gap-[56px]">
        <div className="lg:w-[581px]  w-[100%] md:px-0 px-[24px] flex flex-col gap-[32px] md:h-[455px]">
          <h2 className="font-semibold text-[24px]">
            Educational & Career Counselling
          </h2>
          <span
            className="flex w-auto lg:w-[541px] lg:h-[194px] rounded-[8px]   flex-col bg-[#3E414A] text-white p-[16px]
     gap-[8px]"
          >
            <h3 className="text-[18px] font-semibold">
              Unlock Your Potential with Guidance Expert
            </h3>
            <p className="text-[18px] leading-[21.78px]">
              Not sure about your academic or career move? Our expert
              counsellors are here to guide you through school admissions,
              career paths, and exam Preparation. Whether you need advise on
              choosing the right course, applying to local or international
              schools, or preparing for an important exam, we've got you
              covered!
            </p>
          </span>
          <span className="flex flex-col gap-[10px]">
            <p className="flex gap-3 items-center">
              <span>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 12.9778L11 15.9778L17 9.97778M8.3 21.9778H16.7C18.3802 21.9778 19.2202 21.9778 19.862 21.6508C20.4265 21.3632 20.8854 20.9042 21.173 20.3398C21.5 19.698 21.5 18.8579 21.5 17.1778V8.77778C21.5 7.09763 21.5 6.25755 21.173 5.61581C20.8854 5.05133 20.4265 4.59238 19.862 4.30476C19.2202 3.97778 18.3802 3.97778 16.7 3.97778H8.3C6.61984 3.97778 5.77976 3.97778 5.13803 4.30476C4.57354 4.59238 4.1146 5.05133 3.82698 5.61581C3.5 6.25755 3.5 7.09763 3.5 8.77778V17.1778C3.5 18.8579 3.5 19.698 3.82698 20.3398C4.1146 20.9042 4.57354 21.3632 5.13803 21.6508C5.77976 21.9778 6.61984 21.9778 8.3 21.9778Z"
                    stroke="#F1A500"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              Personalized Career Guidance{" "}
            </p>

            <p className="flex gap-3 items-center">
              <span>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 12.9778L11 15.9778L17 9.97778M8.3 21.9778H16.7C18.3802 21.9778 19.2202 21.9778 19.862 21.6508C20.4265 21.3632 20.8854 20.9042 21.173 20.3398C21.5 19.698 21.5 18.8579 21.5 17.1778V8.77778C21.5 7.09763 21.5 6.25755 21.173 5.61581C20.8854 5.05133 20.4265 4.59238 19.862 4.30476C19.2202 3.97778 18.3802 3.97778 16.7 3.97778H8.3C6.61984 3.97778 5.77976 3.97778 5.13803 4.30476C4.57354 4.59238 4.1146 5.05133 3.82698 5.61581C3.5 6.25755 3.5 7.09763 3.5 8.77778V17.1778C3.5 18.8579 3.5 19.698 3.82698 20.3398C4.1146 20.9042 4.57354 21.3632 5.13803 21.6508C5.77976 21.9778 6.61984 21.9778 8.3 21.9778Z"
                    stroke="#F1A500"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              Admission Support for Local And International Schools{" "}
            </p>

            <p className="flex gap-3 items-center">
              <span>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 12.9778L11 15.9778L17 9.97778M8.3 21.9778H16.7C18.3802 21.9778 19.2202 21.9778 19.862 21.6508C20.4265 21.3632 20.8854 20.9042 21.173 20.3398C21.5 19.698 21.5 18.8579 21.5 17.1778V8.77778C21.5 7.09763 21.5 6.25755 21.173 5.61581C20.8854 5.05133 20.4265 4.59238 19.862 4.30476C19.2202 3.97778 18.3802 3.97778 16.7 3.97778H8.3C6.61984 3.97778 5.77976 3.97778 5.13803 4.30476C4.57354 4.59238 4.1146 5.05133 3.82698 5.61581C3.5 6.25755 3.5 7.09763 3.5 8.77778V17.1778C3.5 18.8579 3.5 19.698 3.82698 20.3398C4.1146 20.9042 4.57354 21.3632 5.13803 21.6508C5.77976 21.9778 6.61984 21.9778 8.3 21.9778Z"
                    stroke="#F1A500"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              Exam Preparation And Study Plans{" "}
            </p>
          </span>

          <span className=" flex gap-[20px]">
            <Button
              variant="outline"
              className="hover:bg-black hover:text-white border-[1px] border-black"
            >
           <Link href="/bookings">Book a Free Counselling Session Today</Link>
              
            </Button>
          </span>
        </div>

        <div className="md:w-[486px] w-full flex-col gap-[20px] md:px-0 px-[24px] md:h-[395.21px]">
          <Image src={Client} alt="" layout="responsive" />
        </div>
      </main>

      <main className="flex lg:px-[100px] bg-[#FFF8EA] items-center py-[24px] md:flex-row flex-col md:py-[64px] md:min-h-[662px]  px-[24px] justify-center md:pt-[100px] gap-[56px]">
        <div className="md:w-[471px]  lg:h-auto w-full">
          <Image src={newasset} alt="" layout="responsive" />
        </div>
        <div className="md:w-[581px] flex flex-col gap-[38px] md:h-auto">
          <h2 className="font-semibold text-[24px]">
            Holiday Coaching for Kids & Teens
          </h2>
          <span className="flex flex-col gap-[10px]">
            <h3 className="text-[18px] font-semibold">
              Make the Holidays Count- Learn and Grow!
            </h3>
            <p className="text-[18px] leading-[21.78px]">
              Turn your scool breaks into an opportunity for growth with our fun
              and engaging holiday coaching programs whether you want to improve
              Science, Mathematics, and English or explore new skills in Graphic
              Design and Coding, Our expert tutors are here to help.
            </p>
          </span>
          <p className="">Subject Offered:</p>
          <span className=" bg-[#F6C354] rounded-md grid grid-cols-4 gap-[10px] p-[10px]">

            <p className="p-[5px] border-gray-400 border-r-[1px]">Science</p>

            <p className="p-[5px] border-gray-400 border-r-[1px]">
              Mathematics
            </p>

            <p className="p-[5px] border-gray-400 border-r-[1px]">Engslih</p>

            <p className="p-[5px] border-gray-400 border-r-[1px]">
              Graphic Design
            </p>

            <p className="p-[5px] border-gray-400 border-r-[1px]">Coding</p>
          </span>
          <span className="flex flex-col gap-[10px]">
            <p className="flex gap-3 items-center">
              <Checkbox className="" />
              Taught By Experience Instructors
            </p>

            <p className="flex gap-3 items-center">
              <Checkbox className="" />
              Fun & Interactive Learning
            </p>

            <p className="flex gap-3 items-center">
              <Checkbox className="" />
              100% Online & Accessible{" "}
            </p>
          </span>

          <span className=" flex gap-[20px]">
            <Button
              className=" h-[48px] text-[18px] hover:text-white bg-[#FF5900] text-white" onClick={()=>showRegPage()}>
             Register Now to Secure a Spot
              
            </Button>
          </span>
        </div>
      </main>

      <main className="flex lg:px-[100px] bg-[#FFFBF9] px-[24px] md:flex-row flex-col  py-[32px]  justify-center items-center md:py-[100px] gap-[56px]">
        <div className="md:w-[471px] w-full h-auto">
          <Image src={Frame} alt="" layout="responsive" />
        </div>
        <div className="lg:w-[581px] md:w-[420px] flex-1  flex flex-col gap-[16px]  md:h-[455px] mx:px-[24px] px-[16px]">
          <h2 className="font-semibold text-[24px]">Book a Tutor</h2>
          <span className="flex flex-col gap-[10px]">
            <h3 className="text-[18px] font-semibold">
              Peronalized Learning at Your Fingertips
            </h3>
            <p className="text-[18px] leading-[21.78px]">
              Need Extra help with your studies? Connect with experienced tutors
              for one-on-one or group lesons tailored to your needs. Whether
              you're prepaing for an exam, struggling with a Subject, or want to
              improve your skills, our expert tutors are here to guide you.
            </p>
          </span>

          <span className="">
            <p className="">Why chose Our Tutors</p>
            <span className="flex flex-col gap-[10px]">
              <p className="flex gap-3 items-center">
                <span>
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.93066 12.9775L10.9307 15.9775L16.9307 9.97754M8.23066 21.9775H16.6307C18.3108 21.9775 19.1509 21.9775 19.7926 21.6506C20.3571 21.3629 20.8161 20.904 21.1037 20.3395C21.4307 19.6978 21.4307 18.8577 21.4307 17.1775V8.77754C21.4307 7.09738 21.4307 6.2573 21.1037 5.61557C20.8161 5.05108 20.3571 4.59214 19.7926 4.30452C19.1509 3.97754 18.3108 3.97754 16.6307 3.97754H8.23066C6.55051 3.97754 5.71043 3.97754 5.06869 4.30452C4.50421 4.59214 4.04526 5.05108 3.75764 5.61557C3.43066 6.2573 3.43066 7.09738 3.43066 8.77754V17.1775C3.43066 18.8577 3.43066 19.6978 3.75764 20.3395C4.04526 20.904 4.50421 21.3629 5.06869 21.6506C5.71043 21.9775 6.55051 21.9775 8.23066 21.9775Z" stroke="#FF5900" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>                
                Taught By Experience Instructors
              </p>
              <p className="flex gap-3 items-center">
                <span>
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.93066 12.9775L10.9307 15.9775L16.9307 9.97754M8.23066 21.9775H16.6307C18.3108 21.9775 19.1509 21.9775 19.7926 21.6506C20.3571 21.3629 20.8161 20.904 21.1037 20.3395C21.4307 19.6978 21.4307 18.8577 21.4307 17.1775V8.77754C21.4307 7.09738 21.4307 6.2573 21.1037 5.61557C20.8161 5.05108 20.3571 4.59214 19.7926 4.30452C19.1509 3.97754 18.3108 3.97754 16.6307 3.97754H8.23066C6.55051 3.97754 5.71043 3.97754 5.06869 4.30452C4.50421 4.59214 4.04526 5.05108 3.75764 5.61557C3.43066 6.2573 3.43066 7.09738 3.43066 8.77754V17.1775C3.43066 18.8577 3.43066 19.6978 3.75764 20.3395C4.04526 20.904 4.50421 21.3629 5.06869 21.6506C5.71043 21.9775 6.55051 21.9775 8.23066 21.9775Z" stroke="#FF5900" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                Fun & Interactive Learning
              </p>
              <p className="flex gap-3 items-center">
                <span>
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.93066 12.9775L10.9307 15.9775L16.9307 9.97754M8.23066 21.9775H16.6307C18.3108 21.9775 19.1509 21.9775 19.7926 21.6506C20.3571 21.3629 20.8161 20.904 21.1037 20.3395C21.4307 19.6978 21.4307 18.8577 21.4307 17.1775V8.77754C21.4307 7.09738 21.4307 6.2573 21.1037 5.61557C20.8161 5.05108 20.3571 4.59214 19.7926 4.30452C19.1509 3.97754 18.3108 3.97754 16.6307 3.97754H8.23066C6.55051 3.97754 5.71043 3.97754 5.06869 4.30452C4.50421 4.59214 4.04526 5.05108 3.75764 5.61557C3.43066 6.2573 3.43066 7.09738 3.43066 8.77754V17.1775C3.43066 18.8577 3.43066 19.6978 3.75764 20.3395C4.04526 20.904 4.50421 21.3629 5.06869 21.6506C5.71043 21.9775 6.55051 21.9775 8.23066 21.9775Z" stroke="#FF5900" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>                
                100% Online & Accessible{" "}
              </p>
            </span>
          </span>

          <span className=" flex flex-col md:flex-row gap-[20px]">
            <Button
              variant="outline"
              className="hover:bg-black h-[48px] text-[18px] hover:text-white bg-[#FF5900] text-white"  onClick={()=>showRegPage()}>
              
              Become a Tutor Now!
            </Button>

            <Button
              variant="outline"
              className="hover:bg-black h-[48px] text-[18px] hover:text-white bg-[#FFEEE6] text-[#FF5900]">
              Become a Tutor
            </Button>
          </span>
        </div>
      </main>
      <main className="flex md:flex-row bg-[#F6F6F6]  py-[24px] items-center  flex-col lg:px-[100px] px-[24px] pb-[100px] justify-center gap-[56px]">
        <div className="md:w-[719px]  flex flex-col gap-[16px] md:h-auto">
          <h2 className="font-semibold text-[40px]">Sponsor A Candidate</h2>
          <span className="flex flex-col gap-[24px] rounded-[8px] bg-[#3E414A] p-[24px] text-white">
            <h3 className="text-[18px] font-semibold">
              Give the Gift Education!
            </h3>
            <p className="text-[18px] leading-[21.78px]">
              Many Student lack access to quality education due to to financial
              constraints. Through Our Sponsor a student Campaign, you can hel
              provide a tuition, learning materials and academic support to
              students in need.
            </p>
            <p className="">How You can Help:</p>
            <span className="lg:flex grid grid-cols-1 gap-[8px]">
              <h2 className="md:p-[16px] p-[5px] text-black rounded-[8px] bg-[#FFEEE6]">
                <span>
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.93066 12.9775L10.9307 15.9775L16.9307 9.97754M8.23066 21.9775H16.6307C18.3108 21.9775 19.1509 21.9775 19.7926 21.6506C20.3571 21.3629 20.8161 20.904 21.1037 20.3395C21.4307 19.6978 21.4307 18.8577 21.4307 17.1775V8.77754C21.4307 7.09738 21.4307 6.2573 21.1037 5.61557C20.8161 5.05108 20.3571 4.59214 19.7926 4.30452C19.1509 3.97754 18.3108 3.97754 16.6307 3.97754H8.23066C6.55051 3.97754 5.71043 3.97754 5.06869 4.30452C4.50421 4.59214 4.04526 5.05108 3.75764 5.61557C3.43066 6.2573 3.43066 7.09738 3.43066 8.77754V17.1775C3.43066 18.8577 3.43066 19.6978 3.75764 20.3395C4.04526 20.904 4.50421 21.3629 5.06869 21.6506C5.71043 21.9775 6.55051 21.9775 8.23066 21.9775Z" stroke="#FF5900" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                </span> <p className="">Sponsor Tuition Fee For A Child</p>{" "}
              </h2>

              <h2 className="md:p-[16px] p-[5px] text-black rounded-[8px] bg-[#FFEEE6]">
                <span>
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.93066 12.9775L10.9307 15.9775L16.9307 9.97754M8.23066 21.9775H16.6307C18.3108 21.9775 19.1509 21.9775 19.7926 21.6506C20.3571 21.3629 20.8161 20.904 21.1037 20.3395C21.4307 19.6978 21.4307 18.8577 21.4307 17.1775V8.77754C21.4307 7.09738 21.4307 6.2573 21.1037 5.61557C20.8161 5.05108 20.3571 4.59214 19.7926 4.30452C19.1509 3.97754 18.3108 3.97754 16.6307 3.97754H8.23066C6.55051 3.97754 5.71043 3.97754 5.06869 4.30452C4.50421 4.59214 4.04526 5.05108 3.75764 5.61557C3.43066 6.2573 3.43066 7.09738 3.43066 8.77754V17.1775C3.43066 18.8577 3.43066 19.6978 3.75764 20.3395C4.04526 20.904 4.50421 21.3629 5.06869 21.6506C5.71043 21.9775 6.55051 21.9775 8.23066 21.9775Z" stroke="#FF5900" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                </span>                <p className="">
                  Provide Learning Materials & Examination Registration Support
                </p>{" "}
              </h2>

              <h2 className="md:p-[16px] p-[5px] text-black flex flex-col gap-[10px] rounded-[8px] bg-[#FFEEE6]">
                <span>
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.93066 12.9775L10.9307 15.9775L16.9307 9.97754M8.23066 21.9775H16.6307C18.3108 21.9775 19.1509 21.9775 19.7926 21.6506C20.3571 21.3629 20.8161 20.904 21.1037 20.3395C21.4307 19.6978 21.4307 18.8577 21.4307 17.1775V8.77754C21.4307 7.09738 21.4307 6.2573 21.1037 5.61557C20.8161 5.05108 20.3571 4.59214 19.7926 4.30452C19.1509 3.97754 18.3108 3.97754 16.6307 3.97754H8.23066C6.55051 3.97754 5.71043 3.97754 5.06869 4.30452C4.50421 4.59214 4.04526 5.05108 3.75764 5.61557C3.43066 6.2573 3.43066 7.09738 3.43066 8.77754V17.1775C3.43066 18.8577 3.43066 19.6978 3.75764 20.3395C4.04526 20.904 4.50421 21.3629 5.06869 21.6506C5.71043 21.9775 6.55051 21.9775 8.23066 21.9775Z" stroke="#FF5900" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                </span>                <p className="">
                  Empowwer A Future Leader with Quality Education
                </p>{" "}
              </h2>
            </span>
            <h2 className="flex items-center gap-[10px] md:text-[40px] text-[20px]">
              {" "}
              <Image src={Star} alt="" width={35} height={35} />
              Be A Changemaker{" "}
            </h2>

            <Button
              variant="outline"
              className="hover:bg-[#3E414A] h-[48px] w-[305px] text-[18px] hover:text-white
  bg-[#FF5900] text-white"
            >
           <Link href="/sponsor">Sponsor A Student Today!</Link>
              
            </Button>
          </span>
        </div>

        <div className="w-[313px]  h-[600.12px] ">
          <Image src={sponsor} alt="" layout="responsive" />
        </div>
      </main>
    </>
  );
}




