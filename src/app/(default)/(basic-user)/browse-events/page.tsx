'use client'
import { useGetEventsQuery } from "@/app/redux/service/eventApis";
import SectionLayout from "@/components/component-layout/SectionLayout";
import { EventCardGrid } from "@/components/events/EventCardGrid";
import FilterSidebar from "@/components/events/FilterSidebar";
import { useState } from "react";


export default function EventsPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [filters, setFilters] = useState({
        age: '',
        category: '',
        location: '',
        price: '',
        sport: ''
    })
    const { data, isLoading } = useGetEventsQuery({ limit: 4, 
        ...(Object.entries(filters).filter(([_, value]) => value !== '').map(([key, value]) => ({ [key]: value }))), 
        ...(searchTerm !== '' ? { searchTerm } : {}) });

    return (
        <SectionLayout>
            <div className="flex flex-col lg:flex-row gap-6 p-6">
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <FilterSidebar setFilters={setFilters} />
                </aside>
                <main className="flex-1">
                    <EventCardGrid setSearchTerm={setSearchTerm} data={data} />
                </main>
            </div>
        </SectionLayout>
    )
}

