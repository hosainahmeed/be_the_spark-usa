import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProfileHeaderProps {
  title?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ title = "My Profile" }) => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="flex cursor-pointer items-center text-gray-700 text-sm mb-8 hover:text-gray-900 transition-colors"
    >
      <ChevronLeft className="w-4 h-4 mr-1" />
      {title}
    </button>
  );
};

export default ProfileHeader;