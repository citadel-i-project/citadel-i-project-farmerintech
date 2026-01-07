"use client"

import { ResourcesImages } from '@/app/components/resourcesImage';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { FaChevronRight } from 'react-icons/fa';

export default function ResourcesPage() {
  
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Pagination states
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 6; // items per page

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError("");
      setData([]);

      try {
        const res = await fetch(
          `https://citadel-i-project.onrender.com/api/v1/resources?page=${page}&limit=${limit}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ resourceFor: "Teachers" }),
          }
        );

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Failed to fetch resources");
        }

        setData(result.data || []);
        setTotalPages(result.pagination?.totalPages || 1);

        console.log("Fetched:", result);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error connecting to server");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [page]); // 🔹 refetch when page changes

  type resourceItem = {
    source: string;
    description: string;
    link: string;
    filePath: any;
  };

  return (
    <div className="md:px-[100px] md:py-[16px] pb-[64px] pt-[16px] px-[16px] flex flex-col gap-[24px]">
      
      {/* Header */}
      <div className="flex gap-[8px] items-center">
        <span className="text-[#8C3100] text-[16px] font-[500]">Resources</span>
        <span>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L7 7L1 1" stroke="#1B1B1B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="text-[#FF5900] text-[16px] font-[500]">Teachers</span>
      </div>
      <h3 className="text-[24px] font-[600]">A curated list of all necessary resources to aid your teaching</h3>

      {/* Loading & Error */}
      {loading && (
        <p className="mt-[50px] md:mt-[0px] text-center w-full text-[18px]">Loading resources...</p>
      )}
      {!loading && error && (
        <p className="mt-[50px] md:mt-[0px] w-full text-center text-[18px] font-[500] text-black">
          {error}
        </p>
      )}

      {/* Resources Grid */}
      <div className="md:gap-[48px] gap-[40px] grid md:grid-cols-2 xl:grid-cols-3 gap-x-6 py-[32px]">
        {!loading && data?.length > 0 && data.map((resource: resourceItem, index: number) => (
          <div key={index} className="bg-white shadow px-3 rounded-xl">
            <div className="flex items-center justify-center w-full h-[200px] mb-2">
              {ResourcesImages.map(image => image.name === resource.source ?
                <Image key={image.name} src={image.image} alt={image.name} className='rounded-xl'/> : null
              )}
            </div>
            <div className="flex gap-[16px] flex-col">
              <p className="font-[500] text-[16px]">{resource.source}</p>
              <p className="font-[400] text-[14px]">{resource.description}</p>
              <a className="text-white flex items-center justify-center mb-4 rounded-md gap-5 py-2 bg-[#FF5900] font-[400] text-[14px] cursor-pointer" href={resource.link} target="_blank" rel="noopener noreferrer">
                <span>Explore Resource</span>
                <FaChevronRight/>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {!loading && data?.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-orange-500 text-white"}`}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">Page {page} of {totalPages}</span>
          <button
            className={`px-4 py-2 rounded ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-orange-500 text-white"}`}
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}
