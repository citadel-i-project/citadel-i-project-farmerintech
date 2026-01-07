import Image from "next/image"
import Light from '@/app/assets/_ui-award-03.png'
import { Button } from "@/components/ui/button"
import Link  from 'next/link' 
import Frame from '@/app/assets/Frame 15.png'
import Frame1 from '@/app/assets/Frame 24.png'

export const Hero = () =>{
    return(
        <section className="px-[16px] py-[24px] lg:px-[100px]">
            <article className="bg-[#FFEEE6] rounded-[41px] px-[41px] py-[35.5] ">
            <aside className="flex flex-col md:justify-center md:items-center md:flex-row gap-[40px] lg:gap-[51px]">
                <section className="gap-[32px] flex flex-col flex-1">
                    <div className="flex w-[140px] h-[26px]  items-center px-[8px] py-[4px] rounded-md  border-[1px] border-[#FF5900] gap-2.5">
                    <Image src={Light} height={20} width={20} alt=''/>
                    <span className="text-[#FF5900] text-[12px]"> 
                             Citadel-i-project  
                    </span>
                </div>
                <h2 className="text-[32px] lg:text-[48px] leading-[50px] lg:max-w-[603px] font-semibold">Your Learning Companion For Academic
                   Success!
                </h2>
                <p className="text-[18px] lg:max-w-[547px] flex-col flex gap-[12px]">
                    Study smarter with expert tutors, quality materials, and engaging lessons—anytime, anywhere.
                    <span className="text-[18px] font-[600]">For Students, Teachers , and Parents</span>
                </p>
                <div className="flex gap-[20px] lg:gap-10 items-center ">
                    <button className="bg-[#FF5900] hover:bg-[#344054] hover:text-white text-[16px] px-[16px] py-[8px] rounded-[8px] text-white">
                        <Link href='/classes/KS1'> Start Learning </Link> 
                    </button> 
                    <button className="border-[1px] text-[16px] hover:text-white hover:bg-black bg-transparent px-[16px] py-[8px] rounded-[8px] text-black border-black " >
                        <Link href='/bookings'>  Book a Tutor  </Link> 
                    </button>
                </div>
                </section>
                <aside className="lg:w-[40%] md:w-[40%] w-[100%]  lg:max-w-[498px] relative">
                <div className='absolute md:-right-20 -right-10 -bottom-8 md:-bottom-23'>
                    <svg className='lg:w-[241px] md:hidden lg:h-[300px] w-[140px] h-[430px] borfer-l-rounded'  viewBox="0 0 241 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M402 201C402 312.009 312.009 402 201 402C89.9908 402 0 312.009 0 201C0 89.9908 89.9908 0 201 0C312.009 0 402 89.9908 402 201ZM117.832 201C117.832 246.932 155.068 284.168 201 284.168C246.932 284.168 284.168 246.932 284.168 201C284.168 155.068 246.932 117.832 201 117.832C155.068 117.832 117.832 155.068 117.832 201Z" fill="#FF5900" fill-opacity="0.07"/>
                    </svg>
                </div>
                <Image src={Frame} alt='' layout='responsive'/>
                </aside>
            </aside>
            <div className="flex lg:justify-between justify-center md:flex-row flex-col items-center mt-5 lg:gap-[38px] gap-[16px]">
                    <aside className="flex gap-[76px] items-center ">
                        <span className=" text-[#344054]">
                            <p className="font-bold text-[24px] ">25+</p>
                            <p className="text-[14px] text-[#344054]">Years of Experience</p>
                        </span>
                        <span className="  text-[#344054]">
                            <p className="font-bold text-[24px]">50+</p>
                            <p className="text-[14px] text-[#344054]">Qualified Tutors</p>
                        </span>
                    </aside>
                    <aside className="lg:w-[40%] flex items-center gap-2 ">
                      <Image src={Frame1} alt='' width={100} height={10} />
                      <p className="text-[14px] text-[#344054]">50+ Students registered</p>
                    </aside>
                </div>
            </article>
        </section>
    )
}
