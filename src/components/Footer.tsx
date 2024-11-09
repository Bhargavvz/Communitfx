import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-indigo-600" />
              <span className="text-lg font-bold">Communitifx</span>
            </div>
            <p className="text-gray-500 text-sm">
              Empowering communities to report and resolve local issues together.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/issues" className="text-gray-500 hover:text-indigo-600 text-sm">
                  Community Issues
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="text-gray-500 hover:text-indigo-600 text-sm">
                  Government Schemes
                </Link>
              </li>
              <li>
                <Link to="/notices" className="text-gray-500 hover:text-indigo-600 text-sm">
                  Notices
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Account
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="text-gray-500 hover:text-indigo-600 text-sm">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-500 hover:text-indigo-600 text-sm">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-500 hover:text-indigo-600 text-sm">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@communitifx.com" className="text-gray-500 hover:text-indigo-600 text-sm flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  support@communitifx.com
                </a>
              </li>
              <li>
                <a href="https://github.com/communitifx" className="text-gray-500 hover:text-indigo-600 text-sm flex items-center">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Communitifx. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}