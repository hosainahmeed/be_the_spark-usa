import React from 'react';
import Head from 'next/head';
import PageTopBanner from '@/components/common/status-banner/PageTopBanner';
import { FindYourEventsSectionsImage } from '../../../../public/assets/image/FindYourEventsSections/index.image';
import FindYourEventsSections from '@/components/Find Your Events/FindYourEventsSections';

const data = [
    {
        title: 'Create Your Account',
        description:
            'Sign up with your basic details to get started. Your account will let you save preferences, track upcoming events, and personalize your Sport experience.',
        image: FindYourEventsSectionsImage.player1,
        barBg: 'bg-[#BF0A30]',
    },
    {
        title: 'Choose Your Membership',
        description:
            'Subscribe for a minimal yearly cost and unlock unlimited access for 12 months. With your membership, you can explore all Sport events, apply advanced filters, and view complete event details anytime.',
        image: FindYourEventsSectionsImage.player2,
        barBg: 'bg-[#002868]',
    },
    {
        title: 'Browse & Filter Events',
        description:
            'Search events based on sport type, age group, and location. Our smart filtering system makes it easy to discover the right events tailored to your interests and schedule.',
        image: FindYourEventsSectionsImage.player3,
        barBg: 'bg-[#FFD700]',
    },
    {
        title: 'View Details & Register',
        description:
            'Click on any event to see full information — including date, venue, age level, and skill requirements. When ready, register instantly through the organizer’s secure external link.',
        image: FindYourEventsSectionsImage.player4,
        barBg: 'bg-[#CBD5E1]',
    },
];

function Page() {
    return (
        <>
            <Head>
                <title>Find Youth Sport Events | SportFinder</title>
                <meta
                    name="description"
                    content="Find youth sport events by sport type, age group, or location. Sign up, browse events, and register securely."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href="https://www.yoursite.com/find-events" />
            </Head>

            <PageTopBanner
                title="Find Youth Sport Events"
                description="Search by sport, age, or location — all events require external registration."
            />

            <main className="flex flex-col mt-28 gap-8 px-4 sm:px-6 lg:px-8">
                {data.map((item, index) => (
                    <FindYourEventsSections
                        key={index}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        index={index}
                        barBg={item.barBg}
                    />
                ))}
            </main>
        </>
    );
}

export default Page;
