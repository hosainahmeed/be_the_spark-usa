import React from 'react'

interface RenderCardProps {
    item: {
        label: string,
        value: any
    },
    index: number
}

const RenderCard = ({ item, index }: RenderCardProps) => {
    const { label, value } = item

    return (
        <div key={index} className='bg-[#F5F7FA] p-4 rounded-sm border'>
            <label
                style={{ fontFamily: 'sans-serif' }}
                className="text-[#002868] mb-2 text-xl leading-[100%] tracking-[0%] font-semibold"
            >
                {label}
            </label>
            <p className="text-gray-700">{value}</p>
        </div >
    )
}

export default RenderCard

