"use client";
import React from "react";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PreviousEmployment {
  companyName: string;
  jobTitle: string;
  yearsWorked: number;
  location: string;
}

interface TruckerProfile {
  userId: number;
  contractType: string;
  yearsOfExperience: number;
  hazardousMaterialsCertified: boolean;
  previousEmployments: PreviousEmployment[];
  statesOfEmploymentOfInterest: string[];
  willingToRelocate: boolean;
  loadingUnloadingGoods: boolean;
  driversLicences: string[];
  jobInterest: string[];
  accommodationCostsByEmployer: string;
  expectedNETSalary: number;
}

interface UserProfile {
  userId: number;
  role: string;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  age: number | null;
  placeOfResidence: string | null;
  nationality: string | null;
  educationLevel: string | null;
  nameOfEducationalFacility: string | null;
  driversLicence: string | null;
  languages: string | null;
  profession: string | null;
  truckerProfile: TruckerProfile | null;
}

const ProfileForm = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const [name, setName] = useState("Name");
  const [age, setAge] = useState("");
  const [profession, setProfession] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false); // New state for dialog

  const handleSave = async () => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/user/updateCV", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: name,
          age: age ? parseInt(age) : null,
          profession: profession,
        }),
      });

      if (res.ok) {
        // Reload the page to fetch the updated profile
        setDialogOpen(false); // Close the dialog
        window.location.reload();
      } else {
        console.error("Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
    
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data: UserProfile = await res.json();
          setProfile(data);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  if (!profile) return <div>No profile data available.</div>;

  

  return (
    <form className="min-h-screen ml-80 mr-80 bg-white">
      <div className="flex items-center border-b-2 border-gray-300 py-4">
        <div className="flex-1 flex justify-start ml-10">
          <Avatar>
            <AvatarImage src={"https://github.com/shadcn.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 flex flex-col justify-right">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name: {profile.firstName || "N/A"}</Label>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="age">Age: {profile.age || "N/A"}</Label>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="profession">Profession: {profile.profession || "N/A"}</Label>
          </div>
        </div>
        <div className="flex">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="age" className="text-right">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="profession" className="text-right">Profession</Label>
                  <Input
                    id="profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleSave}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Additional sections for education, languages, and trucker profile */}

      {/* Example Education Section */}
      <div className="flex flex-col justify-center border-b-2 border-gray-300 py-4">
        <h3 className="text-lg font-semibold ml-10">Education</h3>
        <div className="ml-10 mt-2">
          <p>Education Level: {profile.educationLevel || "N/A"}</p>
          <p>
            Educational Facility:{" "}
            {profile.nameOfEducationalFacility || "Not specified"}
          </p>
          <p>Driver's License: {profile.driversLicence ? "Yes" : "No"}</p>
        </div>
      </div>

      {/* Languages & Profession Section */}
      <div className="flex flex-col justify-center py-4">
        <h3 className="text-lg font-semibold ml-10">Languages & Profession</h3>
        <div className="ml-10 mt-2">
          <p>Languages: {profile.languages || "Not specified"}</p>
          <p>Profession: {profile.profession || "Not specified"}</p>
        </div>
      </div>

      {/* Trucker Profile Section */}
      {profile.truckerProfile && (
        <div className="flex flex-col justify-center py-4">
          <h3 className="text-lg font-semibold ml-10">Trucker Profile</h3>
          <div className="ml-10 mt-2">
            <p>Contract Type: {profile.truckerProfile.contractType}</p>
            <p>
              Years of Experience: {profile.truckerProfile.yearsOfExperience}
            </p>
            <p>
              Hazardous Materials Certified:{" "}
              {profile.truckerProfile.hazardousMaterialsCertified ? "Yes" : "No"}
            </p>
            <p>
              Drivers Licences:{" "}
              {profile.truckerProfile.driversLicences.join(", ") || "N/A"}
            </p>
            <p>
              States of Employment Interest:{" "}
              {profile.truckerProfile.statesOfEmploymentOfInterest.join(", ")}
            </p>
            <p>
              Willing to Relocate:{" "}
              {profile.truckerProfile.willingToRelocate ? "Yes" : "No"}
            </p>
            <p>
              Loading/Unloading Goods:{" "}
              {profile.truckerProfile.loadingUnloadingGoods ? "Yes" : "No"}
            </p>
            <p>
              Accommodation Costs by Employer:{" "}
              {profile.truckerProfile.accommodationCostsByEmployer}
            </p>
            <p>
              Expected NET Salary:{" "}
              {profile.truckerProfile.expectedNETSalary
                ? `${profile.truckerProfile.expectedNETSalary} EUR`
                : "Not specified"}
            </p>
            {/* Previous Employment Section */}
            <h4 className="text-md font-semibold mt-4">Previous Employment</h4>
          </div>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
