"use client";
import { useEffect, useState } from "react";
import Logo from '@/app/assets/Logo.png'
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button"
import {getCurrentNav} from "@/app/utils/getCurrentNav"
import { usePathname } from 'next/navigation';
import { toggle } from "@/lib/utils";
import SignUpPage from "./authPage/signup/signupPage";
import SignInPage from "./authPage/signin/signinPage";
import { useUser } from "./context/reducer";
import { FaUser, FaUserCircle } from "react-icons/fa";
export default function Header() {
  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [currentNav, setCurrentNav] = useState(0);
  const pathname = usePathname(); 
  const [isClassesDropdownOpen, setIsClassesDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isExamDropDown, setIsExamDropDown] = useState(false);
  const {state} = useUser()
         const [showReg, setShowReg] = useState(false)
         const [showLogin, setShowLogin] = useState(false)
         const showRegPage = () =>{
           toggle(setShowReg, showReg); // then toggle the registration page
           toggleMobileMenu()
         }
         const showLoginPage = () =>{
          toggle(setShowLogin, showLogin); // then toggle the registration page
          toggleMobileMenu()
        }
  
  useEffect(() => {
    const navIndex = getCurrentNav(pathname);
    setCurrentNav(navIndex);
  }, [pathname]); 
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
    <header className=" flex  w-[100%] bg-[#FEF6E6] md:bg-[#FFFFFF]" >
      <nav className=" p-[24px] md:p-0  flex justify-between w-[100%] ">
        {/* Logo */}
        <div className="flex md:hidden items-center">
          <Image src={Logo} alt="" width={182} height={33.36} />
        </div>

        {/* Hamburger Icon for mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-[#000] focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className=" md:flex w-[100%] gap-5 flex-col hidden">
          
          <div className="flex justify-between text-black items-center md:gap-[16px] h-[100px] md:px-[50px] px-[100px] bg-[#FEF6E6]">
          <div className=" flex gap-[15px] md:gap-[8px]  items-center">
            <span className="lg:h-[43px] lg:w-[235.64px] md:w-[180px] "> 
              <Image src={Logo} alt="" layout="responsive"/> </span>
          <p className="text-[14px] ">Education is all we do</p>
        </div>
                <span className="lg:flex md:hidden">
                  <Input
                    type="search"
                    className="border-r-0 border-[1px] lg:w-[300px] md:w-auto h-[41px] border-black"
                    placeholder="Search for class, topics, or anything..."
                  />
                  <Label className="bg-[#344054] w-[35px] text-white ml-[-35px] h-[41px] rounded-r-md border-r-[2px] flex justify-center items-center">
                    <FiSearch />
                  </Label>
                </span>
        
       {state.isLoggedIn && state.firstName!==null ?
                <div className=" py-10 flex gap-[12px] items-center">
                 <p className="flex items-center justify-center w-[50px] h-[50px] rounded-full justify-center">   <FaUserCircle color="orange" size={20}/></p>
                 <p>Hello, {state?.firstName  || ''} {state?.lastName || ""} 
                 </p>
                </div>
       :
       <span className="flex items-center gap-[5px]">
        <Button className="bg-[#FF5900] w-[97px] h-[35px] text-[16px] text-white"  onClick={()=>{showRegPage()}}>
         Register 
          </Button>
        <Button className="border-[1px] text-[16px] bg-transparent w-[97px] h-[35px] text-black border-black " variant='default' onClick={()=>{showLoginPage()}}>
         Log in  
          </Button>

        </span>}
          </div>
          <nav className="px-[100px] md:px-[32px] over-flow-x-hidden py-[16px] bg-[#FFFFFF] flex xl:flex-row xl:gap-[24px] xl:justify-center flex-col gap-[24px] items-between justify-between">      {/* Left Section - Navigation Links */}
      <ul className="flex justify-center md:gap-[32px] xl:gap-[42px]">
        {/* Home */}
        <li
          className={`text-[16px] border-[#FF5900] py-[3px] font-normal hover:text-[#FF5900] hover:border-b-[3px] ${
            currentNav === 0 ? "text-[#FF5900] border-b-[3px]" : "text-black"
          }`}
          onClick={() => setCurrentNav(0)}
        >
          <Link href="/" >Home</Link>
        </li>

        {/* Classes Dropdown */}
        <li
          className={`relative text-[16px] border-[#FF5900] font-normal flex items-center gap-[4px] hover:text-[#FF5900] hover ${
            currentNav === 1 ? "text-[#FF5900] border-b-[3px]" : "text-black"
          }`}
          onMouseEnter={() => setIsClassesDropdownOpen(true)}
          onMouseLeave={() => setIsClassesDropdownOpen(false)}
        >

          <Link href={'#'}>Classes</Link>
          {isClassesDropdownOpen && (

            <div className="absolute -left-5 top-[100%] flex flex-col bg-white shadow-md w-[120px] z-19">
              <Link href="/classes/KS1" className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black"  onClick={() => setCurrentNav(1)}>
                KS1
              </Link>
              <Link href="/classes/KS2" className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black"  onClick={() => setCurrentNav(1)}>
                KS2
              </Link>
              <Link href="/classes/KS3" className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black"  onClick={() => setCurrentNav(1)}>
                KS3
              </Link>
              <Link href="/classes/SSCE%2FIGCE" className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black"  onClick={() => setCurrentNav(1)}>
                SSCE/IGCE
              </Link>
            </div>
          )}
        </li>

        {/* Other Navigation Items */}
        <li
          className={`text-[16px] border-[#FF5900] py-[3px] font-normal hover:text-[#FF5900] hover:border-b-[3px] ${
            currentNav === 2 ? "text-[#FF5900] border-b-[3px]" : "text-black"
          }`}
          onClick={() => setCurrentNav(2)}
        >
          <Link href="/admission_info">Admission Info</Link>
        </li>

        <li
          className={`text-[16px] border-[#FF5900] py-[3px] font-normal hover:text-[#FF5900] hover:border-b-[3px] ${
            currentNav === 3 ? "text-[#FF5900] border-b-[3px]" : "text-black"
          }`}
          onClick={() => setCurrentNav(3)}
        >
          <Link href="/counselling">Counselling</Link>
        </li>

        <li
          className={`text-[16px] border-[#FF5900] py-[3px] font-normal hover:text-[#FF5900] hover:border-b-[3px] ${
            currentNav === 4 ? "text-[#FF5900] border-b-[3px]" : "text-black"
          }`}
          onClick={() => setCurrentNav(4)}
        >
          <Link href="/holiday_coaching">Holiday Coaching</Link>
        </li>
        <li
            className={`relative text-[16px] border-[#FF5900] font-normal flex items-center gap-[4px] hover:text-[#FF5900] hover ${
              currentNav === 6 ? "text-[#FF5900] border-b-[3px]" : "text-black"
            }`}
            onMouseEnter={() => setIsResourcesDropdownOpen(true)}
            onMouseLeave={() => setIsResourcesDropdownOpen(false)}
          >
            Resources
            {isResourcesDropdownOpen && (
              <div className="absolute left-0 top-[100%] flex flex-col bg-white shadow-md  w-[120px]">
                <Link
                  href="/resources/teacher"
                  className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black "
                  onClick={() => setCurrentNav(6)}

                >
                  Teacher
                </Link>
                <Link
                  href="/resources/student"
                  className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black"
                  onClick={() => setCurrentNav(6)}
                >
                  Student
                </Link>
              </div>
            )}
          </li>
       
      </ul>

      {/* Right Section - Resources Dropdown, Sponsor, Search, Book a Tutor */}
      <div className="flex justify-center gap-[10px] xl:gap-[24px] items-center">
        <ul className="flex justify-center gap-[32px]">
          {/* Resources Dropdown */}
          <li
          className={`relative text-[16px] border-[#FF5900] font-normal flex items-center gap-[4px] hover:text-[#FF5900] hover ${
            currentNav === 5 ? "text-[#FF5900] border-b-[3px]" : "text-black"
          }`}
          onMouseEnter={() => setIsExamDropDown(true)}
          onMouseLeave={() => setIsExamDropDown(false)}
        >Exam Preparation
          {isExamDropDown && (
              <div className="absolute left-0 top-[100%] flex flex-col bg-white shadow-md  w-[150px]" >
                <Link
                  href="/exam_preparation"
                  className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black w-full"
                  onClick={() => setCurrentNav(5)}

                >
                  Past Question
                </Link>
                <Link
                  href="/exam_preparation/cbt"
                  className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black"
                  onClick={() => setCurrentNav(5)}
                >
                  CBT Simulator
                </Link>
              </div>
            )}

        </li>
          

          {/* Sponsor a Student */}
          <li
            className={`text-[16px] border-[#FF5900] font-normal hover:text-[#FF5900] hover:border-b-[3px] ${
              currentNav === 7 ? "text-[#FF5900] border-b-[3px]" : "text-black"
            }`}
            onClick={() => setCurrentNav(7)}
          >
            <Link href="/sponsor">Sponsor a Student</Link>
          </li>
        </ul>

        {/* Search Input */}
        <span className="flex lg:hidden">
          <Input
            type="search"
            className="border-r-0 border-[1px] lg:w-[350px] md:w-auto h-[41px] border-black"
            placeholder="Search for class, topics, or anything..."
          />
          <Label className="bg-[#344054] w-[35px] text-white ml-[-35px] h-[41px] rounded-r-md border-r-[2px] flex justify-center items-center">
            <FiSearch />
          </Label>
        </span>

        {/* Book a Tutor Button */}
        <Button className="block text-[#FF5900] text-[16px] bg-[#FFEEE6] hover:text-white">
          <Link href="/bookings">Book a Tutor</Link>
        </Button>
      </div>
    </nav>

          </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
        <div
        id="mobile-menu"
        className="absolute bg-[white] top-[80px] right-0 w-[215px] h-[662px] flex-col p-6 z-10  md:hidden"
      >
        <ul className="flex flex-col   gap-[32px]">
        <li className=" leading-[20.02px] text-[18px] font-normal text-[#130F26]">
          <Link href="/" onClick={()=> toggleMobileMenu()}>Home</Link>
        </li>
        <li className="leading-[20.02px] text-[18px] font-normal text-[#130F26]"
         onMouseEnter={() => setIsClassesDropdownOpen(true)}
         onMouseLeave={() => setIsClassesDropdownOpen(false)}
        >
          <Link href="">Classes</Link>
          {isClassesDropdownOpen && (
            <div onClick={()=> toggleMobileMenu()} className="flex flex-col bg-white shadow-md w-[120px]">
              <Link href="/classes/KS1" className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black">
                KS1
              </Link>
              <Link href="/classes/KS2" className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black">
                KS2
              </Link>
              <Link href="/classes/KS3" className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black">
                KS3
              </Link>
              <Link href="/classes/SSCE%2FIGCE" className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black">
                SSCE/IGCE
              </Link>
            </div>
          )}
        </li>
        <li className="leading-[20.02px] text-[18px] font-normal text-[#130F26]">
          <Link href="/admission_info" onClick={()=> toggleMobileMenu()}>Admission Info</Link>
        </li>
        <li className="leading-[20.02px] text-[18px] font-normal text-[#130F26]">
          <Link href="/counselling" onClick={()=> toggleMobileMenu()}>Counselling</Link>
        </li>
        <li className="leading-[20.02px] text-[18px] font-normal text-[#130F26]">
          <Link href="/holiday_coaching" onClick={()=> toggleMobileMenu()}>Holiday Coaching</Link>
        </li>
        <li
          className={`relative text-[16px] border-[#FF5900] font-normal flex items-center gap-[4px] hover:text-[#FF5900] hover ${
            currentNav === 5 ? "text-[#FF5900] border-b-[3px]" : "text-black"
          }`}
          onMouseEnter={() => setIsExamDropDown(true)}
          onMouseLeave={() => setIsExamDropDown(false)}
        >Exam Preparation
          {isExamDropDown && (
              <div onClick={()=> toggleMobileMenu()} className="absolute left-0 top-[100%] flex flex-col bg-white shadow-md  w-[150px]" >
                <Link
                  href="/exam_preparation"
                  className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black w-full"
                  onClick={() => setCurrentNav(5)}

                >
                  Past Question
                </Link>
                <Link
                  href="/exam_preparation/cbt"
                  className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black"
                  onClick={() => setCurrentNav(5)}
                >
                  CBT Simulator
                </Link>
              </div>
            )}

        </li>
          
        <li className="leading-[20.02px] text-[18px] font-normal text-[#130F26]"
         onMouseEnter={() => setIsResourcesDropdownOpen(true)}
         onMouseLeave={() => setIsResourcesDropdownOpen(false)}
        >
          <Link href="">Resources</Link>
          {isResourcesDropdownOpen && (
              <div onClick={()=> toggleMobileMenu()} className= "flex flex-col bg-white shadow-md  w-[120px] mt-[16px]">
                <Link
                  href="/resources/teacher"
                  className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black "
                >
                  Teacher
                </Link>
                <Link
                  href="/resources/student"
                  className="px-4 py-2 hover:bg-[#FF5900] hover:text-white text-black"
                >
                  Student
                </Link>
              </div>
            )}

        </li>
        
        <li className="leading-[20.02px] text-[18px] font-normal text-[#130F26]">
          <Link href="/sponsor" onClick={()=> toggleMobileMenu()}>Sponsor a student</Link>
        </li>
          <li>
          </li>
        </ul>
         <Button className="block text-[#FF5900] text-[16px] bg-[#FFEEE6] hover:text-white">
          <Link href="/bookings" onClick={()=> toggleMobileMenu()}>Book a Tutor</Link>
        </Button>
       { 
              state.isLoggedIn  && state.firstName!==null ?
                <div className=" py-10 flex gap-[12px] items-center">
                 <p className="flex items-center justify-center w-[50px] h-[50px] rounded-full justify-center">   <FaUserCircle color="orange" size={20}/></p>
                 <p>Hello, {state?.firstName || ''} {state?.lastName || ""} 
                 </p>
                </div>
         :
        <span className="py-10 flex justify-center flex-col items-center gap-[5px]">
          <Button className="bg-[#FF5900] text-[16px] text-white w-full" variant="outline" onClick={()=>{showRegPage()}}>Register</Button>
          <Button className="border-[1px] text-[16px] bg-transparent text-black border-black w-full" variant='default' onClick={()=>{showLoginPage()}}>Log in</Button>
        </span>}
      </div>
        )}
      </nav>
    </header>
    </>
  );
}





