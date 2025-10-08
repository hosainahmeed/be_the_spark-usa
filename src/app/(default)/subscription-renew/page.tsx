'use client'
import PageTopBanner from '@/components/common/status-banner/PageTopBanner'
import SubscriptionCard from '@/components/common/subscription/SubscriptionCard'
import React from 'react'

function page() {
    return (
        <>
            <PageTopBanner
                title='Simple. Fair. One Plan.'
                description='Everything you need — no tiers, no confusion. Just $15/year to access all events.' />
            <SubscriptionCard buttonText='Renew Now' onClick={() => alert('Renew option is not available yet , this feature will be available soon')} />
        </>
    )
}

export default page