"use client";

import TeacherGuard from "@/app/components/teachersGuard";
import { useAuthStore } from "@/app/store/user";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

type Student = {
  id: number;
  name: string;
  email: string;
  className: string;
};

type BankDetails = {
  bankName: string;
  accountName: string;
  accountNumber: string;
};

export default function TeacherDashboard() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const email = user?.email;

  const [teacher, setTeacher] = useState<any>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Bank form
  const [bankForm, setBankForm] = useState<BankDetails>({
    bankName: "",
    accountName: "",
    accountNumber: "",
  });

  // Bio
  const [bio, setBio] = useState("");

  /* ================= FETCH TEACHER ================= */
  useEffect(() => {
    if (!email) return;

    const fetchTeacher = async () => {
      try {
        const res = await fetch(
          `https://api.citadel-i.com.ng/api/v1/teacher/get_teacher/${email}`,
          { credentials: "include" }
        );

        const data = await res.json();
        setTeacher(data);
        console.log(data)
        // ✅ Students fix
        setStudents(data?.students || []);

        // ✅ Prefill bank details
        if (data?.bankDetails) {
          setBankForm({
            bankName: data.bankDetails.bankName || "",
            accountName: data.bankDetails.accountName || "",
            accountNumber: data.bankDetails.accountNumber || "",
          });
        }

        // ✅ Prefill bio
        if (data?.bio) {
          setBio(data.bio);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeacher();
  }, [email]);

  /* ================= SAVE BANK DETAILS ================= */
  const saveBankDetails = async () => {
    try {
      await fetch(
        `https://api.citadel-i.com.ng/api/v1/teacher/edit_teacher/${email}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bankDetails: bankForm }),
        }
      );
      alert("Bank details updated successfully");
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= SAVE BIO ================= */
  const saveBio = async () => {
    try {
      await fetch(
        `https://api.citadel-i.com.ng/api/v1/teacher/edit_teacher/${email}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bio }),
        }
      );
      alert("Bio updated successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/teachers/login");
  };

  if (!teacher) return <p className="p-6">Loading dashboard...</p>;

  return (
    <TeacherGuard>
      <div className="min-h-screen bg-gray-100 flex">
        {/* ================= SIDEBAR ================= */}
        <aside
          className={`bg-[#FFEEE6] fixed z-30 inset-y-0 left-0 w-64 shadow-lg transform transition-transform duration-300 md:relative md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 md:hidden">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <FaTimes size={20} />
            </button>
          </div>

          <div className="p-4 space-y-6">
            {/* Profile */}
            <div className="text-center">
              <Image
                src={teacher?.passportPhoto || "/avatar.png"}
                alt="Teacher"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full mx-auto border object-cover"
              />
              <h2 className="mt-2 font-semibold text-lg">
                {teacher.firstName} {teacher.lastName}
              </h2>
              <p className="text-[10px] text-gray-500">{teacher.email}</p>
            </div>

            {/* ================= BANK DETAILS ================= */}
            <div>
              <h3 className="font-semibold mb-2">Bank Details</h3>

              <div className="space-y-2">
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Bank name"
                  value={bankForm.bankName}
                  onChange={(e) =>
                    setBankForm({ ...bankForm, bankName: e.target.value })
                  }
                />
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Account name"
                  value={bankForm.accountName}
                  onChange={(e) =>
                    setBankForm({ ...bankForm, accountName: e.target.value })
                  }
                />
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Account number"
                  value={bankForm.accountNumber}
                  onChange={(e) =>
                    setBankForm({ ...bankForm, accountNumber: e.target.value })
                  }
                />
                <button
                  onClick={saveBankDetails}
                  className="w-full bg-orange-500 text-white py-2 rounded text-sm"
                >
                  Save Bank Details
                </button>
              </div>
            </div>

            {/* ================= BIO ================= */}
            <div>
              <label className="font-semibold text-sm">Bio</label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
              />
              <button
                onClick={saveBio}
                className="mt-2 w-full bg-orange-500 text-white py-2 rounded text-sm"
              >
                Save Bio
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-800 text-white py-2 rounded"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="flex-1 p-4">
          <div className="flex justify-between items-center md:hidden mb-4">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <button
              className="p-2 bg-white rounded shadow"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars size={20} />
            </button>
          </div>

          <h3 className="text-xl font-semibold mb-4">
            Students in Your Classes
          </h3>

          <div className="overflow-x-auto bg-white rounded-xl shadow p-2">
            <table className="w-full border text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-3 py-2 text-left">Name</th>
                  <th className="border px-3 py-2 text-left">Email</th>
                  <th className="border px-3 py-2 text-left">Class</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{student.name}</td>
                    <td className="border px-3 py-2">{student.email}</td>
                    <td className="border px-3 py-2">{student.className}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </TeacherGuard>
  );
}
