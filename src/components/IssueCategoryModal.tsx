import React from 'react';
import { X } from 'lucide-react';
import Button from './Button';

interface IssueCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
}

const issueCategories = [
  { id: 'drainage', name: 'Drainage Issues', icon: '🌊' },
  { id: 'roads', name: 'Road Problems', icon: '🛣️' },
  { id: 'streetlights', name: 'Street Lights', icon: '💡' },
  { id: 'electricity', name: 'Electricity Issues', icon: '⚡' },
  { id: 'waste', name: 'Waste Management', icon: '🗑️' },
  { id: 'water', name: 'Water Supply', icon: '💧' },
  { id: 'parks', name: 'Parks & Recreation', icon: '🌳' },
  { id: 'public-safety', name: 'Public Safety', icon: '🚨' }
];

export default function IssueCategoryModal({ isOpen, onClose, onSelectCategory }: IssueCategoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Select Issue Category</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {issueCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.name)}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center space-y-2"
              >
                <span className="text-3xl">{category.icon}</span>
                <span className="text-sm font-medium text-gray-900">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}