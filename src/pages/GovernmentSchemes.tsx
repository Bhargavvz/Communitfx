import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, MapPin, FileText } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import type { Issue } from '../types';

const mockSchemes: Issue[] = [
  {
    id: '1',
    title: 'Housing Subsidy Implementation',
    description: 'Issues with processing housing subsidy applications',
    type: 'government',
    status: 'pending',
    urgency: 'high',
    location: { lat: 37.7749, lng: -122.4194 },
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '1'
  },
  {
    id: '2',
    title: 'Education Grant Distribution',
    description: 'Delays in education grant disbursement',
    type: 'government',
    status: 'solved',
    urgency: 'medium',
    location: { lat: 37.7858, lng: -122.4064 },
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '2'
  }
];

export default function GovernmentSchemes() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Government Schemes</h1>
            <p className="mt-2 text-sm text-gray-700">
              Report issues related to government schemes and programs
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button
              onClick={() => setIsModalOpen(true)}
              icon={Plus}
            >
              Report Scheme Issue
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
            </div>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>All Schemes</option>
              <option>Housing</option>
              <option>Education</option>
              <option>Healthcare</option>
              <option>Employment</option>
            </select>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>

        {/* Schemes List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {mockSchemes.map((scheme, index) => (
              <motion.li
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                      scheme.status === 'solved' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      <FileText className={`h-6 w-6 ${
                        scheme.status === 'solved' ? 'text-green-600' : 'text-yellow-600'
                      }`} />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-medium text-gray-900">{scheme.title}</h2>
                      <p className="text-sm text-gray-500">{scheme.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-end">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        scheme.status === 'solved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {scheme.status}
                      </span>
                      <span className="mt-1 text-sm text-gray-500">
                        {new Date(scheme.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>View details</span>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}