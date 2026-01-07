"use client";

import { useState, useEffect } from "react";

type Assignment = {
  id: number;
  teacherName: string;
  subject: string;
  className: string;
  startDate: string;
  endDate: string;
};

type Subscription = {
  name: string;
  startDate: string;
  endDate: string;
  type: "weekly" | "monthly" | "yearly";
};

export default function StudentDashboard() {
  // ✅ Mock student info
  const [student, setStudent] = useState({
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Student",
    profileImage: "/profile.png",
    subscribedClasses: [
      {
        name: "KS1",
        startDate: "2026-01-01T00:00:00Z",
        endDate: "2026-01-31T00:00:00Z",
        type: "monthly",
      },
      {
        name: "KS2",
        startDate: "2026-01-01T00:00:00Z",
        endDate: "2026-01-08T00:00:00Z",
        type: "weekly",
      },
    ] as Subscription[],
  });

  const [data, setData] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 6;

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/student/assignments?page=${page}&limit=${limit}`);
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Failed to fetch assignments");
        setData(result.data || []);
        setTotalPages(result.pagination?.totalPages || 1);
      } catch (err: any) {
        setError(err.message || "Error fetching assignments");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [page]);

  const handleLogout = () => {
    console.log("Logging out...");
    window.location.href = "/login";
  };

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center mb-6">
            <img
              src={student.profileImage}
              alt={student.name}
              className="w-20 h-20 rounded-full mb-3 object-cover"
            />
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p className="text-gray-600 text-sm">{student.email}</p>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200">Change Name</button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200">Change Password</button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-[#FFEEE6]">
        <h3 className="text-2xl font-semibold mb-6">Your Subscribed Classes</h3>

        {/* Subscription Table */}
        {student.subscribedClasses.length > 0 && (
          <table className="w-full border-collapse border border-gray-300 mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Class</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">End Date</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {student.subscribedClasses.map((sub, idx) => {
                const expired = isExpired(sub.endDate);
                return (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{sub.name}</td>
                    <td className="border px-4 py-2">{new Date(sub.startDate).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{new Date(sub.endDate).toLocaleDateString()}</td>
                    <td className="border px-4 py-2 text-center">{sub.type}</td>
                    <td
                      className={`border px-4 py-2 text-center ${
                        expired ? "text-red-500 font-bold" : "text-green-500 font-semibold"
                      }`}
                    >
                      {expired ? "Expired" : "Active"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <h3 className="text-2xl font-semibold mb-4">Your Assignments</h3>

        {loading && <p>Loading assignments...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && data.length > 0 && (
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Class</th>
                <th className="border px-4 py-2">Teacher</th>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">End Date</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((assign) => {
                const expired = isExpired(assign.endDate);
                return (
                  <tr key={assign.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{assign.className}</td>
                    <td className="border px-4 py-2">{assign.teacherName}</td>
                    <td className="border px-4 py-2">{assign.subject}</td>
                    <td className="border px-4 py-2">{new Date(assign.startDate).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{new Date(assign.endDate).toLocaleDateString()}</td>
                    <td
                      className={`border px-4 py-2 text-center ${
                        expired ? "text-red-500 font-bold" : "text-green-500 font-semibold"
                      }`}
                    >
                      {expired ? "Expired" : "Active"}
                    </td>
                  </tr>
                );
              })}
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
            <span className="font-semibold">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              className={`px-4 py-2 rounded ${page === totalPages ? "bg-gray-300" : "bg-orange-500 text-white"}`}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
