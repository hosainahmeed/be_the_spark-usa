'use client'
import React, { useState } from 'react'
import PageTopBanner from '@/components/common/status-banner/PageTopBanner'
import { CAMP_DATA } from '@/components/landing/Featured Events/FeaturedEvents'
import FeaturedEventsCard from '@/components/landing/Featured Events/FeaturedEventsCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { EventDetails, EventStatus } from '@/types/event'
import { useMyBookmarkQuery } from '@/app/redux/service/bookMarkApis'
import Image from 'next/image'
import { IMAGE } from '../../../../../public/assets/image/index.image'
import EmptyBox from '@/components/ui/EmptyBox'

interface IButton {
    title: string,
    status: EventStatus
    activeFlag: string
}

function MyShortlistedEvents() {
    const [activeButton, setActiveButton] = useState<string>('')
    const [eventStatus, setEventStatus] = useState<IButton | string>('')
    const shortlistedEventsButtons: IButton[] = [
        {
            title: 'Upcoming event',
            status: 'UPCOMING',
            activeFlag: 'Upcoming event',
        },
        {
            title: 'Registration Open',
            status: 'REGISTRATION_OPEN',
            activeFlag: 'Registration Open'
        },
        {
            title: 'Started Event',
            status: 'EVENT_STARTED',
            activeFlag: 'Started Event'
        },
        {
            title: 'Finished Event',
            status: 'EVENT_FINISHED',
            activeFlag: 'Finished Event'
        }
    ]

    const { data, isLoading, isFetching } = useMyBookmarkQuery({
        ...(eventStatus !== '' ? { eventStatus } : {})
    })


    return (
        <div>
            <PageTopBanner
                title='My Shortlisted Events'
                description='Events you’ve saved — click to view details and register via the organizer’s external site.' />

            <div className='container my-28 mx-auto'>
                {isLoading || isFetching ?
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                        {Array.from({ length: 4 }).map((_, i) => (
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
                        ))}
                    </div>
                    :
                    <>
                        <div className='hide-scroll-bar px-3 flex items-center w-full overflow-x-scroll my-12 gap-4'>
                            {
                                shortlistedEventsButtons && shortlistedEventsButtons.map((item, index) => (
                                    <Button
                                        key={index}
                                        className={cn(
                                            'bg-[var(--blue)] rounded text-white hover:text-[var(--blue)] md:px-6 px-4 text-lg md:py-6 py-4 cursor-pointer hover:!bg-white border hover:border-[var(--blue)]',
                                            activeButton !== item.activeFlag ? 'bg-[#E6ECF5] text-[var(--blue)] hover:text-[var(--blue)]' : 'bg-[var(--blue)]'
                                        )}
                                        onPointerDown={() => {
                                            setEventStatus(item.status)
                                            setActiveButton(item.activeFlag)
                                        }}
                                    >
                                        {item.title}
                                    </Button>
                                ))
                            }
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                            {
                                data && data?.data?.result?.length > 0 ? data?.data?.result?.map((item: { event: EventDetails }, index: number) => (
                                    <FeaturedEventsCard
                                        key={index}
                                        event={item?.event}
                                    />
                                )) : <div className="w-full h-48 col-span-5 flex items-center justify-center">
                                    <EmptyBox text='No events found' />
                                </div>
                            }
                        </div>
                    </>}
            </div>

        </div>
    )
}

export default MyShortlistedEvents