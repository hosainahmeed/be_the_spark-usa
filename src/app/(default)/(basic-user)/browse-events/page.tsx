'use client'
import { useGetEventsQuery } from "@/app/redux/service/eventApis";
import SectionLayout from "@/components/component-layout/SectionLayout";
import { EventCardGrid } from "@/components/events/EventCardGrid";
import { FilterSidebar } from "@/components/events/FilterSidebar";


export default function EventsPage() {
    const { data, isLoading } = useGetEventsQuery({ limit: 4 })
    return (
        <SectionLayout>
            <div className="flex flex-col lg:flex-row gap-6 p-6">
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <FilterSidebar />
                </aside>
                <main className="flex-1">
                    <EventCardGrid data={data} />
                </main>
            </div>
        </SectionLayout>
    )
}
