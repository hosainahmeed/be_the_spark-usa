'use client'

import { useState, useMemo } from 'react'
import { useGetEventsQuery } from "@/app/redux/service/eventApis"
import SectionLayout from "@/components/component-layout/SectionLayout"
import { EventCardGrid } from "@/components/events/EventCardGrid"
import FilterSidebar from "@/components/events/FilterSidebar"

type EventFilters = {
    searchTerm?: string
    minAge?: string
    maxAge?: string
    sport?: string
    eventType?: string
    status?: string
    skillLevel?: string
}

export default function EventsPage() {
    const [filters, setFilters] = useState<EventFilters>({})
    const [page, setPage] = useState(1)

    const queryParams = useMemo(() => ({
        limit: 6,
        page: page,
        ...Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== '' && value !== undefined)
        )
    }), [filters, page])

    const { data, isLoading } = useGetEventsQuery(queryParams)
    const updateFilter = <K extends keyof EventFilters>(key: K, value: EventFilters[K]) => {
        setFilters(prev => ({
            ...prev,
            [key]: value || undefined
        }))
    }

    return (
        <SectionLayout loading={isLoading}>
            <div className="flex flex-col lg:flex-row gap-6 p-6">
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <FilterSidebar
                        setAge={(value: { minAge: string; maxAge: string }) => {
                            updateFilter('minAge', value.minAge)
                            updateFilter('maxAge', value.maxAge)
                        }}
                        filters={filters}
                        setSport={(value: string) => updateFilter('sport', value)}
                        setEventType={(value: string) => updateFilter('eventType', value)}
                        setStatus={(value: string) => updateFilter('status', value)}
                        setSkillLevel={(value: string) => updateFilter('skillLevel', value)}
                    />
                </aside>

                <main className="flex-1">
                    <EventCardGrid
                        data={data}
                        page={page}
                        searchTerm={filters?.searchTerm || ''}
                        setFilters={setFilters}
                        setPage={setPage}
                        setSearchTerm={(value: string) =>
                            updateFilter('searchTerm', value)
                        }
                    />
                </main>
            </div>
        </SectionLayout>
    )
}
