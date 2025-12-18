'use client'
import React, { useEffect, useState } from 'react';
import { Star, ChevronLeft, Camera } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import { IMAGE } from '../../../../../public/assets/image/index.image';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import PasswordChangeForm from '@/components/profile/PasswordChangeForm';
import { useGetMyProfileQuery, useUpdateProfileMutation } from '@/app/redux/service/profileApis';
import { Skeleton, Card, Select, Spin } from 'antd';
import { getPlaceDetails, getPlaceSuggestions } from '@/lib/getPlaceNameAndCoordinates';
import { useChangePasswordMutation } from '@/app/redux/service/authApis';

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
  const [avatar, setAvatar] = useState<string | File | StaticImageData>(IMAGE.defaultProfileImage);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const router = useRouter();
  const [updateProfileMutation, { isLoading: updatedLoading }] = useUpdateProfileMutation();
  const { data: profileDatas, isLoading: profileLoading } = useGetMyProfileQuery({})
  const [changePasswordHandler] = useChangePasswordMutation();
  // Initialize form with empty values
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });

  const [options, setOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (profileDatas?.data) {
      const { address, profile_image, phone, name, email } = profileDatas.data;
      setProfileForm(prev => ({
        ...prev,
        name: name || '',
        email: email || '',
        phone: phone || '',
        location: address || '',
      }));

      if (profile_image) {
        setAvatar(profile_image);
      }
    }
  }, [profileDatas]);

  const [passwordForm, setPasswordForm] = useState<PasswordData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const profileData: ProfileData = {
    ...profileForm,
    avatar: typeof avatar === 'string' ? avatar : ''
  };

  const handleProfileInputChange = (field: keyof typeof profileForm, value: string) => {
    setProfileForm(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handlePasswordInputChange = (field: keyof PasswordData, value: string) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (avatar instanceof File) {
      formData.append('profile_image', avatar);
    }

    const data = {
      name: profileForm?.name,
      phone: profileForm?.phone,
      address: profileForm?.location,
    }
    try {

      formData.append('data', JSON.stringify(data))
      const res = await updateProfileMutation(formData).unwrap()
      if (!res?.success) {
        throw new Error(res?.message)
      }

      setUpdateProfile(false);
      toast.dismiss();
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.log(error)
      toast.error(error?.data?.message || error?.message || 'Somthing went wrong!')
    }
  };


  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirm password don't match!");
      return;
    }
    const data = {
      oldPassword: passwordForm.oldPassword,
      newPassword: passwordForm.newPassword,
      confirmNewPassword: passwordForm.confirmPassword
    }

    try {
      await changePasswordHandler(data).unwrap();
      setChangePassword(false);
      toast.success('Password changed successfully!');
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || 'Failed to change password');
    }
  };


  const handleCancelProfileUpdate = () => {
    setUpdateProfile(false);
    toast.dismiss();
  };




  const handleSearch = async (value: string) => {
    if (!value) {
      setOptions([]);
      return;
    }

    setLoading(true);

    const results = await getPlaceSuggestions(value);
    setLoading(false);

    setOptions(
      results.map((place: any) => ({
        label: place.name,
        value: place.placeId,
      }))
    );
  };

  const handleSelect = async (placeId: string) => {
    const place = await getPlaceDetails(placeId);
    if (!place) return;
    setProfileForm(prev => ({
      ...prev,
      location: place?.name || '',
    }));
  };


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

  // Skeleton loading state
  if (profileLoading) {
    return (
      <div className="min-h-screen p-6">
        <div className="container mx-auto">
          <Skeleton.Button active style={{ width: 200, height: 24 }} className="mb-8" />

          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
            <Skeleton.Avatar active size={112} shape="circle" className="mb-6 md:mb-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="p-4">
                <Skeleton active paragraph={{ rows: 1 }} />
              </Card>
            ))}
          </div>

          <div className="flex gap-3">
            <Skeleton.Button active style={{ width: 150, height: 48 }} />
            <Skeleton.Button active style={{ width: 180, height: 48 }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto">
        <button onPointerDown={() => router.back()} className="flex cursor-pointer items-center text-gray-700 text-sm mb-8 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          My Profile
        </button>

        <div>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
            <div className="flex items-start gap-6 mb-6 md:mb-0">
              <div className="w-28 relative h-28 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0 border border-gray-100">
                <Image
                  className='rounded-full object-cover cursor-pointer w-full h-full overflow-hidden'
                  src={
                    avatar instanceof File
                      ? URL.createObjectURL(avatar)
                      : typeof avatar === 'string'
                        ? avatar
                        : IMAGE.defaultProfileImage.src
                  }
                  alt="Profile"
                  width={200}
                  height={200}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const target = e.target as HTMLImageElement;
                    target.src = IMAGE.defaultProfileImage.src;
                  }}
                />
                {updateProfile && !changePassword && (
                  <div className="absolute cursor-pointer bottom-0 z-10 rounded-full bg-[var(--blue)] right-0 w-6 h-6 flex items-center justify-center">
                    <Camera className="w-4 h-4 cursor-pointer text-white" />
                    <input
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files?.[0]) {
                          setAvatar(e.target.files[0]);
                        }
                      }}
                      type="file"
                      accept="image/*"
                      className="absolute cursor-pointer opacity-0 top-0 left-0 w-full h-full"
                    />
                  </div>
                )}
              </div>
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
                <Select
                  size="large"
                  showSearch
                  placeholder="Search a location"
                  style={{ width: "100%", height: 48 }}
                  onSearch={handleSearch}
                  onSelect={handleSelect}
                  filterOption={false}
                  notFoundContent={loading ? <Spin size="small" /> : null}
                  value={profileForm.location || undefined}
                  options={options}
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
                  disabled={updatedLoading}
                  type="submit"
                  className='bg-[var(--blue)] hover:bg-[var(--blue)] w-fit text-white px-6 py-3 md:px-8 md:py-4 rounded font-semibold text-sm md:text-base  transition-colors duration-200 shadow-md hover:shadow-lg'
                >
                  {updatedLoading ? 'Updating...' : 'Update Profile'}
                </Button>
              </div>
            </form>
          )}

          {/* Password Change Form */}
          {changePassword && !updateProfile && (
            <PasswordChangeForm passwordForm={passwordForm} onCancel={handleCancelPasswordChange} onPasswordFormChange={handlePasswordInputChange} onSubmit={handlePasswordChange} />
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