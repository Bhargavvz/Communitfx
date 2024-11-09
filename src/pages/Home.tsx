import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { AlertCircle, Bell, CheckCircle, Clock, Plus } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import IssueMap from '../components/Map';
import type { Issue } from '../types';
import Button from '../components/Button';

const mockIssues: Issue[] = [
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



export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Did you come across an Issue?</h1>
        <p className="mt-2 text-sm text-gray-700">
          Report It!
        </p>
        <div className="flex">
          <div className="mt-4 sm:mt-0 mr-2">
              <Button icon={Plus}>
                <Link to='/issues'>
                  Raise a Community Issue
                </Link>
              </Button>
            </div>
          <div className="mt-4 sm:mt-0">
            <Button icon={Plus}>
              <Link to='/schemes'>
                Raise a Government Scheme Issue
              </Link>
            </Button>
          </div>
        </div>
          
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Issues
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        12
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Resolved Issues
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        48
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >


            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-indigo-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Avg. Resolution Time
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        3.2 days
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Bell className="h-6 w-6 text-purple-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      New Notifications
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        5
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Issues */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Issues
            </h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {mockIssues.map((issue) => (
              <motion.li
                key={issue.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-4 sm:px-6 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-2.5 w-2.5 rounded-full ${
                      issue.status === 'solved' ? 'bg-green-400' : 'bg-yellow-400'
                    }`} />
                    <p className="ml-4 text-sm font-medium text-gray-900">
                      {issue.title}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {issue.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {issue.description}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Map */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Issue Map
            </h3>
          </div>
          <div className="h-96">
            <IssueMap issues={mockIssues} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}