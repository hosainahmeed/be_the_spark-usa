import SectionTitleFormal from "@/components/component-layout/SectionTitleFormal";
import { EventDetails } from "@/types/event";
import { ArrowUpRight } from "lucide-react";
import FeaturedEventsCard from "./FeaturedEventsCard";
import { useGetEventsQuery } from "@/app/redux/service/eventApis";

const MyFeatureEvenets = () => {
    const { data, isLoading } = useGetEventsQuery({ limit: 4 })
    return (
        <div className="container  mx-auto p-4 sm:p-6 lg:p-8">
            <SectionTitleFormal
                title="My Events"
                description="Manage all your created events in one place and track registrations easily."
                button={true}
                buttonText="Explore All Events"
                icon={<ArrowUpRight className="w-6 h-6" />}
                buttonClassName='bg-[var(--blue)] text-white'
                className='my-12'
                routes='/my-events'
            />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {data?.data?.result.map((event: EventDetails) => (
                    <FeaturedEventsCard key={event?._id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default MyFeatureEvenets;