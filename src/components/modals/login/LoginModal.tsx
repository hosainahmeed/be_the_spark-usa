'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useLoginMutation } from '@/app/redux/service/authApis';
import Cookies from "js-cookie"
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

function LoginModal({ isOpen, setIsOpen, desireRoute }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const router = useRouter();


  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      const res = await login({ email: email, password: password }).unwrap();

      if (!res?.success) {
        throw new Error(res?.message || "Login Failed");
      }

      if (res?.data?.accessToken) {
        Cookies.set("accessTokenForPlayFinder", res?.data?.accessToken);

        if (Cookies.get('accessTokenForPlayFinder')) {
          toast.success(res?.message || "Login Successful");
          if (window !== undefined) {
            window.location.href = desireRoute || '/';
          } else {
            router.push(desireRoute || '/')
          }
        }
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || 'Something went wrong while signing in!');
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const borderGradient = `linear-gradient(90deg, #1F437B, #4a90e2, #1F437B)`;

  // Animation variants for the border
  const borderVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    }
  };

  const modalVariants: any = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden p-[2px] mx-4"
              style={{
                background: borderGradient,
                backgroundSize: '300% 100%',
                boxShadow: '0 0 15px rgba(31, 67, 123, 0.5)',
                animation: 'gradient 3s ease infinite',
                position: 'relative',
              }}
              variants={borderVariants}
              initial="hidden"
              animate="visible"
            >
              <style jsx global>{`
                @keyframes gradient {
                  0% { 
                    background-position: 0% 50%;
                    box-shadow: 0 0 15px rgba(74, 144, 226, 0.7);
                  }
                  50% { 
                    background-position: 100% 50%;
                    box-shadow: 0 0 20px rgba(74, 144, 226, 0.9);
                  }
                  100% { 
                    background-position: 0% 50%;
                    box-shadow: 0 0 15px rgba(74, 144, 226, 0.7);
                  }
                }
              `}</style>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30" />
              <motion.div 
                className="bg-white rounded-2xl p-8 w-full h-full relative z-10"
                initial={{ opacity: 0 }}
                animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold text-gray-900"
                >
                  Welcome Back
                </motion.h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-gray-600 mb-8"
              >
                Sign in to continue to your account
              </motion.p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </motion.div>

                {/* Remember & Forgot */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between"
                >
                  <Link href="/forgot-password" className="text-sm text-[#1F437B] hover:text-[#1F437B] font-medium">
                    Forgot password?
                  </Link>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={loginLoading}
                  className="w-full bg-[#1F437B] cursor-pointer hover:bg-[#1F437B] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loginLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </motion.button>
              </form>

              {/* Sign Up Link */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center text-sm text-gray-600 mt-6"
              >
                Don't have an account?{' '}
                <Link href="/choose-role" className="text-[#1F437B] hover:text-blue-700 font-medium">
                  Sign up
                </Link>
              </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default LoginModal;