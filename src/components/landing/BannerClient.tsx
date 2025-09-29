'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BannerProps } from '@/types/banner';
import { containerVariants, imageVariants, textVariants } from '@/lib/animation.framer';
import { IMAGE } from '../../../public/assets/image/index.image';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const BannerClient = ({ title, description, image }: BannerProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            className="w-full min-h-[calc(100dvh-80px)] flex items-center justify-center bg-gradient-to-br from-white to-gray-50/30"
            aria-labelledby="banner-title"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
                >
                    {/* Text Content */}
                    <motion.div
                        variants={containerVariants}
                        className="flex-1 text-center lg:text-left max-w-2xl"
                    >
                        <motion.h1
                            id="banner-title"
                            variants={textVariants}
                            style={{ fontFamily: 'Optima' }}
                            className="font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-6xl leading-tight sm:leading-tight lg:leading-tight text-gray-900 mb-6"
                        >
                            {title}
                        </motion.h1>

                        <motion.p
                            variants={textVariants}
                            style={{ fontFamily: 'Optima' }}
                            className="font-normal text-lg sm:text-xl lg:text-3xl leading-relaxed text-gray-600 mb-8 max-w-3xl"
                        >
                            {description}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={containerVariants}
                            className="flex  gap-4 justify-center lg:justify-start"
                        >
                            <Button className="primary-btn px-6 text-lg py-6 rounded cursor-pointer hover:!bg-white hover:!text-[#BF0A30]">
                                Find Events Near You
                            </Button>

                            <Button className={cn("px-6 py-6 text-lg rounded border hover:!bg-white hover:!text-[#BF0A30]", "bg-white text-[#BF0A30] border-[#BF0A30] cursor-pointer")}>
                                List Your Event
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                        variants={imageVariants}
                        className="flex-1 flex justify-center lg:justify-end relative"
                    >
                        <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
                            <Image
                                src={IMAGE.bannerImage}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                                className="w-full h-auto object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
export default BannerClient;