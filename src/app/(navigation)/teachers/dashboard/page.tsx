"use client"

import { useState, useEffect } from "react";

type ClassData = {
  id: number;
  className: string;
  subject: string;
  studentsEnrolled: number;
};

export default function TeacherDashboard() {
  // ✅ Mock teacher info (replace with auth user)
  const [teacher, setTeacher] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Teacher"
  });

  const [data, setData] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 6;

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      setError("");
      try {
        // Replace with real API endpoint
        const res = await fetch(`/api/teacher/classes?page=${page}&limit=${limit}`);
        const result = await res.json();
        
        if (!res.ok) throw new Error(result.message || "Failed to fetch classes");
        
        setData(result.data || []);
        setTotalPages(result.pagination?.totalPages || 1);
      } catch (err: any) {
        setError(err.message || "Error fetching classes");
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, [page]);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    // Example: redirect to login page
    window.location.href = "/login";
  };

  return (
    <div className="p-8">
      {/* Header & Logout */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{teacher.name}</h2>
          <p className="text-gray-600">{teacher.email}</p>
          <p className="text-gray-600">{teacher.role}</p>
        </div>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">Your Classes</h3>

      {loading && <p>Loading classes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && data.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Class</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Students Enrolled</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cls) => (
              <tr key={cls.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{cls.className}</td>
                <td className="border px-4 py-2">{cls.subject}</td>
                <td className="border px-4 py-2 text-center">{cls.studentsEnrolled}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {data.length > 0 && (
        <div className="flex justify-center gap-4 mt-4">
          <button
            disabled={page === 1}
            className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-300" : "bg-orange-500 text-white"}`}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span className="font-semibold">Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            className={`px-4 py-2 rounded ${page === totalPages ? "bg-gray-300" : "bg-orange-500 text-white"}`}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
