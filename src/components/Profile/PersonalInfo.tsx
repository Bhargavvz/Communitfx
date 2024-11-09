import React from 'react';
import { User, AtSign, Phone, MapPin, Home, Users } from 'lucide-react';
import EditProfileModal, { UserInfo } from './EditProfileModel';

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
      <div className="text-gray-500">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export default function PersonalInfo() {
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    fullName: "Alexander Mitchell",
    nickname: "Alex",
    phone: "+1 (555) 123-4567",
    country: "United States",
    gender: "Male",
    address: "123 Tech Street, San Francisco, CA 94105"
  });

  const handleSave = (updatedInfo: UserInfo) => {
    setUserInfo(updatedInfo);
    // Here you would typically make an API call to update the user info
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6 mt-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{userInfo.fullName}</h1>
            <p className="text-gray-500">@{userInfo.nickname}</p>
          </div>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Edit Profile
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem
            icon={<User className="w-5 h-5" />}
            label="Full Name"
            value={userInfo.fullName}
          />
          <InfoItem
            icon={<AtSign className="w-5 h-5" />}
            label="Nickname"
            value={userInfo.nickname}
          />
          <InfoItem
            icon={<Phone className="w-5 h-5" />}
            label="Phone Number"
            value={userInfo.phone}
          />
          <InfoItem
            icon={<MapPin className="w-5 h-5" />}
            label="Country"
            value={userInfo.country}
          />
          <InfoItem
            icon={<Users className="w-5 h-5" />}
            label="Gender"
            value={userInfo.gender}
          />
          <InfoItem
            icon={<Home className="w-5 h-5" />}
            label="Address"
            value={userInfo.address}
          />
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userInfo={userInfo}
        onSave={handleSave}
      />
    </>
  );
}