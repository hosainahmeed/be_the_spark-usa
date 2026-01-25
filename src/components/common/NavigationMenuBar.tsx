'use client';

import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
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
import { useMyProfile } from '@/app/hooks/useMyProfile';
import Cookies from 'js-cookie';

export const NavigationMenuBar = () => {
    const { user, profile, isLoading } = useMyProfile()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter()
    const pathname = usePathname();
    if (isLoading) {
        <div className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 supports-backdrop-blur:bg-white/60"></div>
    }

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleLogout = useCallback(() => {
        Cookies.remove('accessTokenForPlayFinder')
        if (window !== undefined) {
            window.location.reload()
        }
    }, []);

    const handleToggleDropdown = useCallback(() => {
        setIsDropdownOpen(!isDropdownOpen);
    }, [isDropdownOpen]);



    const getMenuItems = useCallback(() => {
        if (!user) return NON_USER_MENU_ITEMS;

        switch (user?.role) {
            case 'user':
                return LOGIN_USER_MENU_ITEMS;
            case 'organizer':
                return ORGANIZER_MENU_ITEMS;
            default:
                return NON_USER_MENU_ITEMS;
        }
    }, [user]);

    const menuItems = isLoading ? [] : getMenuItems();


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
                                className="w-auto h-6 lg:h-8 object-contain"
                                priority
                            />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <NavigationItems items={menuItems} />
                    </nav>

                    {/* Desktop Auth Section */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {!user ? (
                            isLoading ? <div className="w-20 h-8 animate-pulse rounded-md bg-gray-300"></div> : <AuthButtons />
                        ) : (
                            <div className="relative">
                                <ProfileAvatar
                                    user={profile}
                                    isDropdownOpen={isDropdownOpen}
                                    onToggleDropdown={() => handleToggleDropdown()}
                                />
                                <ProfileDropdown
                                    user={user}
                                    profile={profile}
                                    isOpen={isDropdownOpen}
                                    onClose={() => handleToggleDropdown()}
                                    onLogout={handleLogout}
                                />
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onPointerDown={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
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
                        className="lg:hidden absolute top-full left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg"
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
                                        {item.onPointerDown ? (
                                            <button
                                                onPointerDown={() => {
                                                    item.onPointerDown?.();
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
                                    {!user ? (
                                        <div className="flex flex-col space-y-3">
                                            <AuthButtons />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col space-y-3">
                                            <div onPointerDown={() => router.push("/my-profile-organizer")} className="flex items-center space-x-3 p-2">
                                                <div
                                                    className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                                    {profile?.profile_image ? (
                                                        <img
                                                            src={profile?.profile_image}
                                                            alt={profile?.name}
                                                            className="w-full h-full rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        profile?.name.charAt(0).toUpperCase()
                                                    )}
                                                </div>
                                                <span className="text-gray-700 font-medium">
                                                    {profile?.name || profile?.email}
                                                </span>
                                            </div>
                                            <ProfileDropdown
                                                user={profile}
                                                isOpen={isDropdownOpen}
                                                onClose={() => handleToggleDropdown()}
                                                onLogout={() => handleLogout()}
                                            />
                                            <Button
                                                onPointerDown={() => handleLogout()}
                                                className="primary-btn  px-6 py-2 rounded cursor-pointer"
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