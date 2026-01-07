"use client"

import counsel from "@/app/assets/student.jpg"
import chat from "@/app/assets/chat.svg"
import Image from "next/image";
import { Beneficiaries } from "@/app/components/beneficiaries";
import partner from "@/app/assets/partner.jpg"

export default function Counselling (){
     
    return(
        <>
        
        <section className=" bg-[#FFFBF9] lg:px-[100px] px-[32px] py-[64px]">
         <div className=" flex flex-col md:flex-row items-center md:items-start justify-between gap-[32px] md:gap-[12px]">
         <aside className="flex flex-col gap-[40px] md:w-1/2">
            <h2 className="font-[600] md:text-[48px] text-[32px] color-[#0F0F0F]">Sponsor a Student: Empower a Brighter Future</h2>
            <p className="font-[400] text-[18px] color-[#0F0F0F]">Education is a powerful tool for change, but not every student has the financial means to pursue their dreams. Our Sponsor a Student initiative provides an opportunity for generous individuals and organizations to support students in need.</p>
            
            <div className="flex flex-col gap-[32px]">
                <h3 className="font-[600] text-[24px] text-[#0F0F0F] flex gap-[16px]">
                    <span><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.6098 6.40142L13.3849 20.608C12.9304 21.3932 12.7031 21.7858 12.4065 21.9176C12.1479 22.0327 11.8526 22.0327 11.5939 21.9176C11.2974 21.7858 11.0701 21.3932 10.6156 20.608L2.39068 6.40143C1.93447 5.61344 1.70637 5.21944 1.74008 4.89607C1.76949 4.61403 1.91726 4.35773 2.14662 4.19096C2.40957 3.99977 2.86484 3.99977 3.77536 3.99977H20.2251C21.1357 3.99977 21.5909 3.99977 21.8539 4.19096C22.0832 4.35773 22.231 4.61403 22.2604 4.89607C22.2941 5.21944 22.066 5.61344 21.6098 6.40142Z" fill="#FF5900" stroke="#FF5900" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </span>
                    <span> Why Sponsor?</span>
                </h3>
                <p className="text-[18px] font-[400]">By sponsoring a student, you help cover tuition, learning materials, and exam fees, giving them access to quality education.</p>
            </div>
            
            <div className="flex flex-col gap-[32px]">
                <h3 className="font-[600] text-[24px] text-[#0F0F0F] flex gap-[16px]">
                    <span><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.6098 6.40142L13.3849 20.608C12.9304 21.3932 12.7031 21.7858 12.4065 21.9176C12.1479 22.0327 11.8526 22.0327 11.5939 21.9176C11.2974 21.7858 11.0701 21.3932 10.6156 20.608L2.39068 6.40143C1.93447 5.61344 1.70637 5.21944 1.74008 4.89607C1.76949 4.61403 1.91726 4.35773 2.14662 4.19096C2.40957 3.99977 2.86484 3.99977 3.77536 3.99977H20.2251C21.1357 3.99977 21.5909 3.99977 21.8539 4.19096C22.0832 4.35773 22.231 4.61403 22.2604 4.89607C22.2941 5.21944 22.066 5.61344 21.6098 6.40142Z" fill="#FF5900" stroke="#FF5900" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </span>
                    <span> How It Works?</span>
                </h3>
                <div className="flex flex-col gap-[24px] ">
                <p className="text-[18px] font-[400] flex gap-[8px]">
                    <span>
                       <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <rect x="4" y="6" width="12" height="12" fill="#F9D68A"/>
                       </svg>

                    </span>
                    <span>By sponsoring a student, you help cover tuition, learning materials, and exam fees, giving them access to quality education.</span>
                </p>
                <p className="text-[18px] font-[400] flex gap-[8px]">
                    <span>
                       <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <rect x="4" y="6" width="12" height="12" fill="#F9D68A"/>
                       </svg>

                    </span>
                    <span>Your contribution goes directly toward their academic needs.</span>
                </p>
                <p className="text-[18px] font-[400] flex gap-[8px]">
                    <span>
                       <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <rect x="4" y="6" width="12" height="12" fill="#F9D68A"/>
                       </svg>

                    </span>
                    <span>Receive updates on their progress and success.</span>
                </p>

                </div>
            </div>
            <div className="flex gap-[32px]">
                <span>
                    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.99023 21.6494C10.927 28.9004 18.1711 42.5075 39.6536 38.927C61.1361 35.3466 69.5605 52.4925 71.0864 61.5128M71.0864 61.5128L66.1945 57.7659M71.0864 61.5128L73.0639 56.1006" stroke="black" stroke-width="2.57253" stroke-linecap="round"/>
                    </svg>
                </span>
                <p>Be the reason a child stays in school. Join the movement today and make a lasting impact!</p>
                
            </div>
            <button className="bg-[#FF5900] text-white px-[24px] py-[12px] flex gap-[8px] w-full md:w-[426px] rounded-[8px]">
            Book a Free Counselling Session Today!
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 17L11 12L6 7M13 17L18 12L13 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </button>
        </aside>
        <aside className="flex flex-col gap-[94px] px-[16px]">
            <div className="w-full flex items-center justify-center ">
                <Image src={counsel} width={100} height={100} layout="responsive" className="rounded-[8px]" alt=""/>
            </div>
            <div className="lg:w-[462px] w-full h-[104px] gap-[32px] p-[16px] rounded-[9px] bg-[#F6C354]">
                <p className="font-[600]">Your giving as much as  $50 can keep hope alive for that student who desires to sit for UTME/GCE/IGCSE</p>
            </div>
            <div className="font-[600] text-[#0F0F0F] text-[24] flex flex-col gap-[24px]">
                <h4>You can also have a quick chat with us on whatsapp to make enquiries</h4>
            </div>
            <div className="md:w-[288px] md:h-[208px] w-full h-full flex justify-center items-center">
                <Image src={chat} width={100} height={100} layout="responsive" alt=""/>
            </div>
        </aside>
         </div>
        </section>
        <section className=" bg-[#FFFBF9] lg:px-[100px] pt-[40px]">
        <Beneficiaries/>
        </section>
        {/* <section className="flex justify-center items-center w-[240px] h-[120px]">
            <Image src={partner} alt="partner"/>
        </section> */}
        </>
    )
}