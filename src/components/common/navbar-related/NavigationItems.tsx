'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MenuItem } from './navigation';


interface NavigationItemsProps {
    items: MenuItem[];
}

export const NavigationItems = ({ items }: NavigationItemsProps) => {
    return (
        <nav className="hidden md:flex items-center space-x-8">
            {items.map((item, index) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    {item.onClick ? (
                        <button
                            onClick={item.onClick}
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm"
                        >
                            {item.label}
                        </button>
                    ) : (
                        <Link
                            href={item.href}
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm"
                        >
                            {item.label}
                        </Link>
                    )}
                </motion.div>
            ))}
        </nav>
    );
};