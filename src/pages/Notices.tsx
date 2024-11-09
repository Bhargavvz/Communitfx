import React from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

interface Notice {
  id: string;
  title: string;
  message: string;
  type: 'update' | 'resolution' | 'alert';
  timestamp: Date;
  read: boolean;
}

const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'Street Light Issue Resolved',
    message: 'The broken street light on Main St. has been fixed.',
    type: 'resolution',
    timestamp: new Date(),
    read: false
  },
  {
    id: '2',
    title: 'Update on Pothole Repair',
    message: 'Maintenance crew scheduled for next week.',
    type: 'update',
    timestamp: new Date(Date.now() - 86400000),
    read: true
  },
  {
    id: '3',
    title: 'Urgent: Water Main Break',
    message: 'Emergency repairs needed on Oak Street.',
    type: 'alert',
    timestamp: new Date(Date.now() - 172800000),
    read: false
  }
];

export default function Notices() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notices</h1>
          <p className="mt-2 text-sm text-gray-700">
            Stay updated on your reported issues and community announcements
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <button className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md bg-gray-100 hover:bg-gray-200">
              All Notices
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
              Unread
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
              Updates
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
              Alerts
            </button>
          </div>
        </div>

        {/* Notices List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {mockNotices.map((notice, index) => (
              <motion.li
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 hover:bg-gray-50 ${!notice.read ? 'bg-indigo-50' : ''}`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {notice.type === 'resolution' && (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    )}
                    {notice.type === 'update' && (
                      <Clock className="h-6 w-6 text-blue-400" />
                    )}
                    {notice.type === 'alert' && (
                      <AlertTriangle className="h-6 w-6 text-yellow-400" />
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {notice.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="text-sm text-gray-500">
                          {new Date(notice.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        {notice.message}
                      </p>
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