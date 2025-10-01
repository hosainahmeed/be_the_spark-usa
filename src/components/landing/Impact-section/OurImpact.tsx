import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { ICONS } from "../../../../public/assets/icons/index.icons";
import Image from "next/image";

const stats = [
    {
        id: 1,
        title: "Family Satisfaction",
        description:
            "Rated by parents who found the perfect event — fast, safe, and stress-free.",
        value: "99%",
        iconState: true,
        image: <Image
            src={ICONS.Star}
            alt="Youth athletes participating in various sports events"
            width={50}
            height={50}
            className="w-12 h-12 leading-0 object-contain"
        />,
    },
    {
        id: 2,
        title: "States Covered",
        description:
            "From Maine to Hawaii — we’re building a nationwide network for youth Sport.",
        value: "50+",
        iconState: false,
    },
    {
        id: 3,
        title: "Events Listed",
        description:
            "Coaches and organizations using our platform to fill rosters and grow their programs.",
        value: "5,000+",
        iconState: false,
    },
    {
        id: 4,
        title: "Families Registered",
        description:
            "Globally prove the scalability and flexibility of our solutions.",
        value: "10,000+",
        iconState: true,
    },
];

function OurImpact() {
    return (
        <section
            className="w-full bg-gray-50 py-12"
            aria-labelledby="our-impact-heading"
        >
            <div className="container mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-12 px-4 sm:px-6 lg:px-8">

                {/* Left Content */}
                <div className="flex-1 flex flex-col items-start gap-6 lg:text-left">
                    <h2
                        id="our-impact-heading"
                        className="text-3xl md:text-4xl lg:text-5xl font-optima 
            tracking-wide leading-tight font-semibold text-gray-900"
                    >
                        Our Impact — By the Numbers
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                        Every number reflects our mission: helping young athletes play,
                        grow, and win — coast to coast.
                    </p>
                    <Button
                        asChild
                        className="bg-[var(--blue)] hover:bg-blue-700 text-white px-8 py-5 rounded-lg shadow-md transition-all duration-300 text-sm sm:text-base md:text-lg"
                    >
                        <a href="/get-started" aria-label="Get started with our platform">
                            Get Started Now
                        </a>
                    </Button>
                </div>

                {/* Right Content */}
                <div className="flex-1 columns-1 sm:columns-2 gap-6 space-y-6">
                    {stats.map((stat) => (
                        <article key={stat.id} className="break-inside-avoid">
                            <Card>
                                <CardContent className="p-6 flex flex-col gap-3 h-full">
                                    {stat.iconState && (
                                        <div className="w-12 h-12">
                                            <Image
                                                src={ICONS.IconWrapper}
                                                alt={stat.title + " icon"}
                                                width={50}
                                                height={50}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}

                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                                        {stat.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-500 flex-1">
                                        {stat.description}
                                    </p>
                                    <p className="text-xl flex items-center gap-2 sm:text-2xl font-bold text-[var(--blue)]">
                                        {stat.image && stat.image} {stat.value}
                                    </p>
                                </CardContent>
                            </Card>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default OurImpact;
