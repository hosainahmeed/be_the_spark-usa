export type UserRole = 'non-user' | 'login-user' | 'org';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}
export interface ProfileDropdownProps {
    user: User;
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
    icons?: string;
}
