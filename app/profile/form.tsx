"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LuMoreHorizontal } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import { JobExperienceCard } from "@/components/ui/JobExperienceCard";
import { AddJobExperience } from "@/components/ui/AddJobExperience";
import { EditPersonalData } from "@/components/ui/EditPersonalData";

// Define interfaces for types
interface PreviousEmployment {
  id: number;
  companyName: string;
  jobTitle: string;
  yearsWorked: number;
  location: string;
  shortDescription: string;
}

interface UserProfile {
  userId: number;
  firstName: string | null;
  lastName: string | null;
  previousEmployments: PreviousEmployment[];
  age: number;
  profession: string;
}

const ProfileForm = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const router = useRouter();
  const [jobExperiences, setJobExperiences] = useState<PreviousEmployment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAddJobExperience = (newJob: PreviousEmployment) => {
    setJobExperiences((prevExperiences) => [...prevExperiences, newJob]);
  };

  useEffect(() => {
    const fetchJobExperiences = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          setIsAuthenticated(false);
          router.push("/login");
          return;
        } else {
          setIsAuthenticated(true);
        }
        setIsLoading(false);

        const response = await fetch("http://localhost:8080/api/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch job experiences");
        }

        const data: UserProfile = await response.json();
        setProfile(data);

        if (data.previousEmployments) {
          setJobExperiences(data.previousEmployments);
        } else {
          setJobExperiences([]);
        }
      } catch (error) {
        console.error("Error fetching job experiences!", error);
      }
    };

    fetchJobExperiences();
  }, []);

  const handleDeleteJobExperience = (jobId: number) => {
    setJobExperiences((prevExperiences) =>
      prevExperiences.filter((job) => job.id !== jobId)
    );
  };

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen w-screen bg-slate-100 flex items-center justify-center">
      <div className="w-[1000px] h-screen">
        <div className="flex">
          <div className="w-1/3 p-4 bg-white shadow-md">
            <div className="flex relative">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="ml-4 flex flex-col justify-center h-full">
                <h1>{profile?.firstName}</h1>
                <h1 className="mb-2">{profile?.lastName}</h1>
                <h2 className="mt-2">{profile?.age}</h2>
                <h2 className="mt-2">{profile?.profession}</h2>
              </div>
              <div className="absolute bottom-0 right-0">
                <EditPersonalData />
              </div>
            </div>
            <Separator className="mt-8" />
            <div className="mt-8 relative">
              <h1 className="text-3xl">Contact</h1>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>email</div>
                <div>phone number</div>
                <div>address</div>
                <div>linkedin profile</div>
              </div>
              <div className="flex justify-end">
                <Button variant="ghost">
                  <LuMoreHorizontal />
                </Button>
              </div>
            </div>
            <Separator className="mt-8" />
            <div className="mt-8 relative">
              <h1 className="mb-6 text-3xl">Education</h1>
              <div>school</div>
              <div>school</div>
              <div className="absolute bottom-0 right-0">
                <Button variant="ghost">
                  <LuMoreHorizontal />
                </Button>
              </div>
            </div>
          </div>
          <div className="w-2/3 p-4 bg-white shadow-md relative">
            <div>
              <h1 className="mb-6 text-3xl">Work Experience</h1>
              {jobExperiences.length > 0 ? (
                jobExperiences.map((job, index) => (
                  <JobExperienceCard
                    key={index}
                    jobId={job.id}
                    companyName={job.companyName}
                    jobTitle={job.jobTitle}
                    yearsWorked={job.yearsWorked}
                    location={job.location}
                    description={job.shortDescription || "No description available"}
                    onDelete={handleDeleteJobExperience}
                  />
                ))
              ) : (
                <p>No job experiences available</p>
              )}
              <div className="absolute bottom-0 right-0 mr-4 mb-4">
                <AddJobExperience />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-4 mt-4 bg-white shadow-md">
          <div>Another full-width container</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
