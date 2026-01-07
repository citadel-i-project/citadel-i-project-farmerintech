"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DISCIPLINES = ["Science", "Arts", "Commercial"];
const QUALIFICATIONS = ["NCE", "B.Sc", "B.Ed", "M.Sc", "M.Ed", "PhD"];

const SUBJECTS = [
  "Mathematics",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Government",
  "Literature",
  "Geography",
  "Agricultural Science",
];

const CLASS_GROUPS = [
  {
    id: 0,
    name: "KS1",
    years: ["Year1", "Year2"],
  },
  {
    id: 1,
    name: "KS2",
    years: ["Year3", "Year4", "Year5", "Year6"],
  },
  {
    id: 2,
    name: "KS3",
    years: ["Year1", "Year2", "Year3", "Year4", "Year5", "Year6"],
  },
  {
    id: 3,
    name: "SSCE/GSCE",
    years: [],
  },
];

export function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [passport, setPassport] = useState<File | null>(null);

  const [discipline, setDiscipline] = useState("");
  const [qualification, setQualification] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);

  const [classGroup, setClassGroup] = useState<string>("");
  const [classYears, setClassYears] = useState<string[]>([]);

  const selectedGroup = CLASS_GROUPS.find(
    (group) => group.name === classGroup
  );

  const toggleItem = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((i) => i !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    formData.append("discipline", discipline);
    formData.append("qualification", qualification);
    formData.append("subjects", JSON.stringify(subjects));
    formData.append("classGroup", classGroup);
    formData.append("classYears", JSON.stringify(classYears));

    if (passport) formData.append("passport", passport);

    try {
      const res = await fetch(
        `https://api.citadel-i.com.ng/api/v1/user/auth/teacher/signUp`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Registration successful. Await admin verification.");
      e.currentTarget.reset();
      setSubjects([]);
      setClassYears([]);
      setClassGroup("");
      setPassport(null);
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ================= TWO COLUMN LAYOUT ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ================= LEFT ================= */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input name="firstName" required />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input name="lastName" required />
            </div>
          </div>

          <div>
            <Label>Email</Label>
            <Input name="email" type="email" required />
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input name="phoneNumber" required />
          </div>

          <div>
            <Label>Password</Label>
            <Input name="password" type="password" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Gender</Label>
              <Select name="gender">
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Date of Birth</Label>
              <Input name="dateOfBirth" type="date" required />
            </div>
          </div>

          <div>
            <Label>Home Address</Label>
            <Input name="address" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Discipline</Label>
              <Select onValueChange={setDiscipline}>
                <SelectTrigger>
                  <SelectValue placeholder="Select discipline" />
                </SelectTrigger>
                <SelectContent>
                  {DISCIPLINES.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Highest Qualification</Label>
              <Select onValueChange={setQualification}>
                <SelectTrigger>
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>
                <SelectContent>
                  {QUALIFICATIONS.map((q) => (
                    <SelectItem key={q} value={q}>
                      {q}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="space-y-4">
          <div>
            <Label>Subjects You Can Teach</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {SUBJECTS.map((s) => (
                <Button
                  key={s}
                  type="button"
                  size="sm"
                  variant={subjects.includes(s) ? "default" : "outline"}
                  onClick={() => toggleItem(s, setSubjects)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          {/* ================= CLASS LEVEL ================= */}
          <div className="space-y-4 min-w-full ">
            <Label>Class Level</Label>

            <Select
              onValueChange={(value) => {
                setClassGroup(value);
                setClassYears([]);
              }}
            
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class group" />
              </SelectTrigger>
              <SelectContent>
                {CLASS_GROUPS.map((group) => (
                  <SelectItem key={group.id} value={group.name}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedGroup && selectedGroup.years.length > 0 && (
              <div>
                <Label className="text-sm">Select Years</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedGroup.years.map((year) => (
                    <Button
                      key={year}
                      type="button"
                      size="sm"
                      variant={
                        classYears.includes(year) ? "default" : "outline"
                      }
                      onClick={() =>
                        toggleItem(year, setClassYears)
                      }
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {selectedGroup && selectedGroup.years.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No year selection required for {selectedGroup.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Guarantor Name</Label>
              <Input name="guarantorName" required />
            </div>
            <div>
              <Label>Guarantor Contact</Label>
              <Input name="guarantorContact" required />
            </div>
          </div>

          <div>
            <Label>Passport Photograph</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setPassport(e.target.files?.[0] || null)
              }
              required
            />
            {passport && (
              <p className="text-xs text-muted-foreground mt-1">
                {passport.name}
              </p>
            )}
          </div>
        </div>
      </div>

      <Button
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600"
      >
        {loading ? "Submitting..." : "Create Teacher Account"}
      </Button>
    </form>
  );
}
