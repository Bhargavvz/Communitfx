import React from 'react';
import { Camera } from 'lucide-react';

export default function ProfileHeader() {
  return (
    <div className="relative h-48  bg-gradient-to-r from-indigo-500 to-purple-600">
      <img
        src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80"
        alt="Profile Background"
        className="w-full h-full object-cover  opacity-50"
      />
      <div className="absolute -bottom-16 left-8">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white"
          />
          <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
            <Camera className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}