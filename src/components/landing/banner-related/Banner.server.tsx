import React from 'react';
import { BannerProps } from '@/types/banner';
import { BannerSEO } from './BannerSEO';
import BannerClient from './BannerClient';


export const BannerServer = async () => {
    const bannerData: BannerProps = {
        title: "Find the Perfect Youth Sport Event — Fast.",
        description: "Tryouts, Camps, Tournaments. All in One Place. All Across America.",
        image: {
            src: "/assets/image/index.image/banner-image.jpg",
            alt: "Youth athletes participating in various sports events",
            width: 500,
            height: 500,
        },
    };

    return (
        <>
            <BannerSEO
                title={bannerData.title}
                description={bannerData.description}
                imageUrl={bannerData.image.src}
            />
            <BannerClient {...bannerData} />
        </>
    );
};