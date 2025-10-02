import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

function FeaturedEventsCard({ camp }: { camp: any }) {
    return (
        <article className="group bg-white rounded-xl shadow-sm transition-all duration-300 border border-gray-100 overflow-hidden">
            <div className="relative p-2 h-40 sm:h-44 md:h-48 lg:h-40 xl:h-56">
                <ClippedImage
                    photoUrl={camp.photoUrl}
                    className="w-full h-full object-cover"
                />

                <div className="absolute top-2 right-3 bg-gray-100 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-gray-700 flex items-center gap-1">
                    📆 {camp.dateRange}
                </div>
            </div>

            <div className="p-4 space-y-3">
                <div className="space-y-2">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {camp.title}
                    </h3>

                    <div className="flex items-center text-sm text-gray-600 gap-1">
                        <span className="truncate">{camp.location}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="space-y-1">
                        <p className="text-base font-medium text-gray-700">Ages</p>
                        <p className="text-sm text-gray-600">{camp.ages}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-base font-medium text-gray-700">Sport</p>
                        <p className="text-sm text-gray-600">{camp.sport}</p>
                    </div>

                    <div className="text-right space-y-1">
                        <p className="text-base font-medium text-gray-700">Reviews</p>
                        <div className="flex items-center gap-1">
                            🌟 <span className="text-sm font-medium text-gray-900">
                                {camp.rating}
                            </span>
                            <span className="text-sm text-gray-500">
                                ({camp.reviewCount})
                            </span>
                        </div>
                    </div>
                </div>

                <Link
                    href={`/event/${camp.id}`}
                >
                    <Button
                        className="w-fit mt-4 hover:bg-[var(--blue)] hover:text-white cursor-pointer bg-[#E6ECF5] text-black font-medium py-2 px-5 rounded transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                        View Details
                    </Button>
                </Link>
            </div>
        </article>
    )
}

export default FeaturedEventsCard


const ClippedImage = ({ photoUrl, className = "" }: { photoUrl: string; className?: string }) => {
    const clipId = `clip-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={cn(`relative overflow-hidden`, className)}>
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 360 180"
                preserveAspectRatio="none"
            >
                <defs>
                    <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                        <path
                            d="M 0.587 0.134 C 0.590 0.143 0.594 0.148 0.598 0.148 L 0.973 0.148 C 0.979 0.148 0.984 0.155 0.987 0.168 L 0.997 0.208 C 0.999 0.218 1 0.229 1 0.238 L 1 1 L 0.087 1 C 0.082 1 0.077 0.993 0.074 0.983 L 0.004 0.829 C 0.001 0.822 0 0.813 0 0.804 L 0 0.05 C 0 0.022 0.007 0 0.017 0 L 0.532 0 C 0.537 0 0.541 0.005 0.544 0.013 L 0.587 0.134 Z"
                            vectorEffect="non-scaling-stroke"
                        />
                    </clipPath>
                </defs>

                <image
                    href={photoUrl}
                    x="0"
                    y="0"
                    width="360"
                    height="180"
                    preserveAspectRatio="xMidYMid slice"
                    className='object-cover'
                    clipPath={`url(#${clipId})`}
                />
            </svg>

            <div
                className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-orange-500/10"
                style={{
                    clipPath: "polygon(58.7% 13.4%, 59.0% 14.3%, 59.4% 14.8%, 59.8% 14.8%, 97.3% 14.8%, 97.9% 14.8%, 98.4% 15.5%, 98.7% 16.8%, 99.7% 20.8%, 99.9% 21.8%, 100% 22.9%, 100% 23.8%, 100% 100%, 8.7% 100%, 8.2% 100%, 7.7% 99.3%, 7.4% 98.3%, 0.4% 82.9%, 0.1% 82.2%, 0% 81.3%, 0% 80.4%, 0% 5%, 0% 2.2%, 0.7% 0%, 1.7% 0%, 53.2% 0%, 53.7% 0%, 54.1% 0.5%, 54.4% 1.3%, 58.7% 13.4%)"
                }}
            />
        </div>
    );
};
