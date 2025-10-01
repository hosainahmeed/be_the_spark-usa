'use client';

import { User } from '@/types/navigation';
import { motion } from 'framer-motion';

interface ProfileAvatarProps {
    user: User;
    isDropdownOpen: boolean;
    onToggleDropdown: () => void;
}

export const ProfileAvatar = ({ user, isDropdownOpen, onToggleDropdown }: ProfileAvatarProps) => {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleDropdown}
            className="flex items-center cursor-pointer space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    user.name.charAt(0).toUpperCase()
                )}
            </div>
            <motion.div
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
            >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </motion.div>
        </motion.button>
    );
};