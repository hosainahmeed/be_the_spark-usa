'use client'
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EventDetails } from '@/types/event';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useMyProfile } from '@/app/hooks/useMyProfile';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoginModal from '@/components/modals/login/LoginModal';

function FeaturedEventsCard({ event }: { event: EventDetails }) {
    const { user } = useMyProfile()
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [role, setRole] = useState<string | undefined>(undefined)
    const [desireRoute, setDesireRoute] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (user) {
            setRole(user?.role);
        }
    }, [user])

    const handleFindEvents = () => {
        if (!user || !role) {
            setShowModal(true)
            setDesireRoute(`/event/${event?._id}`)
            return
        }
        if (role !== 'organizer') {
            router.push(`/event/${event?._id}`)
        }
    }

    return (
        <article className="group bg-white rounded-xl shadow-sm transition-all duration-300 border border-gray-100 overflow-hidden">
            <div className="relative p-2 aspect-video">
                <ClippedImage
                    photoUrl={event?.image}
                    className="w-full h-full object-cover"
                />

                <div className={cn("absolute text-[10px] border top-1 right-3 bg-gray-100 backdrop-blur-sm px-1 md:text-[10px] rounded  font-medium text-gray-700 flex items-center gap-1",
                    event?.eventStartDateTime >= new Date().toISOString() ?
                        'border border-green-500/50' : 'border-red-500/50'
                )}>
                    📆 <time dateTime={event?.eventStartDateTime}>
                        {new Date(event?.eventStartDateTime).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </time>
                </div>
            </div>

            <div className="p-4 space-y-3">
                <div className="space-y-2">
                    <h3 className="font-bold text-lg line-clamp-1 text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {event?.name}
                    </h3>

                    <div className="flex items-center text-sm text-gray-600 gap-1">
                        <span className="line-clamp-1">{event?.address}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="space-y-1">
                        <p className="text-base font-medium text-gray-700">Ages</p>
                        <p className="text-sm text-gray-600">{event?.minAge === 17 ? '17+' : `${event?.minAge}-${event?.maxAge}`}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-base font-medium text-gray-700">Sport</p>
                        <p className="text-sm text-gray-600">{event?.sport?.name}</p>
                    </div>

                    <div className="text-right space-y-1">
                        <p className="text-base font-medium text-gray-700">Reviews</p>
                        <div className="flex items-center gap-1">
                            <Star /> <span className="text-sm font-medium text-gray-900">
                                {event?.averageRating?.toFixed(1) || event?.totalRating?.toFixed(1)}
                            </span>
                            <span className="text-sm text-gray-500">
                                ({event?.avgRating || 5})
                            </span>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={() => handleFindEvents()}
                    className="w-fit mt-4 hover:bg-[var(--blue)] hover:text-white cursor-pointer bg-[#E6ECF5] text-black font-medium py-2 px-4 rounded transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                    View Details
                </Button>
            </div>
            {showModal && <LoginModal isOpen={showModal} setIsOpen={setShowModal} desireRoute={desireRoute} />}
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
                            d="M 0.687 0.134 C 0.690 0.143 0.694 0.148 0.698 0.148 L 0.973 0.148 C 0.979 0.148 0.984 0.155 0.987 0.168 L 0.997 0.208 C 0.999 0.218 1 0.229 1 0.238 L 1 1 L 0.087 1 C 0.082 1 0.077 0.993 0.074 0.983 L 0.004 0.829 C 0.001 0.822 0 0.813 0 0.804 L 0 0.05 C 0 0.022 0.007 0 0.017 0 L 0.632 0 C 0.637 0 0.641 0.005 0.644 0.013 L 0.687 0.134 Z"
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
                    className='object-contain'
                    clipPath={`url(#${clipId})`}
                />
            </svg>

            <div
                className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-orange-500/10"
                style={{
                    clipPath: "polygon(58.7% 13.4%, 59.0% 14.3%, 59.4% 14.8%, 59.8% 14.8%, 97.3% 14.8%, 97.9% 14.8%, 98.4% 15.5%, 98.7% 16.8%, 99.7% 20.8%, 99.9% 21.8%, 100% 22.9%, 100% 23.8%, 100% 100%, 8.7% 100%, 8.2% 100%, 7.7% 99.3%, 7.4% 98.3%, 0.4% 82.9%, 0.1% 82.2%, 0% 81.3%, 0% 80.4%, 0% 5%, 0% 2.2%, 0.7% 0%, 1.7% 0%, 53.2% 0%, 53.7% 0%, 54.1% 0.5%, 54.4% 1.3%, 58.7% 13.4%)"
                }}
            ></div>
        </div>
    );
};

const Star = () => {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13.9635 5.06988C13.9187 4.93114 13.8341 4.80865 13.7202 4.71768C13.6063 4.6267 13.4681 4.57126 13.3229 4.55826L9.28215 4.19133L7.68433 0.451429C7.56647 0.177356 7.29817 0 7.00006 0C6.70195 0 6.43362 0.177383 6.31582 0.452113L4.71798 4.19136L0.67655 4.55826C0.531519 4.57155 0.393577 4.62711 0.279825 4.71805C0.166074 4.809 0.0815158 4.93133 0.0366352 5.06988C-0.0555429 5.35339 0.0295804 5.66432 0.254215 5.86032L3.30859 8.53899L2.40792 12.5064C2.34202 12.7981 2.45522 13.0997 2.69728 13.2746C2.82735 13.3686 2.97958 13.4165 3.13307 13.4165C3.26541 13.4165 3.39667 13.3808 3.51452 13.3103L7.00006 11.2271L10.4843 13.3103C10.7393 13.4637 11.0607 13.4497 11.3022 13.2746C11.4204 13.189 11.5109 13.0706 11.5624 12.934C11.6138 12.7974 11.624 12.6487 11.5916 12.5064L10.6909 8.53899L13.7453 5.86087C13.8552 5.76491 13.9344 5.63878 13.9732 5.49815C14.012 5.35753 14.0086 5.2086 13.9635 5.06988Z" fill="#FFC107" />
        </svg>

    )
}
