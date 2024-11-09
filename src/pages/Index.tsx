import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Users, Shield, ArrowRight, Github, Mail } from 'lucide-react';
import IssueMap from '../components/Map';
import Navbar from '../components/Navbar';


const mockIssues = [
  {
    id: '1',
    title: 'Broken Street Light',
    description: 'Street light not working on Main St.',
    type: 'community',
    status: 'pending',
    urgency: 'medium',
    location: { lat: 37.7749, lng: -122.4194 },
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '1'
  },
  {
    id: '2',
    title: 'Pothole',
    description: 'Large pothole causing traffic issues',
    type: 'community',
    status: 'solved',
    urgency: 'high',
    location: { lat: 37.7858, lng: -122.4064 },
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '2'
  }
];

const features = [
  {
    icon: <MapPin className="h-6 w-6 text-indigo-600" />,
    title: 'Location-Based Issues',
    description: 'Report and track community issues with precise location mapping'
  },
  {
    icon: <Users className="h-6 w-6 text-indigo-600" />,
    title: 'Community Driven',
    description: 'Join forces with your neighbors to improve your community'
  },
  {
    icon: <Shield className="h-6 w-6 text-indigo-600" />,
    title: 'Quick Resolution',
    description: 'Direct connection with local authorities for faster problem-solving'
  }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16"> {/* Navbar offset */}
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Empower Your Community</span>
                    <span className="block text-indigo-600">Report & Resolve Issues</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Join Communitifx to report local issues, track their resolution, and make your community a better place. Together, we can create positive change.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link
                        to="/login"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A better way to improve your community
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-50 text-indigo-600">
                        {feature.icon}
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="h-[400px] w-full">
          <IssueMap issues={mockIssues} />
        </div>

        {/* backend -> mockissues notices pass to issue map */}

        {/* Footer */}
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
      </div>
    </div>
  );
}