'use client';

import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IMAGE } from '../../../public/assets/image/index.image';
import { User } from '@/types/navigation';
import {
    LOGIN_USER_MENU_ITEMS,
    NON_USER_MENU_ITEMS,
    ORGANIZER_MENU_ITEMS
} from './navbar-related/navigation';
import { AuthButtons } from './navbar-related/AuthButtons';
import { ProfileAvatar } from './navbar-related/ProfileAvatar';
import { ProfileDropdown } from './navbar-related/ProfileDropdown';
import { NavigationItems } from './navbar-related/NavigationItems';
import { Button } from '../ui/button';

interface NavigationMenuBarProps {
    // Optional props for external control
    // user?: User | null;
    // onLogin?: () => void;
    // onRegister?: () => void;
    // onLogout?: () => void;
}

export const NavigationMenuBar = ({ }: NavigationMenuBarProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();

    // Memoized user data retrieval
    const getUserData = useCallback(() => {
        if (typeof window === 'undefined') return null;

        try {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    }, []);

    // Initialize user data
    useEffect(() => {
        setCurrentUser(getUserData());
    }, [getUserData]);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Handle logout
    const handleLogout = useCallback(() => {
        localStorage.removeItem('user');
        setCurrentUser(null);
        setIsDropdownOpen(false);

        // Optional: Add your logout logic here
        // if (onLogout) onLogout();

        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    }, []);

    // Toggle dropdown
    const handleToggleDropdown = useCallback(() => {
        setIsDropdownOpen(!isDropdownOpen);
    }, [isDropdownOpen]);


    // Get appropriate menu items based on user role
    const getMenuItems = useCallback(() => {
        if (!currentUser) return NON_USER_MENU_ITEMS;

        switch (currentUser.role) {
            case 'login-user':
                return LOGIN_USER_MENU_ITEMS;
            case 'org':
                return ORGANIZER_MENU_ITEMS;
            default:
                return NON_USER_MENU_ITEMS;
        }
    }, [currentUser]);

    const menuItems = getMenuItems();

    return (
        <header className="sticky top-0 z-40 h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 supports-backdrop-blur:bg-white/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Brand Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0"
                    >
                        <Link
                            href="/"
                            className="flex items-center text-xl font-bold text-gray-900"
                            aria-label="Home"
                        >
                            <Image
                                src={IMAGE.brandLogo}
                                alt="Brand Logo"
                                width={200}
                                height={100}
                                className="w-auto h-6 md:h-8 lg:h-10 object-contain"
                                priority
                            />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavigationItems items={menuItems} />
                    </nav>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!currentUser ? (
                            <AuthButtons />
                        ) : (
                            <div className="relative">
                                <ProfileAvatar
                                    user={currentUser}
                                    isDropdownOpen={isDropdownOpen}
                                    onToggleDropdown={() => handleToggleDropdown()}
                                />
                                <ProfileDropdown
                                    user={currentUser}
                                    isOpen={isDropdownOpen}
                                    onClose={() => handleToggleDropdown()}
                                    onLogout={handleLogout}
                                />
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                >
                                    <X size={24} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                >
                                    <Menu size={24} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden absolute top-full left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg"
                    >
                        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex flex-col space-y-4">
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        {item.onClick ? (
                                            <button
                                                onClick={() => {
                                                    item.onClick?.();
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="w-full text-left text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2 text-base"
                                            >
                                                {item.label}
                                            </button>
                                        ) : (
                                            <Link
                                                href={item.href || '#'}
                                                className={cn(
                                                    "block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2 text-base",
                                                    pathname === item.href && "text-blue-600 font-semibold"
                                                )}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}

                                {/* Mobile Auth Section */}
                                <div className="pt-4 border-t border-gray-200">
                                    {!currentUser ? (
                                        <div className="flex flex-col space-y-3">
                                            <AuthButtons />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col space-y-3">
                                            <div className="flex items-center space-x-3 p-2">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                                    {currentUser.avatar ? (
                                                        <img
                                                            src={currentUser.avatar}
                                                            alt={currentUser.name}
                                                            className="w-full h-full rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        currentUser.name.charAt(0).toUpperCase()
                                                    )}
                                                </div>
                                                <span className="text-gray-700 font-medium">
                                                    {currentUser.name || currentUser.email}
                                                </span>
                                            </div>
                                            <ProfileDropdown
                                                user={currentUser}
                                                isOpen={isDropdownOpen}
                                                onClose={() => handleToggleDropdown()}
                                                onLogout={() => handleLogout()}
                                            />
                                            <Button
                                                onClick={() => handleLogout()}
                                                className="primary-btn px-6 py-2 rounded cursor-pointer"
                                            >
                                                Sign Out
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};