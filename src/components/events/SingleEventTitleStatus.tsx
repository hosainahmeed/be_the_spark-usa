import React from 'react'
import { CAMP_DATA } from '../landing/Featured Events/FeaturedEvents'
import { cn } from '@/lib/utils'


function SingleEventTitleStatus({ event }: { event: CAMP_DATA }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold">{event.title}</h1>
                <p className="text-sm text-gray-500">
                    For ages {event.ages} | {event.eventType} | Hosted by {event.organizer}
                </p>
            </div>
            <span
                className={cn('px-4 py-1 text-sm font-medium rounded-full self-start md:self-auto', {
                    'bg-green-100 text-green-700': event.status === 'registration-open',
                    'bg-yellow-100 text-yellow-700': event.status === 'started-event',
                    'bg-red-100 text-red-700': event.status === 'finished-event',
                })}
            >
                {event.status.replace('-', ' ')}
            </span>
        </div>
    )
}

export default SingleEventTitleStatus