import Image, { StaticImageData } from 'next/image'
import React from 'react'

function SideImage({ image }: { image: StaticImageData }) {
    return (
        <div className="flex-1 hidden md:flex justify-center items-center max-w-[433px] h-[calc(100vh-12rem)]">
            <Image
                width={500}
                height={500}
                src={image}
                alt="Athlete signing up for sports events and tournaments"
                className="w-full h-full object-contain"
                priority
            />
        </div>
    )
}

export default SideImage