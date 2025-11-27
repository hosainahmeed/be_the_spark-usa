import React from "react";
import FeaturedEventsCard from "../landing/Featured Events/FeaturedEventsCard";
import { Input } from "../ui/input";
import { EventDetails } from "@/types/event";

export function EventCardGrid({ data }: { data: any }) {
    return (
        <React.Fragment>
            <Input
                className="w-full mb-6 border shadow-none h-12 px-6"
                placeholder="Search your perfect event" />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {data?.data?.result.map((event: EventDetails) => (
                    <FeaturedEventsCard key={event?._id} event={event} />
                ))}
            </div>
        </React.Fragment>
    )
}
