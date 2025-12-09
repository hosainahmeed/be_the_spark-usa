'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { ICONS } from '../../../../public/assets/icons/index.icons';
import Image from 'next/image';
import { ProfileDropdownProps } from '@/types/navigation';
import { useRouter } from 'next/navigation';


export const ProfileDropdown = ({ user, isOpen, profile, onClose, onLogout }: ProfileDropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
    //             onClose();
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, [onClose]);

    const handleNavigate = (path: string) => {
        router.push(path);
        onClose();
    };

    const getMenuItems = () => {
        if (user?.role === 'user') {
            return [
                { label: 'Shortlisted Events', icons: ICONS.shortlisted, onPointerDown: () => handleNavigate('/my-shortlisted-events') },
                { label: 'My Subscription', icons: ICONS.subscription, onPointerDown: () => handleNavigate('/my-subscription') },
                { label: 'My Profile', icons: ICONS.userSetting, onPointerDown: () => handleNavigate('/my-profile') }
            ];
        }

        if (user.role === 'organizer') {
            return [
                { label: 'My Events', icons: ICONS.calender, onPointerDown: () => handleNavigate('/my-events') },
                { label: 'My Profile', icons: ICONS.userSetting, onPointerDown: () => handleNavigate('/my-profile-organizer') }
            ];
        }

        return [];
    };
    const menuItems = getMenuItems()
    return (
        <div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute hidden lg:block right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    >
                        {/* User Info Section */}
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                    {profile?.profile_image ? (
                                        <img
                                            src={profile?.profile_image}
                                            alt={profile?.name}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        profile?.name?.charAt(0).toUpperCase()
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                        {profile?.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">{profile?.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                            {menuItems?.map((item: any, index: number) => (
                                <motion.button
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onPointerDown={item.onPointerDown}
                                    className="w-full flex cursor-pointer items-center gap-2 text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                >
                                    <Image src={item.icons} width={20} height={20} alt={item.label} />  {item.label}
                                </motion.button>
                            ))}
                        </div>

                        {/* Sign Out Section */}
                        <div className="p-2 border-t border-gray-100">
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                onPointerDown={onLogout}
                                className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 font-medium"
                            >
                                <LogOut className="w-5 h-5" />   Sign Out
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="lg:hidden">
                <div className="p-2">
                    {menuItems.map((item: any, index: number) => (
                        <motion.button
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onPointerDown={item.onPointerDown}
                            className="w-full flex cursor-pointer items-center gap-2 text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                        >
                            <Image src={item.icons} width={20} height={20} alt={item.label} />  {item.label}
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
};