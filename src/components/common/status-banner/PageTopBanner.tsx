import Image from 'next/image'
import React from 'react'
import { IMAGE } from '../../../../public/assets/image/index.image'

function PageTopBanner({ title, description }: { title: string, description: string }) {
    return (
        <div className='w-full flex items-center justify-center gap-16 md:p-12 p-3 bg-gradient-to-r from-[#E6ECF5] to-[#FEF2F2]'>
            <div className='container mx-auto flex items-center sm:flex-row flex-col justify-between gap-16'>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>{title}</h1>
                    <p className='md:text-lg text-base'>{description}</p>
                </div>
                <div className='hidden sm:block lg:w-[450px] lg:h-[300px] md:w-[350px] md:h-[250px] w-[250px] h-[200px]'>
                    <Image
                        src={IMAGE.pageTopBannerImage.src}
                        alt="Page Top Banner"
                        width={450}
                        height={300}
                        className='md:w-full w-full h-full object-cover'
                    />
                </div>
            </div>
        </div>
    )
}

export default PageTopBanner