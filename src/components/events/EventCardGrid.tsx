import React from "react";
import { CAMP_DATA } from "../landing/Featured Events/FeaturedEvents";
import FeaturedEventsCard from "../landing/Featured Events/FeaturedEventsCard";
import { Input } from "../ui/input";

export function EventCardGrid() {
    return (
        <React.Fragment>
            <Input
                className="w-full mb-6 border shadow-none h-12 px-6"
                placeholder="Search your perfect event" />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {CAMP_DATA.map(event => (
                    <FeaturedEventsCard key={event.id} camp={event} />
                ))}
            </div>
        </React.Fragment>
    )
}
