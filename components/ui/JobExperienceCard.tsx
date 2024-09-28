"use client";
import React, { useState } from "react";
import { IoIosTrash } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface JobExperienceCardProps {
  jobId: number; // Add jobId to uniquely identify the job
  companyName: string;
  jobTitle: string;
  yearsWorked: number;
  location: string;
  description: string;
  onDelete: (jobId: number) => void; // Callback for deletion
}

export const JobExperienceCard: React.FC<JobExperienceCardProps> = ({
  jobId,
  companyName,
  jobTitle,
  yearsWorked,
  location,
  description,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch("http://localhost:8080/api/user/deleteJobExp", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete job experience");
      }

      // Call the onDelete callback to update the UI
      onDelete(jobId);

    } catch (error) {
      console.error("Error deleting job experience:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">{companyName}</h2>
          <h3 className="text-lg font-semibold text-gray-600">{jobTitle}</h3>
          <p className="text-sm text-gray-500">{yearsWorked} years</p>
          <p className="text-sm text-gray-500">{location}</p>
          <p className="mt-4 text-gray-700">{description}</p>
        </div>
        <div className="flex justify-end mr-4 mb-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost">
                <IoIosTrash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Job Experience</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove the current job experience entry. Are you sure?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Continue"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
