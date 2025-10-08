'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MenuItem } from './navigation';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';


interface NavigationItemsProps {
    items: MenuItem[];
}

export const NavigationItems = ({ items }: NavigationItemsProps) => {
    const pathname = usePathname();

    return (
        <nav className="hidden lg:flex items-center space-x-8">
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
                            className={cn(
                                "text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm",
                                pathname === item.href && "text-blue-600 border-b-2 border-blue-600"
                            )}
                        >
                            {item.label}
                        </Link>
                    )}
                </motion.div>
            ))}
        </nav>
    );
};