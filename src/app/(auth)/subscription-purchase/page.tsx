'use client'
import SubscriptionCard from '@/components/common/subscription/SubscriptionCard'
import React from 'react'
import { useRouter } from 'next/navigation'

function page() {
    const router = useRouter();
    return (
        <div className="flex w-full min-h-screen items-center justify-center">
            <SubscriptionCard buttonText='Purchase' onPointerDown={() => {
                alert('This feature is not available yet, it will be available soon')
                router.push('/sign-in')
            }} />
        </div>
    )
}

export default page