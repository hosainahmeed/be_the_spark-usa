'use client'
import Link from 'next/link';
import { Facebook, Twitter, Youtube, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import { IMAGE } from '../../../../public/assets/image/index.image';
import { useCallback, useEffect, useState } from 'react';
import { User } from '@/types/navigation';
import { LOGIN_USER_MENU_ITEMS, NON_USER_MENU_ITEMS, ORGANIZER_MENU_ITEMS } from '../navbar-related/navigation';
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { useMyProfile } from '@/app/hooks/useMyProfile';
const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { user, profile, isLoading } = useMyProfile()

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

    const footerLinks = {
        resources: [
            { label: 'About Us', href: '/about-us' },
            { label: 'Contact Us', href: '/contact-us' },
            { label: 'FAQ', href: '/faq' },
        ],
        quickLinks: [...menuItems,
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Condition', href: '/terms' }
        ],
        social: [
            { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
            { icon: FaXTwitter, href: 'https://twitter.com', label: 'Twitter' },
            { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
        ],
    };
    return (
        <footer
            style={{
                backgroundImage: `url(${IMAGE.footersImage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            className="bg-[#0a1f44] text-white" role="contentinfo">
            <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Section */}
                    <section className="space-y-4" aria-labelledby="brand-heading">
                        <Link href="/" className="inline-flex items-center gap-2 group" aria-label="PlayFinderUSA Home">
                            <Image src={IMAGE.brandV2} alt="Logo" width={200} height={100} />
                        </Link>
                        <span className="text-sm capitalize block text-gray-300 lg:text-base">A product of Lorimer Sports Group LLC</span>
                        <address className="not-italic">
                            <Link
                                href="mailto:support@PlayFinderUSA.com"
                                className="inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white lg:text-base"
                                aria-label="Email us at support@PlayFinderUSA.com"
                            >
                                <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                                <span>support@PlayFinderUSA.com</span>
                            </Link>
                        </address>
                    </section>

                    {/* Resources Section */}
                    <nav className="space-y-4" aria-labelledby="resources-heading">
                        <h3 id="resources-heading" className="text-lg font-semibold lg:text-xl">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-300 transition-colors hover:text-white hover:underline lg:text-base"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Quick Links Section */}
                    <nav className="space-y-4" aria-labelledby="quick-links-heading">
                        <h3 id="quick-links-heading" className="text-lg font-semibold lg:text-xl">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks?.quickLinks?.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-300 transition-colors hover:text-white hover:underline lg:text-base"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Social Media Section */}
                    <section className="space-y-4" aria-labelledby="social-heading">
                        <h3 id="social-heading" className="text-lg font-semibold lg:text-xl">
                            Follow Us On
                        </h3>
                        <div className="flex gap-3">
                            {footerLinks.social.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 transition-all hover:bg-blue-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a1f44]"
                                        aria-label={`Follow us on ${social.label}`}
                                    >
                                        <Icon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                );
                            })}
                        </div>
                        <p className="text-sm text-gray-400 lg:text-base">
                            © {currentYear} PlayFinderUSA.com
                        </p>
                    </section>
                </div>
            </div>
        </footer>
    );
};

export default Footer;