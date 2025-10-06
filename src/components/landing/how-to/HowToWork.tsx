'use client'

import SectionTitleFormal from '@/components/component-layout/SectionTitleFormal'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

interface StepModel {
    title: string
    description: string
    background: string
}

interface HowToWorkData {
    non_user: StepModel[]
    login_user: StepModel[]
    org: StepModel[]
}

const howToWorkData: HowToWorkData = {
    non_user: [
        {
            title: "Create Your Account",
            description: "Sign up with your name, email, and password to get started.",
            background: "bg-[#EF44444D]/40",
        },
        {
            title: "Choose Your Membership",
            description: "Subscribe annually for full access to all events and filters.",
            background: "bg-[#3B82F64D]/40",
        },
        {
            title: "Browse & Filter Events",
            description: "Search by sport, age, and location to find the right events.",
            background: "bg-[#ffffff]",
        },
        {
            title: "View & Register",
            description: "Check event details and register instantly via the organizer’s link.",
            background: "bg-[#FFD7004D]/40",
        },
    ],
    login_user: [
        {
            title: "Choose Your Membership",
            description: "Subscribe annually for full access to all events and filters.",
            background: "bg-[#3B82F64D]/40",
        },
        {
            title: "Browse & Filter Events",
            description: "Search by sport, age, and location to find the right events.",
            background: "bg-[#ffffff]",
        },
        {
            title: "Register & Manage",
            description: "Register for your favorite events and manage them in your dashboard.",
            background: "bg-[#FFD7004D]/40",
        },
        {
            title: "Track Your Activities",
            description: "Stay updated on event changes, timings, and results.",
            background: "bg-[#EF44444D]/40",
        },
    ],
    org: [
        {
            title: "Verify Your Account",
            description: "Verify your account to unlock event creation and manage your events — all for free.",
            background: "bg-[#EF44444D]/40",
        },
        {
            title: "Add Event Information",
            description: "Enter the event name, date, location, age group, and a brief description.",
            background: "bg-[#3B82F64D]/40",
        },
        {
            title: "Provide Registration Link",
            description: "Add a registration link (e.g., Google Form) for families to sign up.",
            background: "bg-[#ffffff]",
        },
        {
            title: "Manage Your Events",
            description: "Edit, view, and monitor participant responses — all in one place.",
            background: "bg-[#FFD7004D]/40",
        },
    ],
}

function HowToWork() {
    const [role, setRole] = useState<'non_user' | 'login_user' | 'org'>('non_user')

    useEffect(() => {
        const cookieData = Cookies.get('user')
        if (cookieData) {
            try {
                const parsed = JSON.parse(cookieData)
                if (parsed?.role === 'org') {
                    setRole('org')
                } else if (parsed?.role === 'login') {
                    setRole('login_user')
                } else {
                    setRole('non_user')
                }
            } catch (err) {
                console.error('Invalid cookie format:', err)
                setRole('non_user')
            }
        } else {
            setRole('non_user')
        }
    }, [])

    const steps = howToWorkData[role]

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-28">
            <SectionTitleFormal
                title="How It Works"
                description="Simple Steps to Find or List Youth Sport Events — Fast"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                {steps.map((item, index) => (
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
