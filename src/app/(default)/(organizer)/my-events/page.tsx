"use client";
import { useMyEventQuery } from "@/app/redux/service/eventApis";
import PageTopBanner from "@/components/common/status-banner/PageTopBanner";
import FeaturedEventsCard from "@/components/landing/Featured Events/FeaturedEventsCard";
import { Button } from "@/components/ui/button";
import EmptyBox from "@/components/ui/EmptyBox";
import { cn } from "@/lib/utils";
import { EventDetails, EventStatus } from "@/types/event";
import React, { useState, useMemo } from "react";

const FILTERS: { title: string; status: EventStatus }[] = [
    { title: "Registration Open", status: "REGISTRATION_OPEN" },
    { title: "Started Event", status: "EVENT_STARTED" },
    { title: "Finished Event", status: "EVENT_FINISHED" },
    { title: "Upcoming", status: "UPCOMING" },
];

export default function Page() {
    const [activeFilter, setActiveFilter] = useState<EventStatus>("REGISTRATION_OPEN");

    const queryParams = useMemo(() => ({ status: activeFilter }), [activeFilter]);

    const { data, isLoading } = useMyEventQuery(queryParams);
    const events = data?.data?.result || [];

    return (
        <div>
            <PageTopBanner
                title="My Events"
                description="View and manage all the events you’ve created, track registrations, and update details easily."
            />

            {/* Filter Buttons */}
            <div className="container my-28 mx-auto">
                <div className="hide-scroll-bar px-3 flex items-center w-full overflow-x-scroll my-12 gap-4">
                    {FILTERS.map((item) => (
                        <Button
                            key={item.status}
                            onPointerDown={() => setActiveFilter(item.status)}
                            className={cn(
                                "rounded text-lg md:px-6 px-4 md:py-6 py-4 cursor-pointer transition",
                                activeFilter === item.status
                                    ? "bg-[var(--blue)] text-white hover:bg-[var(--blue)]"
                                    : "bg-[#E6ECF5] text-[var(--blue)] hover:bg-white hover:text-[var(--blue)]"
                            )}
                        >
                            {item.title}
                        </Button>
                    ))}
                </div>

                {/* Event Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {isLoading ? (
                        <div className="flex items-center col-span-5 justify-center h-[40vh]">
                            <p>Loading...</p>
                        </div>
                    ) : events.length > 0 ? (
                        events.map((event: EventDetails, index: number) => (
                            <FeaturedEventsCard key={index} event={event} />
                        ))
                    ) : (
                        <div className="w-full h-48 col-span-5 flex items-center justify-center">
                            <EmptyBox text='No events found' />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
