import SectionTitleFormal from "@/components/component-layout/SectionTitleFormal";
import { ArrowUpRight } from "lucide-react";
import { PopularSportImage } from "../../../../public/assets/PopularSportImage/populor.sport.index";
import SportCategoryCard from "./SportCategoryCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Popular Sports",
    description: "Explore the most popular sports for youth athletes.",
    keywords: "sports tryouts, camps, tournaments, sign up, registration",
    openGraph: {
        title: "Popular Sports",
        description: "Explore the most popular sports for youth athletes.",
        type: 'website',
    },
};


const PopularSportSection = () => {
    const backgroundImage = [PopularSportImage.bg1, PopularSportImage.bg2, PopularSportImage.bg3, PopularSportImage.bg4];
    const data = [
        {
            title: "Soccer",
            background: backgroundImage[0],
            icon: PopularSportImage.soccer
        },
        {
            title: "Basketball",
            background: backgroundImage[1],
            icon: PopularSportImage.basketball
        },
        {
            title: "Rugby",
            background: backgroundImage[2],
            icon: PopularSportImage.rugby
        },
        {
            title: "Baseball",
            background: backgroundImage[3],
            icon: PopularSportImage.baseball
        },
        {
            title: "Cricket",
            background: backgroundImage[0],
            icon: PopularSportImage.cricket
        },
        {
            title: "Volleyball",
            background: backgroundImage[1],
            icon: PopularSportImage.volleyball
        },
        {
            title: "Tennis",
            background: backgroundImage[2],
            icon: PopularSportImage.tennis
        },
        {
            title: "Chess",
            background: backgroundImage[3],
            icon: PopularSportImage.chess
        }
    ]
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <SectionTitleFormal
                title="Popular Sports"
                description="Explore the most popular sports for youth athletes."
                button={true}
                buttonText="Explore All Events"
                icon={<ArrowUpRight className="w-6 h-6" />}
                buttonClassName='bg-[var(--blue)] text-white'
                className='my-12'
            />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {data.map((item, index) => (
                    <SportCategoryCard key={index} title={item.title} background={item.background} icon={item.icon} />
                ))}
            </div>
        </div>
    );
};

export default PopularSportSection;
