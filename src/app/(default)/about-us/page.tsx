import PageTopBanner from '@/components/common/status-banner/PageTopBanner'
import Image from 'next/image'
import React from 'react'
import { IMAGE } from '../../../../public/assets/image/index.image'

function Page() {
    return (
        <div className="min-h-screen">
            <PageTopBanner
                title="About Us"
                description="The Sport families are searching for most — find events in one click."
            />

            {/* Main Content Section */}
            <section className="py-8 md:py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12">

                        {/* Image Section */}
                        <div className="flex-1 w-full">
                            <div className="relative max-w-lg mx-auto lg:max-w-none">
                                <Image
                                    src={IMAGE.aboutUsImage.src}
                                    alt="About PlayFinder - Youth Sports Platform"
                                    width={IMAGE.aboutUsImage.width}
                                    height={IMAGE.aboutUsImage.height}
                                    priority
                                    className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                />
                                {/* Optional decorative element */}
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10 hidden md:block"></div>
                                <div className="absolute -top-4 -left-4 w-16 h-16 bg-secondary/10 rounded-full -z-10 hidden md:block"></div>
                            </div>
                        </div>

                        {/* Text Content Section */}
                        <div className="flex-1 w-full">
                            <div className="max-w-lg mx-auto lg:max-w-none space-y-4 md:space-y-6">
                                {/* Badge */}
                                <span className="inline-block text-primary font-semibold text-sm md:text-base tracking-wide uppercase">
                                    Why Choose PlayFinder?
                                </span>

                                {/* Main Heading */}
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                    Connecting Young Athletes. Empowering Coaches. Uniting Communities.
                                </h1>

                                {/* Content Sections */}
                                <div className="space-y-4 md:space-y-6 text-gray-600 text-base md:text-lg leading-relaxed">
                                    <p>
                                        At PlayFinder, we’re on a mission to make finding and listing youth Sport events simple, safe, and stress-free. Whether you’re a parent searching for the perfect soccer camp or a coach looking to fill your next tournament — PlayFinder connects you with what matters most: opportunity, growth, and play.
                                    </p>

                                    <p>
                                        We believe every child deserves access to the right event — and every coach deserves a platform to be seen. That's why we've built a marketplace that removes the guesswork, saves time, and puts control in your hands — all while keeping safety and trust at the core.
                                    </p>

                                    {/* Mission Section */}
                                    <div className="space-y-2">
                                        <strong className="block text-primary text-lg md:text-xl font-semibold">
                                            Our Mission:
                                        </strong>
                                        <p>
                                            To simplify the way families discover and register for youth Sport events — and how coaches promote and grow their programs — through a secure, intuitive, and nationwide platform built for real people, real passion, and real play.
                                        </p>
                                    </div>

                                    {/* Vision Section */}
                                    <div className="space-y-2">
                                        <strong className="block text-primary text-lg md:text-xl font-semibold">
                                            Our Vision:
                                        </strong>
                                        <p>
                                            To become America's most trusted youth Sport event marketplace — empowering young athletes to grow, coaches to thrive, and communities to rally around the next generation of talent.
                                        </p>
                                    </div>
                                </div>

                                {/* Optional CTA Button */}
                                <div className="pt-4 md:pt-6">
                                    <button className="bg-[var(--blue)] text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-sm md:text-base hover:bg-primary/90 transition-colors duration-200 shadow-md hover:shadow-lg">
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page