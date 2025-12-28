import React from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { IMAGE } from '../../../public/assets/image/index.image';

interface AvatarSectionProps {
  name: string;
  avatar: any;
  isEditMode: boolean;
  onAvatarChange?: (file: File) => void;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({
  name,
  avatar,
  isEditMode,
  onAvatarChange
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAvatarChange) {
      onAvatarChange(file);
    }
  };



  const avatarSrc = avatar instanceof File ? URL.createObjectURL(avatar) : avatar;

  return (
    <div className="flex items-start gap-6 mb-6 md:mb-0">
      <div className={`relative ${isEditMode ? 'w-28 h-28' : 'w-28 h-28'}  rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0 border border-gray-100`}>
        {avatarSrc ? <Image
          className="rounded-full object-cover w-full h-full"
          src={avatarSrc}
          alt="Profile"
          width={200}
          height={200}
        /> :
          <div className="text-2xl font-bold text-gray-700 text-center">{name.charAt(0).toUpperCase()}</div>
        }
        {isEditMode && (
          <div className="absolute cursor-pointer bottom-0 z-10 rounded-full bg-[var(--blue)] right-0 w-6 h-6 flex items-center justify-center">
            <Camera className="w-4 h-4 cursor-pointer text-white" />
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              className="absolute cursor-pointer opacity-0 top-0 left-0 w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarSection;