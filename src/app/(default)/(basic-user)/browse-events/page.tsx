'use client'

import { useState, useMemo } from 'react'
import { useGetEventsQuery } from "@/app/redux/service/eventApis"
import SectionLayout from "@/components/component-layout/SectionLayout"
import { EventCardGrid } from "@/components/events/EventCardGrid"
import FilterSidebar from "@/components/events/FilterSidebar"
import { Button, Skeleton } from 'antd'
import { FiFilter, FiX } from 'react-icons/fi'
import { AnimatePresence, motion, Variants } from 'framer-motion'

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
    const [showMobileFilter, setShowMobileFilter] = useState(false)
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


    const sidebarVariants: Variants = {
        hidden: {
            x: '-100%',
            opacity: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
            }
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
            }
        },
        exit: {
            x: '-100%',
            opacity: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
            }
        }
    }

    const overlayVariants = {
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.2
            }
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.2
            }
        }
    }

    return (
        <SectionLayout>
            <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
                {/* Desktop Sidebar - Always visible on large screens */}
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    {isLoading ? <div className="w-full h-[calc(100vh-10rem)] bg-gray-200 rounded animate-pulse"></div> : <FilterSidebar
                        setAge={(value: { minAge: string; maxAge: string }) => {
                            updateFilter('minAge', value.minAge)
                            updateFilter('maxAge', value.maxAge)
                        }}
                        filters={filters}
                        setSport={(value: string) => updateFilter('sport', value)}
                        setEventType={(value: string) => updateFilter('eventType', value)}
                        setStatus={(value: string) => updateFilter('status', value)}
                        setSkillLevel={(value: string) => updateFilter('skillLevel', value)}
                    />}
                </aside>

                {/* Mobile Filter Sidebar with Overlay */}
                <AnimatePresence>
                    {showMobileFilter && (
                        <>
                            {/* Overlay */}
                            <motion.div
                                key="overlay"
                                variants={overlayVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="fixed inset-0 z-[999] lg:hidden"
                                onPointerDown={() => setShowMobileFilter(false)}
                            />

                            {/* Mobile Sidebar */}
                            <motion.aside
                                key="mobile-sidebar"
                                variants={sidebarVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="fixed left-0 top-0 h-full w-[85vw] max-w-sm bg-white z-[1000] lg:hidden shadow-2xl overflow-y-auto"
                            >
                                <div className="sticky top-0 bg-white z-10 border-b p-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold">Filters</h2>
                                        <Button
                                            type="text"
                                            icon={<FiX size={20} />}
                                            onPointerDown={() => setShowMobileFilter(false)}
                                            className="hover:bg-gray-100"
                                        />
                                    </div>
                                </div>

                                <div className="p-4">
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
                                </div>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <main className="flex-1">
                    {
                        isLoading ?
                            <>
                                <div className="w-full h-11 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {
                                        Array.from({ length: 6 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="flex flex-col bg-neutral-300 w-full h-64 animate-pulse rounded-xl p-4 gap-4"
                                            >
                                                <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
                                                <div className="flex flex-col gap-2">
                                                    <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                                                    <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                                                    <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                                                    <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                            :
                            <EventCardGrid
                                setShowMobileFilter={setShowMobileFilter}
                                data={data}
                                page={page}
                                searchTerm={filters?.searchTerm || ''}
                                setFilters={setFilters}
                                setPage={setPage}
                                setSearchTerm={(value: string) =>
                                    updateFilter('searchTerm', value)
                                }
                            />}
                </main>
            </div>
        </SectionLayout>
    )
}