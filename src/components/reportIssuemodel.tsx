import React, { useState } from 'react';
import { X, Upload, MapPin } from 'lucide-react';
import Button from './Button';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (issueData: any) => void;
}

function LocationMarker({ position, setPosition }: any) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function ReportIssueModal({ isOpen, onClose, onSubmit }: ReportIssueModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    urgency: 'medium',
    location: { lat: 0, lng: 0 },
    photo: null as File | null,
  });
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      location: position,
      createdAt: new Date(),
      status: 'pending',
      type: 'community',
      id: Math.random().toString(36).substr(2, 9),
    };
    onSubmit(finalData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Report Issue</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Issue Title</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-800 shadow focus:border-indigo-500 focus:ring-indigo-500 p-2"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-800 shadow focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Urgency</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring-indigo-500 p-3"
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <div className="mt-1 h-[300px] rounded-md overflow-hidden">
                <MapContainer
                  center={[17.455598622434977, 78.66648576707394]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationMarker position={position} setPosition={setPosition} />
                </MapContainer>
              </div>
              <p className="mt-1 text-sm text-gray-500">Click on the map to set location</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Photo</label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="photo-upload"
                  onChange={handlePhotoChange}
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Upload className="h-8 w-8 mr-2" />
                  Upload Photo
                </label>
              </div>
              {previewUrl && (
                <div className="mt-2">
                  <img src={previewUrl} alt="Preview" className="h-32 w-32 object-cover rounded-md" />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Submit Issue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}