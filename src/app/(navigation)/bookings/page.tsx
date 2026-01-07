import Image from "next/image";
import { FaGraduationCap } from "react-icons/fa";
import Bookings1 from "@/app/assets/bookings1.png"
import Bookings2 from "@/app/assets/bookings2.jpg"

export default function page (){
    return(
        <>
       <section className=" bg-[#FFFBF9] lg:px-[100px] px-[32px] py-[64px]">
          <aside className="bg-[#FFEEE6] lg:px-[100px] py-[64px] px-[32px] gap-[24px] rounded-[40px] flex flex-col items-center">
            <h2 className="max-w-[912px]  font-[600] lg:text-[32px] md:text-[24px] text-[16px] text-center">
                Meet our Seasoned tutors with over 10 years of Experience
            </h2>
            <p className="max-w-[912px]  text-center ">
                Get one-on-one support from experienced and trusted tutors. Whether you're preparing for an exam, need help with assignments, or want to improve in specific subjects — we’ve got you covered.
            </p>
            <button className="bg-[#FF5900] text-white px-[24px] py-[12px] gap-[8px] rounded-[8px]">Book a Tutor Now</button>
            <div className="flex items-center gap-[80px] md:gap-[50px] flex-col md:flex-row">
                <div className="lg:w-[287px] md:w-[250px] ">
                    <div className="bg-white bg-white rounded-[8px] ">
                    <Image src={Bookings1} alt="" className="h-[292px] "/>
                    </div>
                    <p className="mt-5 font-[600]">Mr. Adeniji</p>
                    <span>A veterian teacher with over 2 decades of experience in the filed of education </span>
                </div>
                    <div className="lg:w-[287px] md:w-[250px]   ">
                    <div className="h-[292px] bg-white rounded-[8px]">
                    <Image src={Bookings1} alt="" className="h-[292px] "/>
                    </div>
                    <p className="mt-5 font-[600]">Mr. Adeniji</p>
                    <span>A veterian teacher with over 2 decades of experience in the filed of education </span>
                </div>
                <div className="lg:w-[287px] md:w-[250px]   ">
                    <div className="h-[292px] bg-white rounded-[8px]">
                    <Image src={Bookings1} alt="" className="h-[292px] "/>
                    </div>
                    <p className="mt-5 font-[600]">Mr. Adeniji</p>
                    <span>A veterian teacher with over 2 decades of experience in the filed of education </span>
                </div>

            </div>
          </aside>
          <aside className="mt-10">
            <h2 className="font-[600] text-center mb-5">Why Book a Tutor With Us?</h2>
            <div className="flex flex-col md:flex-row gap-[80px] items-center justify-center ">
                <div className="flex gap-[24px] flex-col">
                <div className="flex gap-[24px]">
                    <div className="bg-white border-1 border-[#F1A500] rounded-[6px] h-[160px] md:w-[245px] p-[16px] flex flex-col justify-between">
                        <span className="w-[32px] h-[32px] rounded-full bg-[#FBE3B0] p-[8px] gap-[10px]">
                            <FaGraduationCap/>
                        </span>
                        <span>Qualified Tutors</span>
                    </div>
                    <div className="bg-white border-1 border-[#F1A500] rounded-[6px] h-[160px] md:w-[245px] p-[16px] flex flex-col justify-between">
                        <span className="w-[32px] h-[32px] rounded-full bg-[#FBE3B0] p-[8px] gap-[10px]">
                            <FaGraduationCap/>
                        </span>
                        <span>Flexible Scheduling</span>
                    </div>
                </div>
                <div className="flex gap-[24px]">
                    <div className="bg-white border-1 border-[#F1A500] rounded-[6px] h-[160px] md:w-[245px] p-[16px] flex flex-col justify-between">
                        <span className="w-[32px] h-[32px] rounded-full bg-[#FBE3B0] p-[8px] gap-[10px]">
                            <FaGraduationCap/>
                        </span>
                        <span>Fully Online</span>
                    </div>
                    <div className="bg-white border-1 border-[#F1A500] rounded-[6px] h-[160px] md:w-[245px] p-[16px] flex flex-col justify-between">
                        <span className="w-[32px] h-[32px] rounded-full bg-[#FBE3B0] p-[8px] gap-[10px]">
                            <FaGraduationCap/>
                        </span>
                        <span>Customized Learning Plans</span>
                    </div>
                </div>

                </div>
                <div className=" ">
                    <Image src={Bookings2} alt='' className="w-full  md:w-[360px] h-[360px] rounded-[24px]"/>
                </div>
            </div>
          </aside>
        </section>
        <section className="bg-[#F9D68A] flex md:flex-row flex-col gap-[32px] justify-center px-[32px] py-[24px]">
            <aside className="w-full md:w-[519px] bg-white text-black p-[24px] rounded-[8px] gap-[31px]">
                <h2 className="font-[600] mb-5">Tutor Booking</h2>
                <form className="flex gap-[24px] flex-col ">
                <div>
                    <label>First and last Name</label>
                    <input type="text" className="md:w-[417px] w-full h-[43px] p-[12px] rounded-[8px] border-1"/>
                </div>
                 <div>
                    <label>Email address</label>
                    <input type="text" className="md:w-[417px] w-full h-[43px] p-[12px] rounded-[8px] border-1"/>
                </div> 
                <div>
                    <label>Phone Number</label>
                    <input type="text" className="md:w-[417px] w-full h-[43px] p-[12px] rounded-[8px] border-1"/>
                </div>
                 <div>
                    <label>Class Booking For</label>
                    <input type="text" className="md:w-[417px] w-full h-[43px] p-[12px] rounded-[8px] border-1"/>
                </div>
                <div>
                    <p>Note: You need to make a payment of #15 000  for your bookings to be successful </p>
                </div>
                <button className="bg-[#FF5900] text-white px-[24px] py-[12px] gap-[8px] rounded-[8px]">Make payment</button>

                </form>
            </aside>
            <aside className="max-w-[477px]">
              <h2 className="font-[600] mb-5">Terms and Conditions/Process</h2>
              <ul>
                <li>After making your payment. You’ll received a confirmation email immediately</li>
              </ul>
            </aside>
          </section>

        </>
    )
}
