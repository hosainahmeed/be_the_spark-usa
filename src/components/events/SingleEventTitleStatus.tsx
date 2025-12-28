import React from 'react'
import { cn } from '@/lib/utils'
import { EventDetails } from '@/types/event'


function SingleEventTitleStatus({ event }: { event: EventDetails }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold">{event?.name}</h1>
                <p className="text-sm text-gray-500">
                    For ages {event?.minAge} to {event?.maxAge} | {event?.sport?.type} | Hosted by {event?.organizer?.name}
                </p>
            </div>
            <span
                className={cn('px-4 py-1 text-sm font-medium rounded-full self-start md:self-auto', {
                    'bg-gray-300 text-gray-700': event?.status === 'UPCOMING',
                    'bg-green-100 text-green-700': event?.status === 'REGISTRATION_OPEN',
                    'bg-yellow-100 text-yellow-700': event?.status === 'EVENT_STARTED',
                    'bg-red-100 text-red-700': event?.status === 'EVENT_FINISHED',
                })}
            >
                {event?.status.replace('-', ' ')}
            </span>
        </div>
    )
}

export default SingleEventTitleStatus