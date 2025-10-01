import SectionTitleFormal from '@/components/component-layout/SectionTitleFormal'
import React from 'react'

function HowToWork() {
    const data = [
        {
            title: "Create Your Account",
            description: "Sign up with your name, email, and password to get started.",
            background: "bg-[#EF44444D]/40"
        },
        {
            title: "Choose Your Membership",
            description: "Subscribe annually for full access to all events and filters.",
            background: "bg-[#3B82F64D]/40"
        },
        {
            title: "Browse & Filter Events",
            description: "Search by sport, age, and location to find the right events.",
            background: "bg-[#ffffff]"
        },
        {
            title: "View & Register",
            description: "Check event details and register instantly via the organizer’s link.",
            background: "bg-[#FFD7004D]/40"
        },
    ]
    return (
        <div className='container mx-auto  px-4 sm:px-6 lg:px-8 mb-28'>
            <SectionTitleFormal
                title="How It Works"
                description="Simple Steps to Find or List Youth Sport Events — Fast"
            />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10'>
                {data.map((item, index) => (
                    <div key={index} className={`p-6 ${item.background} rounded-lg`}>
                        <h1 className="text-7xl font-semibold opacity-45">{index + 1}</h1>
                        <h2 className="text-2xl font-semibold">{item.title}</h2>
                        <p className="mt-2 text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HowToWork