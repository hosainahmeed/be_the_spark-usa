'use client'
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import ProfileHeader from '@/components/profile/ProfileHeader';
import AvatarSection from '@/components/profile/AvatarSection';
import RatingSection from '@/components/profile/RatingSection';
import ProfileUpdateForm from '@/components/profile/ProfileUpdateForm';
import PasswordChangeForm from '@/components/profile/PasswordChangeForm';
import ActionButtons from '@/components/profile/ActionButtons';
import RenderCard from '@/components/profile/RenderCard';
import { useGetMyProfileQuery, useUpdateProfileMutation } from '@/app/redux/service/profileApis';
import { useChangePasswordMutation } from '@/app/redux/service/authApis';
import { imageUrl } from '@/utils/imageHandler';
import { useGetRatingQuery } from '@/app/redux/service/organizerRatingApis';


interface PasswordData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
interface User {
    _id: string;
    profileId: string;
    email: string;
    password?: string;
    role: 'organizer' | 'userD';
    isBlocked: boolean;
    isActive: boolean;
    verifyCode: number;
    isVerified: boolean;
    isResetVerified: boolean;
    codeExpireIn: string;
    isDeleted: boolean;
    playerIds: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ProfileData {
    _id: string;
    user: User;
    name: string;
    businessName: string;
    phone: string;
    email: string;
    address: string;
    profile_image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface ApiResponse {
    success: boolean;
    message: string;
    data: ProfileData;
}
export interface RatingData {
    totalRatings: number,
    averageRating: number
}
const ProfilePage: React.FC = () => {
    const [avatar, setAvatar] = useState<File | null>(null);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const router = useRouter();

    const { data: profileData, isLoading } = useGetMyProfileQuery({});
    const [updateProfileMutation, { isLoading: updatedLoading }] = useUpdateProfileMutation();
    const [changePasswordHandler] = useChangePasswordMutation();
    const { data: ratingData } = useGetRatingQuery({})
    const response = profileData as ApiResponse
    const [profileForm, setProfileForm] = useState({
        businessName: '',
        name: '',
        email: '',
        phone: '',
        location: '',
    });

    useEffect(() => {
        if (response) {
            setProfileForm({
                businessName: response?.data?.businessName,
                name: response?.data?.name,
                email: response?.data?.email,
                phone: response?.data?.phone,
                location: response?.data?.address,
            })
        }
    }, [response])


    const [passwordForm, setPasswordForm] = useState<PasswordData>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const profileImage = avatar
        ? URL.createObjectURL(avatar)
        : response?.data?.profile_image
            ? imageUrl({ image: response?.data?.profile_image })
            : 'https://placehold.co/400';

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

    const handleAvatarChange = (file: File) => {
        setAvatar(file);
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
            businessName: profileForm?.businessName
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

        try {
            await changePasswordHandler(passwordForm).unwrap();
            setChangePassword(false);
            toast.success('Password changed successfully!');
            setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            toast.error('Failed to change password');
        }
    };

    const handleCancelProfileUpdate = () => {
        setUpdateProfile(false);
        toast.dismiss();
    };

    const handleCancelPasswordChange = () => {
        setChangePassword(false);
        toast.dismiss();
        setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    };


    const profileCardsData = [
        { label: 'Business Name', value: response?.data?.businessName || 'N/A' },
        { label: 'Name', value: response?.data?.name || 'N/A' },
        { label: 'Email', value: response?.data?.email || 'N/A' },
        { label: 'Phone Number', value: response?.data?.phone || 'N/A' },
        { label: 'Location', value: response?.data?.address || 'N/A' },
    ];

    if (isLoading) {
        return <div>Loading...</div>;
    }



    return (
        <div className="min-h-screen p-6">
            <div className="container mx-auto">
                <ProfileHeader />

                <div>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
                        <AvatarSection
                            avatar={profileImage}
                            isEditMode={updateProfile && !changePassword}
                            onAvatarChange={handleAvatarChange}
                        />

                        {!updateProfile && !changePassword && (
                            <RatingSection
                                averageRating={ratingData?.data?.averageRating}
                                totalRatings={ratingData?.data?.totalRatings}
                            />
                        )}
                    </div>

                    {/* Profile Update Form */}
                    {updateProfile && !changePassword && (
                        <ProfileUpdateForm
                            profileForm={profileForm}
                            onProfileFormChange={handleProfileInputChange}
                            onCancel={handleCancelProfileUpdate}
                            onSubmit={handleProfileUpdate}
                            updatedLoading={updatedLoading}
                        />
                    )}

                    {/* Password Change Form */}
                    {changePassword && !updateProfile && (
                        <PasswordChangeForm
                            passwordForm={passwordForm}
                            onPasswordFormChange={handlePasswordInputChange}
                            onCancel={handleCancelPasswordChange}
                            onSubmit={handlePasswordChange}
                        />
                    )}

                    {/* Default View */}
                    {!updateProfile && !changePassword && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                                {profileCardsData.map((item, index) => (
                                    <RenderCard key={index} item={item} index={index} />
                                ))}
                            </div>
                            <ActionButtons
                                onUpdateProfile={() => setUpdateProfile(true)}
                                onChangePassword={() => setChangePassword(true)}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;