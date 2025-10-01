import React from 'react';
import Head from 'next/head';
import { FindYourEventsSectionsImage } from '../../../../public/assets/image/FindYourEventsSections/index.image';
import PageTopBanner from '@/components/common/status-banner/PageTopBanner';
import FindYourEventsSections from '@/components/Find Your Events/FindYourEventsSections';

const data = [
    {
        title: 'Sign Up or Log In',
        description:
            'Create your free organizer account, or log in if you already have one. Registration is completely free, and any organization can begin listing events immediately without additional requirements.',
        image: FindYourEventsSectionsImage.player5,
        barBg: 'bg-[#BF0A30]',
    },
    {
        title: 'Add Event Information',
        description:
            'Once registered, you can create a new event by entering the essential details such as the event name, date, location, age group, and a short description. Providing accurate information ensures families can quickly understand what your event offers.',
        image: FindYourEventsSectionsImage.player6,
        barBg: 'bg-[#002868]',
    },
    {
        title: 'Provide Registration Link',
        description:
            'Include the external registration link where families can sign up and complete payments. Registration and payments remain under your full control, as they are handled entirely through your own website or system.',
        image: FindYourEventsSectionsImage.player7,
        barBg: 'bg-[#FFD700]',
    },
    {
        title: 'Publish & Reach Families',
        description:
            'After submission, your event will be published on the platform and made visible to families searching for activities. There are no fees or hidden charges — listing your events is always free.',
        image: FindYourEventsSectionsImage.player8,
        barBg: 'bg-[#CBD5E1]',
    },
];

function Page() {
    return (
        <>
            <Head>
                <title>List Your Events | SportFinder</title>
                <meta
                    name="description"
                    content="Follow these steps to get your events in front of thousands of families."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href="https://www.yoursite.com/list-events" />
            </Head>

            <PageTopBanner
                title="List Your Events"
                description="Follow these steps to get your events in front of thousands of families."
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
