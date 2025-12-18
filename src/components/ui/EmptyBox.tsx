import Image from 'next/image'
import React from 'react'
import { IMAGE } from '../../../public/assets/image/index.image'
import { cn } from '@/lib/utils'

function EmptyBox({ text = 'Data not found', className }: { text: string, className?: string }) {
    return (
        <div className={cn('flex items-center justify-center flex-col', className)}>
            <Image className='h-12 w-auto' src={IMAGE.emptyImage.src} width={200} height={200} alt={'empty'} />
            <h1 className='text-base text-gray-400'>{text}</h1>
        </div>
    )
}

export default EmptyBox