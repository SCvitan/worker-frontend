"use client"
import React, {useState, useEffect} from 'react'
import Card from './Card'

// Define the interface for the profile data
interface Profile {
    userId: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
    gender: string | null;
    age: number | null;
    placeOfBirth: string | null;
    placeOfResidence: string | null;
    nationality: string | null;
    educationLevel: string | null;
    nameOfEducationalFacility: string | null;
    driversLicence: string | null;
    languages: string | null;
    profession: string | null;
  }
  
  const CardGrid: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
  
    useEffect(() => {
      // Fetch the data from your backend
      fetch('http://localhost:8080/auth/home') // Replace with your actual API endpoint
        .then(response => response.json())
        .then(data => setProfiles(data))
        .catch(error => console.error('Error fetching profiles:', error));
    }, []);
  
    return (
      <div className="container mx-auto p-6">
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map(profile => (
            <Card 
              key={profile.userId}
              name={profile.firstName || profile.email.split('@')[0]} // Fallback to email prefix if name is null
              age={profile.age !== null ? profile.age : 'N/A'} // Show 'N/A' if age is null
              profession={profile.profession || 'N/A'} // Show 'N/A' if profession is null
            />
          ))}
        </div>
  
        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="py-2 px-4 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100"
            >
              Previous
            </a>
            <a
              href="#"
              className="py-2 px-4 text-sm font-medium text-gray-500 bg-white border-t border-b border-gray-300 hover:bg-gray-100"
            >
              1
            </a>
            <a
              href="#"
              className="py-2 px-4 text-sm font-medium text-gray-500 bg-white border-t border-b border-gray-300 hover:bg-gray-100"
            >
              2
            </a>
            <a
              href="#"
              className="py-2 px-4 text-sm font-medium text-gray-500 bg-white border-t border-b border-gray-300 hover:bg-gray-100"
            >
              3
            </a>
            <a
              href="#"
              className="py-2 px-4 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100"
            >
              Next
            </a>
          </nav>
        </div>
      </div>
    );
  };

export default CardGrid
