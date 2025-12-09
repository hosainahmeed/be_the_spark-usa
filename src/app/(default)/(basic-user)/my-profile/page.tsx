'use client'
import React, { useState } from 'react';
import { Star, ChevronLeft, Camera } from 'lucide-react';
import Image from 'next/image';
import { IMAGE } from '../../../../../public/assets/image/index.image';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: any;
}

interface PasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage: React.FC = () => {
  const [avatar, setAvatar] = useState<any>(IMAGE.defaultProfileImage);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const router = useRouter();

  // Form state for profile update
  const [profileForm, setProfileForm] = useState({
    subtitle: 'youth Sport club',
    name: 'Wade Warren',
    email: 'info@youthSportclub.com',
    phone: '+1 (555) 123-4567',
    location: '1234 Maple Avenue, Suite 5B - San Diego, California, 92103, USA',
  });

  // Form state for password change
  const [passwordForm, setPasswordForm] = useState<PasswordData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const profileData: ProfileData = {
    ...profileForm,
    avatar: avatar
  };


  // Handle profile form input changes
  const handleProfileInputChange = (field: keyof typeof profileForm, value: string) => {
    setProfileForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle password form input changes
  const handlePasswordInputChange = (field: keyof PasswordData, value: string) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle profile update submission
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile Update Data:', {
      ...profileForm,
      avatar: avatar instanceof File ? avatar.name : 'Default avatar'
    });
    // Here you would typically send this data to your API
    setUpdateProfile(false);
    toast.dismiss();
    toast.success('Profile updated successfully!');
  };

  // Handle password change submission
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password Change Data:', passwordForm);

    // Basic validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New password and confirm password don't match!");
      return;
    }

    // Here you would typically send this data to your API
    setChangePassword(false);
    toast.dismiss();
    toast.success('Password changed successfully!');
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  // Cancel profile update
  const handleCancelProfileUpdate = () => {
    setUpdateProfile(false);
    toast.dismiss();
  };

  // Cancel password change
  const handleCancelPasswordChange = () => {
    setChangePassword(false);
    toast.dismiss();
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const data = [
    { label: 'Name', value: profileData.name },
    { label: 'Email', value: profileData.email },
    { label: 'Phone Number', value: profileData.phone },
    { label: 'Location', value: profileData.location },
  ];

  const handleDeleteAccount = () => {
    toast.success('Account deleted successfully!');
    localStorage.removeItem('user');
    if (window !== undefined) {
      window.location.reload();
      router.push('/sign-in');
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto">
        <button onPointerDown={() => router.back()} className="flex  cursor-pointer items-center text-gray-700 text-sm mb-8 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          My Profile
        </button>

        <div>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
            <div className="flex items-start gap-6 mb-6 md:mb-0">
              {(updateProfile && !changePassword) ? (
                <div className="w-28 relative h-28 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0 border border-gray-100">
                  <Image
                    className='rounded-full object-cover cursor-pointer w-full h-full overflow-hidden'
                    src={avatar ? avatar instanceof File ? URL.createObjectURL(avatar) : avatar : profileData.avatar}
                    alt="Logo"
                    width={200}
                    height={100}
                  />
                  <div className="absolute cursor-pointer bottom-0 z-10 rounded-full bg-[var(--blue)] right-0 w-6 h-6 flex items-center justify-center">
                    <Camera className="w-4 h-4 cursor-pointer text-white" />
                    <input
                      onChange={(e) => setAvatar(e.target.files?.[0])}
                      type="file"
                      className="absolute cursor-pointer opacity-0 top-0 left-0 w-full h-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-28 h-28 overflow-hidden rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0 border border-gray-100">
                  <Image src={IMAGE.defaultProfileImage} alt="Logo" width={200} height={100} />
                </div>
              )}
            </div>
          </div>

          {/* Profile Update Form */}
          {updateProfile && !changePassword && (
            <form onSubmit={handleProfileUpdate} className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
              <div>
                <Label>Name</Label>
                <Input
                  value={profileForm.name}
                  onChange={(e) => handleProfileInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={profileForm.phone}
                  onChange={(e) => handleProfileInputChange('phone', e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <Label>Location</Label>
                <Input
                  value={profileForm.location}
                  onChange={(e) => handleProfileInputChange('location', e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onPointerDown={handleCancelProfileUpdate}
                  className="px-6 py-2.5 bg-white w-fit text-red-600 rounded font-medium border border-red-600 hover:bg-red-50 transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className='bg-[var(--blue)] w-fit text-white px-6 py-3 md:px-8 md:py-4 rounded font-semibold text-sm md:text-base hover:bg-primary/90 transition-colors duration-200 shadow-md hover:shadow-lg'
                >
                  Update Profile
                </Button>
              </div>
            </form>
          )}

          {/* Password Change Form */}
          {changePassword && !updateProfile && (
            <form onSubmit={handlePasswordChange} className='grid grid-cols-1 md:grid-cols-1 gap-4 mb-8'>
              <div>
                <Label>Old Password</Label>
                <Input
                  placeholder="Old Password"
                  type="text"
                  value={passwordForm.oldPassword}
                  onChange={(e) => handlePasswordInputChange('oldPassword', e.target.value)}
                />
              </div>
              <div>
                <Label>New Password</Label>
                <Input
                  placeholder="New Password"
                  type="text"
                  value={passwordForm.newPassword}
                  onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                />
              </div>
              <div>
                <Label>Confirm Password</Label>
                <Input
                  placeholder="Confirm New Password"
                  type="text"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => handlePasswordInputChange('confirmPassword', e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onPointerDown={handleCancelPasswordChange}
                  className="px-6 py-2.5 bg-white w-fit text-red-600 rounded font-medium border border-red-600 hover:bg-red-50 transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className='bg-[var(--blue)] w-fit text-white px-6 py-3 md:px-8 md:py-4 rounded font-semibold text-sm md:text-base hover:bg-primary/90 transition-colors duration-200 shadow-md hover:shadow-lg'
                >
                  Update Password
                </Button>
              </div>
            </form>
          )}

          {/* Default View - Profile Information and Buttons */}
          {!updateProfile && !changePassword && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                {data.map((item, index) => renderCard(item, index))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  onPointerDown={() => setUpdateProfile(true)}
                  className="bg-[var(--blue)] cursor-pointer hover:bg-[var(--blue)] text-white px-6 py-3 md:px-8 md:py-4 rounded font-semibold text-sm md:text-base transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Update Profile
                </Button>
                <Button
                  onPointerDown={() => setChangePassword(true)}
                  className="bg-[var(--blue)] cursor-pointer hover:bg-[var(--blue)] text-white px-6 py-3 md:px-8 md:py-4 rounded font-semibold text-sm md:text-base transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Change Password
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="text-red-600 bg-transparent border border-red-600 hover:text-red-600">Delete Account</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Permanently Delete Your Account</DialogTitle>
                      <DialogDescription>
                        This action cannot be reversed. All your stored data, profile information, and history will be immediately and permanently erased. By confirming, you understand that you will lose access to the account and that we cannot recover any of your data later.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button size="sm" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        size="sm"
                        onPointerDown={handleDeleteAccount}
                        className="bg-[var(--blue)] cursor-pointer hover:bg-[var(--blue)] text-white px-6 py-3 md:px-8 md:py-4 rounded font-semibold text-sm md:text-base transition-colors duration-200 shadow-md hover:shadow-lg">Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}
        </div>
      </div>


    </div>
  );
};

export default ProfilePage;

const renderCard = ({ label, value }: { label: string; value: string | number }, index: number) => {
  return (
    <div key={index} className='bg-[#F5F7FA] p-4 rounded-sm border'>
      <label
        style={{ fontFamily: 'sans-serif' }}
        className="text-[#002868] mb-2 text-xl leading-[100%] tracking-[0%] font-semibold"
      >
        {label}
      </label>
      <p className="text-gray-700">{value}</p>
    </div>
  )
}