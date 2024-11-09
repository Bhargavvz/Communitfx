import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, AlertCircle, LogIn } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Communitifx</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/maps"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              View map
            </Link>
            
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center"
            >
              <LogIn className="h-4 w-4 mr-1" />
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}