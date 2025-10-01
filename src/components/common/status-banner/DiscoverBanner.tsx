import React from 'react'
import { IMAGE } from '../../../../public/assets/image/index.image'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

function DiscoverBanner() {
    return (
        <div
            style={{
                backgroundImage: `url(${IMAGE.discoverBannerImage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            className='container p-16 rounded-4xl overflow-hidden bg-[var(--blue)] mx-auto h-fit mb-28 flex items-center justify-between'>
            <div className='flex flex-col max-w-xl gap-4'>
                <h1
                    className="font-medium text-white text-6xl tracking-normal">Discover Youth Sport Events Near You</h1>
                <p className="text-white text-lg">From soccer camps to basketball tryouts — find the perfect event for your child in minutes.</p>
            </div>
            <div className='flex flex-row gap-4'>
                <Link
                    href={"/sign-in"}
                >
                    <Button className='bg-white text-[var(--blue)] hover:text-[var(--blue)] px-6 text-lg py-6 rounded cursor-pointer hover:!bg-white'>
                        Find Events Near You
                    </Button>
                </Link>
                <Link
                    href={"/sign-in"}
                >
                    <Button className='border border-white bg-transparent px-6 text-lg py-6 rounded cursor-pointer hover:!bg-white hover:!text-[#BF0A30]'>
                        <ArrowUpRight />  List Your Event
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default DiscoverBanner