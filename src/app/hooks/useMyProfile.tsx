'use client';
import { useGetMyProfileQuery } from "../redux/service/profileApis";

export interface IUser {
    _id: string;
    profileId: string;
    email: string;
    password: string;
    role: string;
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
}

export interface IProfileData {
    _id: string;
    user: IUser;
    name: string;
    businessName: string;
    phone: string;
    email: string;
    address: string;
    profile_image: string;
    createdAt: string;
    updatedAt: string;
}

export function useMyProfile() {
    const { data, isLoading, isError, refetch } = useGetMyProfileQuery({});

    const profile = data?.data as IProfileData | undefined;
    const user = profile?.user;

    return {
        raw: data,
        profile,
        user,
        isLoading,
        isError,
        refetch,
    };
}
