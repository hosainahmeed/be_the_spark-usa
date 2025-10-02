'use client'
import React, { useState } from 'react'
import PageTopBanner from '@/components/common/status-banner/PageTopBanner'
import { CAMP_DATA } from '@/components/landing/Featured Events/FeaturedEvents'
import FeaturedEventsCard from '@/components/landing/Featured Events/FeaturedEventsCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'


function MyShortlistedEvents() {
    const [activeButton, setActiveButton] = useState('registration-open')
    const shortlistedEventsButtons = [
        {
            title: 'Registration Open',
            status: 'registration-open',
        },
        {
            title: 'Started Event',
            status: 'started-event',
        },
        {
            title: 'Finished Event',
            status: 'finished-event',
        }
    ]

    const filteredEvents = CAMP_DATA.filter((item) => item.status === activeButton)


    return (
        <div>
            <PageTopBanner
                title='My Shortlisted Events'
                description='Events you’ve saved — click to view details and register via the organizer’s external site.' />

            <div className='container my-28 mx-auto'>
                <div className='hide-scroll-bar px-3 flex items-center w-full overflow-x-scroll my-12 gap-4'>
                    {
                        shortlistedEventsButtons && shortlistedEventsButtons.map((item, index) => (
                            <Button
                                key={index}
                                className={cn(
                                    'bg-[var(--blue)] rounded text-white hover:text-[var(--blue)] md:px-6 px-4 text-lg md:py-6 py-4 cursor-pointer hover:!bg-white',
                                    activeButton !== item.status ? 'bg-[#E6ECF5] text-[var(--blue)] hover:text-[var(--blue)]' : ''
                                )}
                                onClick={() => setActiveButton(item.status)}
                            >
                                {item.title}
                            </Button>
                        ))
                    }
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {
                        filteredEvents && filteredEvents?.length > 0 ? filteredEvents.map((item, index) => (
                            <FeaturedEventsCard
                                key={index}
                                camp={item}
                            />
                        )) : <p>No events found</p>
                    }
                </div>
            </div>

        </div>
    )
}

export default MyShortlistedEvents