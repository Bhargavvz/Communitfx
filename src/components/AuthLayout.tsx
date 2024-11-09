import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Footer from './Footer';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to="/" className="flex justify-center items-center space-x-2">
              <MapPin className="h-12 w-12 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">Communitifx</span>
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {title}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}