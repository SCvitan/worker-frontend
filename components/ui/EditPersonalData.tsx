import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";
import { LuMoreHorizontal } from "react-icons/lu";


export function EditPersonalData() {
  // State to manage form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [profession, setProfession] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("No token found");
        return;
      }

      // Prepare the request body with the form data
      const requestBody = {
        firstName,
        lastName,
        age: parseInt(age, 10),  // Convert age to a number
        profession,
      };

      // Send the request to the API
      const response = await fetch("http://localhost:8080/api/user/patchCV", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to update personal data");
      }

      setIsDialogOpen(false);

      // Optionally, handle the success response
      const result = await response.json();
      console.log("Update successful:", result);
      
    } catch (error) {
      console.error("Error updating personal data:", error);
    }
    window.location.reload()
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <LuMoreHorizontal />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Personal Data</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input
              id="firstName"
              className="col-span-3"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} // Update state on input change
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              id="lastName"
              className="col-span-3"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} // Update state on input change
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              Age
            </Label>
            <Input
              id="age"
              className="col-span-3"
              value={age}
              onChange={(e) => setAge(e.target.value)} // Update state on input change
              type="number" // Ensure it's a number input
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profession" className="text-right">
              Profession
            </Label>
            <Select onValueChange={setProfession}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="TRUCKING">Driver</SelectItem>
                  <SelectItem value="CLEANING">Cleaning</SelectItem>
                  <SelectItem value="CONSTRUCTION">Constructions</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
