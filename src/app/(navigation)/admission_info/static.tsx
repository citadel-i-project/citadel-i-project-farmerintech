import React, { useEffect, useState } from "react";

export const StaticPage : React.FC = () => {
    const [fetching, setFetching] = useState(true);
      const [error, setError] = useState<string>("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [staticContent, setStaticContent] = useState<string>("")

useEffect(() => {
  const fetchStaticContent = async () => {
    try {
      const res = await fetch(
        "https://api.citadel-i.com.ng/api/v1/admin/get_admission_static",
        {
          credentials: "include",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Failed to fetch static content");
      }

      // 👇 hydrate editor
      setStaticContent(result?.data?.staticContent || "");
    } catch (err) {
      console.error(err);
      setError("Failed to load static content");
    } finally {
      setFetching(false);
    }
  };

  fetchStaticContent();
}, []);


return (

    <>
    {!fetching && staticContent && (
  <aside
    className="bg-white px-4 py-2 md:rounded-[4px] md:w-1/3 custom-scrollbar md:overflow-y-scroll md:h-[900px] lg:h-[800px]"
    dangerouslySetInnerHTML={{ __html: staticContent }}
  />
)
}
{!fetching && (!staticContent || staticContent.trim() === "") && (
            <aside className=" bg-white flex flex-col gap-[53px] px-4 py-2 md:rounded-[4px] md:w-1/3 custom-scrollbar md:overflow-y-scroll md:h-[900px] lg:h-[800px]">
            <div className="flex flex-col gap-[24px]">
                <h2 className="font-[700] md:text-[32px] text-[24px] text-[#0F0F0F]">Your Complete Guide to Securing Admission into Your Desired School and Course</h2>
                <p className="font-[400] text-[18px]">Gaining admission into a higher institution in Nigeria requires careful planning and an understanding of the process. Whether you're applying to a university, polytechnic, or college, this guide will help you navigate the admission process smoothly.</p>
            </div>
            <div className="flex gap-[12px] justify-start items-center">
                <span>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.8359 1.68799H2.33594C1.50719 1.68799 0.835938 2.35924 0.835938 3.18799V22.688C0.835938 23.5167 1.50719 24.188 2.33594 24.188H21.8359C22.6647 24.188 23.3359 23.5167 23.3359 22.688V3.18799C23.3359 2.35924 22.6647 1.68799 21.8359 1.68799Z" fill="#549700"/>
                    <path d="M22.9047 2.11924C22.6157 1.84563 22.2339 1.69156 21.8359 1.68799H2.33594C1.50719 1.68799 0.835938 2.35924 0.835938 3.18799V22.688C0.839687 23.0855 0.993438 23.468 1.26719 23.7567L4.41719 20.6067H18.6672C18.9604 20.6062 19.2415 20.4895 19.4489 20.2822C19.6562 20.0748 19.7729 19.7937 19.7734 19.5005V5.25049L22.9047 2.11924Z" fill="#6DC300"/>
                    <path d="M12.9299 19.2942H11.2611C11.1374 19.2923 11.038 19.1929 11.0361 19.0692V9.2442C11.0436 9.12045 10.948 9.01357 10.8242 9.00607C10.7942 9.0042 10.7642 9.00795 10.7361 9.0192L8.1861 9.8817C8.06985 9.92295 7.94048 9.86295 7.89923 9.74482C7.88985 9.7167 7.88423 9.6867 7.8861 9.6567V8.3442C7.8861 8.2467 7.9461 8.1567 8.0361 8.1192L12.8736 6.33795C12.8961 6.32295 12.9224 6.31732 12.9486 6.3192C13.0724 6.32107 13.1717 6.42045 13.1736 6.5442V19.0129C13.1867 19.1554 13.0817 19.2811 12.9392 19.2942H12.9299Z" fill="#FAFAFA"/>
                    <path opacity="0.5" d="M7.53047 3.35644C7.53047 2.92519 7.23047 2.79394 5.50547 2.85019C4.06172 2.90644 3.34922 3.07519 2.91797 3.60019C2.48672 4.12519 2.37422 5.19394 2.35547 6.46894C2.35547 7.36894 2.35547 8.21269 2.82422 8.21269C3.46172 8.21269 3.46172 6.73144 3.98672 5.90644C4.99922 4.27519 7.53047 3.91894 7.53047 3.35644Z" fill="#D3FF9B"/>
                    </svg>
                </span>
                <p className="text-[24px] text-[#0F0F0F] font-[600]">Admission Process</p>
            </div>
            <div className="flex flex-col gap-[24px] px-8">
                    <p className="font-[600] text-[20px] text-[#0F0F0F]">Step-by-Step Guide to Securing Admission</p>
                    <ul className="flex gap-[12px] flex-col list-decimal">
                        <li className="text-[18px] ">
                        Obtain Your JAMB Form – The Joint Admissions and Matriculation Board (JAMB) conducts the Unified Tertiary Matriculation Examination (UTME). Register for the exam and choose your preferred institutions and courses.
                        </li>
                        <li>
                        Prepare for UTME – Study with JAMB-approved syllabuses, past questions, and relevant textbooks.
                        </li>
                        <li>
                        Write and Pass UTME – Ensure you score above the required cut-off mark to increase your chances of admission.
                        </li>
                        <li>
                        Check JAMB Admission Status – Use the JAMB CAPS portal to monitor your admission progress.
                        </li>
                        <li>
                        Participate in Post-UTME Screening – Many institutions conduct Post-UTME exams or screenings to further assess candidates.
                        </li>
                        <li>
                        Meet the O’Level Requirements – Ensure you have the right O’Level subject combinations for your chosen course.
                        </li>
                        <li>
                        Accept Admission and Proceed with Registration – Once admitted, accept the offer on JAMB CAPS and complete your institution’s registration process.
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-[600] text-[20px] text-[#0F0F0F]">Understanding JAMB Requirements for Different Courses</h2>
                    <p className="font-[400] text-[18px] text-[#0F0F0F]">Each course has specific subject requirements in UTME and O’Level results. It’s essential to check these requirements before selecting a course to avoid disqualification.</p>
                </div>
                <div>
                    <span>
                        
                    </span>
                    <div className="bg-[#FFEEE6] p-[16px] rounded-[8px] flex justify-between">
                        <p>Search for your course and see the O’Level requirements, JAMB subject Combination, and Post UTME subject guide</p>
                        <span>
                        
                        </span>
                    </div>
                </div>
                <div className="p-[16px] flex flex-col gap-[24px]">
                    <h4 className="font-[600] text-[24px]">How to Check Available Courses in Various Institutions</h4>
                    <p className="font-[400] text-[18px]">Visit the official websites of your preferred institutions or use the JAMB brochure to see the list of courses offered and their entry requirements.</p>
                </div>
            <section className="bg-[#FEF6E6] p-[16px] rounded-[16px] flex flex-col gap-[24px]">
                <div className="flex  gap-[12px] justify-start items-center">
                <span>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.8359 1.1333H2.33594C1.50719 1.1333 0.835938 1.80455 0.835938 2.6333V22.1333C0.835938 22.9621 1.50719 23.6333 2.33594 23.6333H21.8359C22.6647 23.6333 23.3359 22.9621 23.3359 22.1333V2.6333C23.3359 1.80455 22.6647 1.1333 21.8359 1.1333Z" fill="#549700"/>
                        <path d="M22.9047 1.56455C22.6157 1.29094 22.2339 1.13687 21.8359 1.1333H2.33594C1.50719 1.1333 0.835938 1.80455 0.835938 2.6333V22.1333C0.839687 22.5308 0.993438 22.9133 1.26719 23.2021L4.41719 20.0521H18.6672C18.9604 20.0516 19.2415 19.9348 19.4489 19.7275C19.6562 19.5201 19.7729 19.239 19.7734 18.9458V4.6958L22.9047 1.56455Z" fill="#6DC300"/>
                        <path d="M16.1546 18.7393H8.24211C8.05648 18.7412 7.90648 18.5912 7.90461 18.4056V17.4081C7.90461 17.3237 7.93836 17.2431 7.99836 17.1831L12.1609 12.6456C12.6577 12.1168 13.0965 11.5393 13.4734 10.9206C13.7265 10.5024 13.8615 10.0224 13.8671 9.53306C13.8896 8.99306 13.7096 8.46431 13.3609 8.05181C13.1844 7.86277 12.9689 7.7145 12.7292 7.61735C12.4896 7.5202 12.2316 7.4765 11.9734 7.48931C11.2796 7.48931 10.7546 7.69556 10.3609 8.12681C10.0255 8.522 9.82809 9.01565 9.79836 9.53306C9.78523 9.71119 9.63898 9.84806 9.46086 9.85181H8.01711C7.83148 9.85369 7.67961 9.70556 7.67773 9.51994C7.67773 9.50494 7.67773 9.48994 7.67961 9.47681C7.72461 8.86931 7.90461 8.28056 8.20461 7.75181C8.55898 7.13306 9.08586 6.63056 9.72336 6.30806C10.4265 5.95369 11.2046 5.77369 11.9921 5.78306C13.2296 5.78306 14.2046 6.10181 14.9359 6.72056C15.6671 7.33931 16.0046 8.20181 16.0046 9.30806C15.9859 10.0112 15.7984 10.6974 15.4609 11.3143C14.9773 12.18 14.385 12.9802 13.6984 13.6956L11.1109 16.4706C11.0645 16.5189 11.0333 16.5797 11.021 16.6456C11.0088 16.7114 11.0161 16.7794 11.042 16.8412C11.0679 16.9029 11.1113 16.9558 11.1668 16.9932C11.2224 17.0306 11.2876 17.051 11.3546 17.0518H16.1546C16.3402 17.0499 16.4902 17.1999 16.4921 17.3856V18.4018C16.494 18.5874 16.344 18.7374 16.1584 18.7393H16.1546Z" fill="#FAFAFA"/>
                        <path opacity="0.5" d="M7.53047 2.80175C7.53047 2.3705 7.23047 2.23925 5.50547 2.2955C4.06172 2.35175 3.34922 2.5205 2.91797 3.0455C2.48672 3.5705 2.37422 4.63925 2.35547 5.91425C2.35547 6.81425 2.35547 7.658 2.82422 7.658C3.46172 7.658 3.46172 6.17675 3.98672 5.35175C4.99922 3.7205 7.53047 3.36425 7.53047 2.80175Z" fill="#D3FF9B"/>
                        </svg>
                    </span>
                    <h3 className="text-[24px] text-[#0F0F0F] font-[600]">Post-UTME Requirements</h3>
                </div>
                <div className="p-[16px] flex flex-col gap-[24px]">
                    <h4 className="font-[600] text-[24px]">What is Post-UTME and Why is it Important?</h4>
                    <p className="font-[400] text-[18px]">Post-UTME is an additional screening process conducted by institutions to select the best candidates for admission. It could be in the form of an exam, online screening, or interview.</p>
                </div>
                <div className="p-[16px] flex flex-col gap-[24px]">
                    <h4 className="font-[600] text-[24px]">General Eligibility Criteria for Different Schools</h4>
                    <div>
                    <p className="font-[400] text-[18px]">Each school has its own Post-UTME requirements, but generally, you must:</p>
                    <ul className="list-disc p-[12px] flex flex-col gap-[12px]">
                        <li>Score the institution’s required cut-off mark in UTME.</li>
                        <li>Have the correct O’Level subject combinations.</li>
                        <li>Apply for the Post-UTME screening within the stipulated deadline</li>
                    </ul>
                    </div>
                </div>
                <div className="p-[16px] flex flex-col gap-[24px]">
                    <h4 className="font-[600] text-[20px]">Required Documents & How to Prepare for the Exam</h4>
                    <div>
                    <p className="font-[400] text-[18px]">To be eligible for Post-UTME screening, you may need:</p>
                    <ul className="list-disc p-[12px] flex flex-col gap-[12px]">
                        <li>JAMB result slip</li>
                        <li>O’Level result (WAEC, NECO, NABTEB, or GCE)</li>
                        <li>Birth certificate</li>
                        <li>Local government Certificate</li>
                    </ul>
                    </div>
                </div>
                <div className="p-[16px] flex flex-col gap-[24px]">
                    <h4 className="font-[600] text-[20px]">Preparation Tips:</h4>
                    <ul className="list-disc p-[12px] flex flex-col gap-[12px]">
                        <li>Study past Post-UTME questions for your chosen school.</li>
                        <li>Read widely on general knowledge and current affairs.</li>
                        <li>Be prepared for possible oral interviews.</li>
                    </ul>
                </div>
                <div className="p-[16px] flex flex-col gap-[24px]">
                    <h4 className="font-[600] text-[20px]">Required Documents & How to Prepare for the Exam</h4>
                    <p className="font-[400] text-[18px]">Some institutions calculate their admission score by combining UTME and Post-UTME scores. Cut-off marks vary by institution and course, so always check your school’s website for updates.</p>
                </div>
            </section>
            <section className=" p-[16px] flex flex-col gap-[24px]">
                <div className="flex  gap-[12px] justify-start items-center">
                <span>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.8359 1.13281H2.33594C1.50719 1.13281 0.835938 1.80406 0.835938 2.63281V22.1328C0.835938 22.9616 1.50719 23.6328 2.33594 23.6328H21.8359C22.6647 23.6328 23.3359 22.9616 23.3359 22.1328V2.63281C23.3359 1.80406 22.6647 1.13281 21.8359 1.13281Z" fill="#549700"/>
                        <path d="M22.9047 1.56406C22.6157 1.29045 22.2339 1.13638 21.8359 1.13281H2.33594C1.50719 1.13281 0.835938 1.80406 0.835938 2.63281V22.1328C0.839687 22.5303 0.993438 22.9128 1.26719 23.2016L4.41719 20.0516H18.6672C18.9604 20.0511 19.2415 19.9344 19.4489 19.727C19.6562 19.5196 19.7729 19.2386 19.7734 18.9453V4.69531L22.9047 1.56406Z" fill="#6DC300"/>
                        <path d="M10.5859 11.6516C10.5841 11.4659 10.7341 11.3159 10.9197 11.3141H11.8609C12.4178 11.3441 12.9672 11.1622 13.3984 10.8078C13.7734 10.4703 13.9609 10.0016 13.9609 9.3828C13.9609 8.76405 13.8109 8.31405 13.4922 7.97655C13.1734 7.63905 12.7047 7.4703 12.0484 7.4703C11.5403 7.45343 11.0453 7.62593 10.6609 7.9578C10.3702 8.20574 10.1829 8.5536 10.1359 8.9328C10.1134 9.10343 9.97094 9.23093 9.79844 9.2328H8.37344C8.18782 9.23468 8.03594 9.08655 8.03407 8.90093C8.03407 8.88593 8.03407 8.87093 8.03594 8.8578C8.09032 8.36468 8.25719 7.88843 8.52344 7.4703C8.88025 6.93157 9.38023 6.50302 9.96719 6.2328C10.6103 5.9253 11.3172 5.77155 12.0297 5.7828C13.2859 5.7828 14.2797 6.10155 14.9922 6.73905C15.7047 7.37655 16.0609 8.2578 16.0609 9.3828C16.0553 9.95843 15.8641 10.5172 15.5172 10.9766C15.2959 11.2953 15.0166 11.5691 14.6922 11.7828C14.6547 11.8096 14.6229 11.8436 14.5986 11.8828C14.5743 11.922 14.5581 11.9656 14.5507 12.0111C14.5434 12.0566 14.5452 12.1031 14.556 12.1479C14.5667 12.1927 14.5863 12.235 14.6134 12.2722C14.6397 12.3097 14.6734 12.3397 14.7109 12.3641C15.1028 12.5741 15.4422 12.8684 15.7047 13.2266C16.0741 13.7609 16.2634 14.3966 16.2484 15.0453C16.2484 16.1703 15.8547 17.0703 15.0859 17.7453C14.3172 18.4203 13.2859 18.7578 12.0297 18.7578C10.8109 18.7578 9.81719 18.4391 9.04844 17.7828C8.71659 17.5119 8.44385 17.1757 8.24712 16.7952C8.05039 16.4146 7.93384 15.9977 7.90469 15.5703C7.88782 15.3809 8.02844 15.2141 8.21782 15.1972C8.22532 15.1972 8.23282 15.1953 8.24219 15.1953H9.66719C9.83969 15.1972 9.98219 15.3247 10.0047 15.4953C10.0575 15.8981 10.2499 16.2697 10.5484 16.5453C10.9647 16.9034 11.5009 17.0909 12.0484 17.0703C12.7047 17.0703 13.2109 16.9016 13.5859 16.5453C13.9609 16.1891 14.1484 15.7016 14.1484 15.0453C14.1484 14.3891 13.9609 13.8641 13.5672 13.5078C13.1734 13.1516 12.5922 12.9641 11.8234 12.9641H10.9234C10.7378 12.9659 10.5878 12.8159 10.5859 12.6303V11.6516Z" fill="#FAFAFA"/>
                        <path opacity="0.5" d="M7.53047 2.80175C7.53047 2.3705 7.23047 2.23925 5.50547 2.2955C4.06172 2.35175 3.34922 2.5205 2.91797 3.0455C2.48672 3.5705 2.37422 4.63925 2.35547 5.91425C2.35547 6.81425 2.35547 7.658 2.82422 7.658C3.46172 7.658 3.46172 6.17675 3.98672 5.35175C4.99922 3.7205 7.53047 3.36425 7.53047 2.80175Z" fill="#D3FF9B"/>
                        </svg>

                    </span>
                    <h3 className="text-[24px] text-[#0F0F0F] font-[600]">O’Level Requirements</h3>
                </div>
                <div className="p-[16px] flex flex-col gap-[24px]">
                    <h4 className="font-[600] text-[24px]">Minimum Subject Combinations for Different Courses</h4>
                    <ul className="list-disc p-[12px] flex flex-col gap-[12px]">
                        <li>Sciences: Mathematics, English, Physics, Chemistry, Biology</li>
                        <li>Arts & Humanities: English, Literature, Government, CRS/IRS, History</li>
                        <li>Commercial & Social Sciences: Mathematics, English, Economics, Accounting, Commerce</li>
                    </ul>
                </div>
                <div className="p-[16px] flex flex-col gap-[24px]">
                    <h4 className="font-[600] text-[20px]">WAEC/NECO/NABTEB Grading System and Required Credits</h4>
                    <p className="font-[400] text-[18px]">Most institutions require at least five (5) credit passes, including English and Mathematics, in not more than two sittings. Some competitive courses like Medicine, Law, and Engineering may require a single sitting.</p>
                </div>
                <div className="p-[16px] flex flex-col gap-[24px]">
                    <h4 className="font-[600] text-[20px]">How to Combine O’Level Results for Admission</h4>
                    <p className="font-[400] text-[18px]">If you didn’t pass all required subjects in one sitting, you may be allowed to combine two results (e.g., WAEC & NECO). However, some universities do not accept combined results, so check your school’s policy before proceeding.</p>
                </div>
                <div className="p-[16px] flex flex-col gap-[24px]">
                    <h4 className="font-[600] text-[24px] bg-[#F6C354] px-[16px] py-[8px] rounded-[4px]"> 
                        <span></span>
                        Need Help? Contact an Admission Counselor!</h4>
                    <p className="font-[400] text-[18px]">If you’re unsure about any stage of the admission process, speaking with an expert can help. Reach out to an admission counselor for personalized guidance and support.</p>
                </div>
            </section>
        </aside>
)}
    </>
)
}