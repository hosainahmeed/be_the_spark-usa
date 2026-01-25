import SectionTitleFormal from "@/components/component-layout/SectionTitleFormal";
import { ArrowUpRight } from "lucide-react";
import { PopularSportImage } from "../../../../public/assets/PopularSportImage/populor.sport.index";
import SportCategoryCard from "./SportCategoryCard";
import { Metadata } from "next";
import { useGetCategoryQuery } from "@/app/redux/service/categoryApis";
import { SportCategory } from "@/types/categoryApis";
import { useMemo } from "react";

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

export const backgroundImage = [
    PopularSportImage.bg1,
    PopularSportImage.bg2,
    PopularSportImage.bg3,
    PopularSportImage.bg4,
];

const PopularSportSection = () => {
    const { data, isLoading } = useGetCategoryQuery({ type: 'sports', sortBy: "name", sortOrder: 'asc', limit: 8 })

    const randomBackgrounds = useMemo(() => {
        if (!data?.data?.result) return [];
        return data.data.result.map(() => {
            const random = Math.floor(Math.random() * backgroundImage.length);
            return backgroundImage[random];
        });
    }, [data?.data?.result]);
    if (isLoading) {
        return (
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-gray-300 h-20 rounded w-full p-2 animate-pulse" />
                    ))}
                </div>
            </div>
        )
    }
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">

            <SectionTitleFormal
                title="Popular Sports"
                description="Explore the most popular sports for youth athletes."
                button={true}
                buttonText="Explore All Events"
                icon={<ArrowUpRight className="w-6 h-6" />}
                buttonClassName="bg-[var(--blue)] text-white"
                className="my-12"
                routes="/popular-sports"
            />

            <div className="w-full grid mb-28 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {data?.data?.result.map((item: SportCategory, index: number) => (
                    <SportCategoryCard
                        key={index}
                        title={item.name}
                        background={randomBackgrounds[index]}
                        icon={item.category_image}
                    />
                ))}
            </div>
        </div>
    );
};

export default PopularSportSection;
