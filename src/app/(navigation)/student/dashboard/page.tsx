"use client";

import StudentGuard from "@/app/components/studentsGuard";
import { useAuthStore } from "@/app/store/user";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import Image from "next/image";

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
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  console.log(user)
  const logout = useAuthStore((s) => s.logout);

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [data, setData] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const [sidebarOpen, setSidebarOpen] = useState(false);
const avater = require("@/app/assets/avatar.jpg")

  /* ================= PROFILE IMAGE STATE ================= */
  const [profileImage, setProfileImage] = useState(user?.profileImage || avater);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  /* ================= FETCH SUBSCRIPTIONS ================= */
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await fetch(
          "https://api.citadel-i.com.ng/api/v1/student/subscriptions",
          { credentials: "include" }
        );
        const result = await res.json();
        setSubscriptions(result.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubscriptions();
  }, []);

  /* ================= FETCH ASSIGNMENTS ================= */
  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://api.citadel-i.com.ng/api/v1/student/assignments?page=${page}&limit=${limit}`,
          { credentials: "include" }
        );
        const result = await res.json();
        if (!res.ok) throw new Error(result.message);
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

  const isExpired = (date: string) => new Date(date) < new Date();

  /* ================= HANDLE IMAGE PREVIEW ================= */
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file)); // preview immediately
  };

  const handleSaveImage = async () => {
    if (!selectedFile) return;

    setSaving(true);

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      const res = await fetch(
        `https://api.citadel-i.com.ng/api/v1/student/update_picture/${user?.id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok && data.url) {
        setProfileImage(data.url); // update profile
        setSelectedFile(null);
        setPreviewImage(null);
        alert("Profile image updated successfully!");
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setSaving(false);
    }
  };
  return (
    <StudentGuard>
      <div className="flex min-h-screen">

        {/* Mobile toggle button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-orange-500 text-white p-2 rounded"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        {/* Overlay (mobile only) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed md:static z-10
            top-0 left-0 h-full md:h-screen
            w-64 bg-[#FFEEE6] shadow-md p-6
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            flex flex-col justify-between
          `}
        >
          <div>
            {/* Close button (mobile) */}
            <button
              className="md:hidden mb-4 text-sm text-red-500"
              onClick={() => setSidebarOpen(false)}
            >
              Close ✕
            </button>

            {/* Profile Section */}
            <div className="flex flex-col items-center mb-6 relative">
             <Image
  src={previewImage || profileImage}
  alt="Profile"
  width={100}       // 20 * 4 (Tailwind w-20)
  height={100}      // 20 * 4 (Tailwind h-20)
  className="w-[80px] h-[80px] rounded-[40px] mb-3 object-cover"
/>
              <label className="absolute top-10 right-10 bg-white p-1 rounded-full cursor-pointer shadow-md hover:bg-gray-200">
                <FiEdit className="text-sm text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={saving}
                />
              </label>

              {/* Save button appears only if new image is selected */}
              {selectedFile && (
                <button
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={handleSaveImage}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              )}

              <h2 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h2>
              <p className="text-gray-600 text-[10px]">{user?.email}</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                className="text-left px-3 py-2 rounded hover:bg-gray-200"
                onClick={() => router.push("/student/edit-profile")}
              >
                Edit Profile
              </button>
              <button className="text-left px-3 py-2 rounded hover:bg-gray-200">
                Change Name
              </button>
              <button className="text-left px-3 py-2 rounded hover:bg-gray-200">
                Change Password
              </button>
            </div>
          </div>

          <button
            onClick={logout}
            className="mt-6 w-full bg-red-800 text-white py-2 rounded cursor-pointer"
          >
            Logout
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 md:ml-0">
          <h3 className="text-2xl font-semibold mb-6">
            Your Subscribed Classes
          </h3>

          {/* Render subscriptions or assignments here */}
          {/* {subscriptions.map((sub, idx) => (
            <div key={idx} className="mb-4 p-4 border rounded shadow-sm">
              <h4 className="font-bold">{sub.name}</h4>
              <p className="text-sm">{sub.type} - {sub.startDate} to {sub.endDate}</p>
            </div>
          ))} */}

          {/* {loading && <p>Loading assignments...</p>}
          {error && <p className="text-red-500">{error}</p>} */}
        </main>
      </div>
    </StudentGuard>
  );
}
