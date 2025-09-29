'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const AuthButtons = () => {
    return (
        <div className="flex items-center space-x-4">
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn("px-6 py-2 rounded border", "bg-white text-[#BF0A30] border-[#BF0A30] cursor-pointer")}
            >
                Login
            </motion.button>
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="primary-btn px-6 py-2 rounded cursor-pointer"
            >
                Register
            </motion.button>
        </div>
    );
};