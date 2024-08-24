"use client"
import React from 'react'

import { FaUser, FaBriefcase, FaBirthdayCake } from 'react-icons/fa';

interface CardProps {
  name: string;
  age: string | number;
  profession: string;
}

const Card: React.FC<CardProps> = ({ name, age, profession }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <FaUser className="text-blue-500 w-10 h-10" />
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
        </div>
        <div className="text-gray-700 mb-4">
          <div className="flex items-center mb-2">
            <FaBirthdayCake className="text-pink-500 w-5 h-5 mr-2" />
            <span>Age: {age}</span>
          </div>
          <div className="flex items-center">
            <FaBriefcase className="text-green-500 w-5 h-5 mr-2" />
            <span>Profession: {profession}</span>
          </div>
        </div>
        <div className="mt-6">
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            See Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card
