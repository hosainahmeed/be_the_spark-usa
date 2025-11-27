import { IProfileData } from "@/app/hooks/useMyProfile";

export type UserRole = 'non-user' | 'login-user' | 'org';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}
export interface ProfileDropdownProps {
    menuItems?: any;
    user: any;
    profile?: IProfileData | null | undefined
    isOpen: boolean;
    onClose: () => void;
    onLogout?: () => void;
    icons?: string;
}
