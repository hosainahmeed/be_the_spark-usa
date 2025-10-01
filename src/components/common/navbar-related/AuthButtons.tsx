'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const AuthButtons = () => {
    return (
        <div className="flex items-center space-x-4">
            <Link href="/sign-in">
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn("px-6 py-2 rounded border", "bg-white text-[#BF0A30] border-[#BF0A30] cursor-pointer")}
                >
                    Login
                </motion.button>
            </Link>
            <Link href="/sign-up">
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="primary-btn px-6 py-2 rounded cursor-pointer"
                >
                    Register
                </motion.button>
            </Link>
        </div>
    );
};