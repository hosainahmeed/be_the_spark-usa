'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BannerProps } from '@/types/banner';
import { containerVariants, imageVariants, textVariants } from '@/lib/animation.framer';
import { IMAGE } from '../../../../public/assets/image/index.image';
import { Button } from '../../ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useMyProfile } from '@/app/hooks/useMyProfile';

const BannerClient = ({ title, description, image }: BannerProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const { user } = useMyProfile()

    const [role, setRole] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (user) {
            setRole(user?.role);
        }
    }, [user])

    return (
        <section
            ref={sectionRef}
            className="w-full h-fit py-16 md:pb-28 flex items-center justify-center bg-gradient-to-br from-white to-gray-50/30"
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
                            style={{ fontFamily: 'sans-serif' }}
                            className="font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-6xl leading-tight sm:leading-tight lg:leading-tight text-gray-900 mb-6"
                        >
                            {title}
                        </motion.h1>

                        <motion.p
                            variants={textVariants}
                            className="font-normal text-lg sm:text-xl lg:text-3xl leading-relaxed text-gray-600 mb-8 max-w-3xl"
                        >
                            {description}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={containerVariants}
                            className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start"
                        >
                            {role !== 'organizer' && <Link href='/browse-events'>
                                <Button className="primary-btn px-6 text-lg py-6 rounded cursor-pointer hover:!bg-white hover:!text-[#BF0A30]">
                                    Find Events
                                </Button>
                            </Link>}

                            {role !== 'user' &&
                                <Link href={role === 'organizer' ? 'list-events-organizer' : '/list-events'}>
                                    <Button className={cn("px-6 py-6 text-lg rounded",
                                        "bg-white text-[#BF0A30] border border-[#BF0A30] cursor-pointer",
                                        role === 'organizer' && "bg-[var(--blue)] border-none hover:bg-[var(--blue)] text-white  cursor-pointer"
                                    )}>
                                        List Your Event
                                    </Button>
                                </Link>}
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
            </div >
        </section >
    );
};
export default BannerClient;