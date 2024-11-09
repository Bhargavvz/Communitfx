import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, MapPin, AlertCircle } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import ReportIssueModal from '../components/reportIssuemodel';
import IssueCategoryModal from '../components/IssueCategoryModal';
import type { Issue } from '../types';

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
    userId: '1',
    category: 'Street Lights'
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
    userId: '2',
    category: 'Road Problems'
  }
];

export default function CommunityIssues() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [issues, setIssues] = useState<Issue[]>(mockIssues);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(false);
    setIsReportModalOpen(true);
  };

  const handleSubmitIssue = (issueData: Issue) => {
    const newIssue = {
      ...issueData,
      category: selectedCategory
    };
    setIssues([newIssue, ...issues]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Community Issues</h1>
            <p className="mt-2 text-sm text-gray-700">
              Report and track issues in your community
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button
              onClick={() => setIsCategoryModalOpen(true)}
              icon={Plus}
            >
              Report Issue
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
              <option>All Categories</option>
              <option>Street Lights</option>
              <option>Road Problems</option>
              <option>Drainage Issues</option>
              <option>Electricity Issues</option>
              <option>Waste Management</option>
              <option>Water Supply</option>
            </select>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Solved</option>
            </select>
          </div>
        </div>

        {/* Issues List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {issues.map((issue, index) => (
              <motion.li
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                      issue.status === 'solved' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      <AlertCircle className={`h-6 w-6 ${
                        issue.status === 'solved' ? 'text-green-600' : 'text-yellow-600'
                      }`} />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center space-x-2">
                        <h2 className="text-lg font-medium text-gray-900">{issue.title}</h2>
                        <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                          {issue.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{issue.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-end">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        issue.status === 'solved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {issue.status}
                      </span>
                      <span className="mt-1 text-sm text-gray-500">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>View on map</span>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <IssueCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSelectCategory={handleCategorySelect}
      />

      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleSubmitIssue}
      />
    </DashboardLayout>
  );
}