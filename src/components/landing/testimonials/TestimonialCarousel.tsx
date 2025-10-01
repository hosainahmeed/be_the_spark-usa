'use client'
import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SlideImage } from '../../../../public/assets/image/index.image';

interface Testimonial {
    id: number;
    name: string;
    date: string;
    image: string;
    quote: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "Rolando Hintz",
        date: "June 16-17, 2025",
        image: SlideImage.slideImage1.src,
        quote: "Ipsum vel nobis doloremque est aut non accusantium vero molestias. Et est minima dolorem eum modi atque sint nobis. Enim quod facere. Reiciendis necessitatibus ipsam non aspernatur voluptate id."
    },
    {
        id: 2,
        name: "Sarah Martinez",
        date: "July 22-23, 2025",
        image: SlideImage.slideImage2.src,
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
    },
    {
        id: 3,
        name: "Sarah Martinez",
        date: "July 22-23, 2025",
        image: SlideImage.slideImage3.src,
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
    }
];

const slideVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.3 }
        }
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.3
        }
    })
};

const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
};

const TestimonialCarousel: React.FC = memo(() => {
    const [[currentIndex, direction], setCurrentState] = useState([0, 0]);
    const [isAnimating, setIsAnimating] = useState(false);

    const paginate = useCallback((newDirection: number) => {
        if (isAnimating) return;

        setIsAnimating(true);
        setCurrentState(([prevIndex]) => {
            let newIndex = prevIndex + newDirection;
            if (newIndex < 0) newIndex = TESTIMONIALS.length - 1;
            if (newIndex >= TESTIMONIALS.length) newIndex = 0;
            return [newIndex, newDirection];
        });

        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating]);

    const currentTestimonial = TESTIMONIALS[currentIndex];

    return (
        <div
            className="w-full h-[calc(100vh-80px)] md:h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden"
            role="region"
            aria-label="Testimonials carousel"
        >
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
                style={{ backgroundImage: `url(${currentTestimonial.image})` }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8">
                <div className="w-full container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                        {/* Left Column - Content */}
                        <motion.div
                            className="space-y-8 text-white"
                            initial="initial"
                            animate="animate"
                            variants={fadeInUp}
                        >
                            {/* Quote Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                            >
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                                </svg>
                            </motion.div>

                            {/* Testimonial Text */}
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="space-y-6"
                                >
                                    <blockquote className="text-xl line-clamp-4 lg:text-2xl xl:text-3xl leading-relaxed lg:leading-relaxed font-light">
                                        {currentTestimonial.quote}
                                    </blockquote>

                                    <div className="space-y-2">
                                        <motion.h3
                                            className="text-2xl lg:text-3xl line-clamp-1 font-semibold"
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {currentTestimonial.name}
                                        </motion.h3>
                                        <motion.p
                                            className="text-white/80 flex items-center gap-2 text-sm lg:text-base line-clamp-1"
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {currentTestimonial.date}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation */}
                            <motion.div
                                className="flex items-center gap-4 pt-4"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <button
                                    onClick={() => paginate(-1)}
                                    disabled={isAnimating}
                                    aria-label="Previous testimonial"
                                    className="bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl p-4 text-white transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95"
                                >
                                    <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
                                </button>
                                <button
                                    onClick={() => paginate(1)}
                                    disabled={isAnimating}
                                    aria-label="Next testimonial"
                                    className="bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl p-4 text-white transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95"
                                >
                                    <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
                                </button>

                                {/* Dots Indicator */}
                                <div className="flex items-center gap-2 ml-4">
                                    {TESTIMONIALS.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                if (index !== currentIndex) {
                                                    paginate(index > currentIndex ? 1 : -1);
                                                }
                                            }}
                                            disabled={isAnimating}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                                ? 'bg-white w-6'
                                                : 'bg-white/50 hover:bg-white/70'
                                                }`}
                                            aria-label={`Go to testimonial ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Visual Element */}
                        <motion.div
                            className="hidden lg:flex items-center justify-center"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <div className="relative">
                                {/* Profile Image */}
                                <motion.div
                                    key={currentIndex}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
                                    className="relative w-64 h-64 xl:w-80 xl:h-80 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl"
                                >
                                    <img
                                        src={currentTestimonial.image}
                                        alt={currentTestimonial.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </motion.div>

                                {/* Decorative Elements */}
                                <motion.div
                                    className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/20 rounded-2xl -z-10"
                                    animate={{
                                        rotate: [0, 5, -5, 0],
                                        scale: [1, 1.05, 0.95, 1]
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                <motion.div
                                    className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-400/20 rounded-xl -z-10"
                                    animate={{
                                        rotate: [0, -8, 8, 0],
                                        scale: [1, 0.95, 1.05, 1]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
});

TestimonialCarousel.displayName = 'TestimonialCarousel';

export default memo(TestimonialCarousel);