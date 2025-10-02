import React from 'react';
import FeaturedEventsCard from './FeaturedEventsCard';
import SectionTitleFormal from '@/components/component-layout/SectionTitleFormal';
import { ArrowUpRight } from 'lucide-react';

export interface CAMP_DATA {
    id: number;
    title: string;
    location: string;
    dateRange: string;
    ages: string;
    rating: number;
    reviewCount: number;
    sport: string;
    photoUrl: string;
    status: 'registration-open' | 'started-event' | 'finished-event';
}

export const CAMP_DATA: CAMP_DATA[] = [
    {
        id: 1,
        title: "Summer Soccer Camp 2025",
        location: "New York, USA",
        dateRange: "June 15-17, 2025",
        ages: "10-14",
        rating: 4.9,
        reviewCount: 24,
        sport: "Soccer",
        photoUrl: "https://i.ibb.co.com/PZN7Lq13/8cdf4a01753ac5dcd0ec91ad19d3665448a437b7.png",
        status: 'registration-open'
    },
    {
        id: 2,
        title: "Basketball Skills Camp 2025",
        location: "Los Angeles, USA",
        dateRange: "July 20-22, 2025",
        ages: "12-16",
        rating: 4.7,
        reviewCount: 18,
        sport: "Basketball",
        photoUrl: "https://i.ibb.co.com/PGTbr1xQ/cdb0cbd28f4d652b06cacf43557c76749ca38023.png",
        status: 'started-event'
    },
    {
        id: 3,
        title: "Tennis Academy Camp 2025",
        location: "Miami, USA",
        dateRange: "August 5-7, 2025",
        ages: "8-14",
        rating: 4.8,
        reviewCount: 32,
        sport: "Tennis",
        photoUrl: "https://i.ibb.co.com/DgLWmZcY/b827575f043289944139bd0b82b4f0b512e4a0d0.png",
        status: 'registration-open'
    },
    {
        id: 4,
        title: "Tennis Academy Camp 2025",
        location: "Miami, USA",
        dateRange: "August 5-7, 2025",
        ages: "8-14",
        rating: 4.8,
        reviewCount: 32,
        sport: "Tennis",
        photoUrl: "https://i.ibb.co.com/DgLWmZcY/b827575f043289944139bd0b82b4f0b512e4a0d0.png",
        status: 'finished-event'
    },
];




const FeaturedEvents = () => {
    return (
        <div className="container  mx-auto p-4 sm:p-6 lg:p-8">
            <SectionTitleFormal
                title="Featured Events"
                description="Events promoted by coaches & organizations to reach more families."
                button={true}
                buttonText="Explore All Events"
                icon={<ArrowUpRight className="w-6 h-6" />}
                buttonClassName='bg-[var(--blue)] text-white'
                className='my-12'

            />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {CAMP_DATA.map((camp) => (
                    <FeaturedEventsCard key={camp.id} camp={camp} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedEvents;