'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LOGIN_USER_MENU_ITEMS, NON_USER_MENU_ITEMS, ORGANIZER_MENU_ITEMS } from './navbar-related/navigation';
import { AuthButtons } from './navbar-related/AuthButtons';
import { ProfileAvatar } from './navbar-related/ProfileAvatar';
import { ProfileDropdown } from './navbar-related/ProfileDropdown';
import { NavigationItems } from './navbar-related/NavigationItems';
import Link from 'next/link';
import Image from 'next/image';
import { IMAGE } from '../../../public/assets/image/index.image';
import { User } from '@/types/navigation';

// interface HeaderProps {
//     user: User | null;
//     onLogin: () => void;
//     onRegister: () => void;
//     onLogout: () => void;
// }


// export const NavigationMenuBar = ({ user, onLogin, onRegister, onLogout }: HeaderProps) => {
export const NavigationMenuBar = () => {
    // const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>({
        id: '1',
        name: 'Leslie Alexander',
        email: 'redaniel@gmail.com',
        role: 'login-user',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    });

    const handleLogout = () => {
        console.log('Logout clicked');
        setCurrentUser(null);
    };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const getMenuItems = () => {
        if (!currentUser) return NON_USER_MENU_ITEMS;

        switch (currentUser.role) {
            case 'login-user':
                return LOGIN_USER_MENU_ITEMS;
            case 'org':
                return ORGANIZER_MENU_ITEMS;
            default:
                return NON_USER_MENU_ITEMS;
        }
    };

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCloseDropdown = () => {
        setIsDropdownOpen(false);
    };

    const menuItems = getMenuItems();

    return (
        <header
            className="sticky top-0 z-40 h-20 bg-white/80 backdrop-blur-md border-b border-gray-200"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Brand Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0"
                    >
                        <Link href="/" className="text-xl font-bold text-gray-900">
                            <Image
                                src={IMAGE.brandLogo}
                                alt="Logo"
                                width={200}
                                height={100}
                            />
                        </Link>
                    </motion.div>

                    {/* Navigation Items */}
                    <NavigationItems items={menuItems} />

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {!currentUser ? (
                            <AuthButtons />
                        ) : (
                            <div className="relative">
                                <ProfileAvatar
                                    user={currentUser}
                                    isDropdownOpen={isDropdownOpen}
                                    onToggleDropdown={handleToggleDropdown}
                                />
                                <ProfileDropdown
                                    user={currentUser}
                                    isOpen={isDropdownOpen}
                                    onClose={handleCloseDropdown}
                                    onLogout={handleLogout}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};