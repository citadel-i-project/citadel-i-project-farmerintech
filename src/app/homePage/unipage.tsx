import React from 'react'
import Books from '@/app/assets/books.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
export const Schools= [
  {
    name:'UNILAG',
    bgColor1:'bg-[#A6A8AC]',
    bgColor2:'bg-[#3E414A] '
  },
  {
    name:'LASU',
    bgColor1:'bg-[#A6A8AC]',
    bgColor2:'bg-[#3E414A] '
  },
  {
    name:'UNILORIN',
    bgColor1:'bg-[#A6A8AC]',
    bgColor2:'bg-[#3E414A] '
  },
  {
    name:'ABU',
    bgColor1:'bg-[#A6A8AC]',
    bgColor2:'bg-[#3E414A] '
  },
  {
    name:'UI',
    bgColor1:'bg-[#A6A8AC]',
    bgColor2:'bg-[#3E414A] '
  },
  {
    name:'FUTA',
    bgColor1:'bg-[#FFB38A]',
    bgColor2:'bg-[#FF5900]'
  },
  {
    name:'BUK ',
    bgColor1:'bg-[#FFB38A]',
    bgColor2:'bg-[#FF5900]'
  },
  {
    name:'EKSU ',
    bgColor1:'bg-[#FFB38A]',
    bgColor2:'bg-[#FF5900]'
  },
  {
    name:'TASUED',
    bgColor1:'bg-[#FFB38A]',
    bgColor2:'bg-[#FF5900]'
  },
  {
    name:'LASUED',
    bgColor1:'bg-[#FFB38A]',
    bgColor2:'bg-[#FF5900]'
  },
  {
    name:'ABUAD ',
    bgColor1:'bg-[#A6A8AC] ',
    bgColor2:'bg-[#3E414A] '
  },
  {
    name:'KP',
    bgColor1:'bg-[#A6A8AC] ',
    bgColor2:'bg-[#3E414A] '
  },
  {
    name:'NOUN',
    bgColor1:'bg-[#A6A8AC] ',
    bgColor2:'bg-[#3E414A] '
  },
  {
    name:'UDUS',
    bgColor1:'bg-[#A6A8AC]',
    bgColor2:'bg-[#3E414A] '
  },
  {
    name:'EKSU',
    bgColor1:'bg-[#A6A8AC] ',
    bgColor2:'bg-[#3E414A] '
  },
]

export default function unipage() {

  return (
    <>  
<article className=" lg:gap-[56px] md:gap-[16px] bg-[#F6F6F6] flex px-[32px] lg:py-[32px] lg:px-[100px] py-[16px] flex flex-col md:flex-row">

<div className="lg:w-[431px] flex w-full md:h-[523.9px]">
<Image src={Books} alt='' layout='responsive'/>
</div>
 <div className="md:w-[666px] w-[100%] flex flex-col gap-[56px] lg:h-[556px]">
  <span className="flex flex-col gap-[16px]">  
<h2 className="md:text-[32px] font-semibold md:leading-[38.73px]">University Admission Information</h2>
<p className="text-[18px] md:leading-[21.87px]  text-[#1D2939]">
  Navigating University admissions can be challenging but we are here to make it easier for you.Get access to accurate,
  up-to-date information on university entry requirements, application processes, and essential exams like JAMB.
</p>
</span>

<div className="grid grid-cols-5 gap-[20px]">
  {
    Schools.map((school)=>(
        <div className={`rounded-none text-[12px]  lg:text-[16px] p-[3px] lg:p-[10px] text-white ${school.bgColor1}`}>
             <Link href='/admission_info' className={`flex   items-center justify-center lg:text-[12px] xl:text-[20px] text-[12px]  lg:px-[4px] ${school.bgColor2}`}>
                   {school.name}
             </Link>
        </div>
    ))
  }
</div>

<Button variant='ghost' className=' md:w-[301px] w- px-[16px] px-[24px] md:py-[12px] py-[8px] border-[1px] border-black hover:bg-black hover:text-white
 font-semibold text-[18px]' >Check out all school info
</Button>


 </div>


</article>
</>
  )
}
