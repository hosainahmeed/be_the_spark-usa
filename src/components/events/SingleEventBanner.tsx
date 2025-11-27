import Image from 'next/image'
import React from 'react'
import { imageUrl } from '@/utils/imageHandler'
import { EventDetails } from '@/types/event'

function SingleEventBanner({ event }: { event: EventDetails }) {
    return (
        <div
            style={{
                backgroundImage: `url(${event.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl shadow-lg">
            <div className='absolute md:block hidden top-0 left-0 w-full rounded-2xl h-full backdrop-blur-md opacity-50'></div>
            <div className='absolute md:block hidden -bottom-4 shadow-xl left-1/2 h-48 w-72 -translate-x-1/2 rounded-2xl overflow-hidden'>
                <Image
                    src={imageUrl({ image: event.image })}
                    alt={event.name}
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    )
}

export default SingleEventBanner