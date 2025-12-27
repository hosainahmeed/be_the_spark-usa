'use client'
import { usePurchaseAnnualMutation } from '@/app/redux/service/annualApis'
import PageTopBanner from '@/components/common/status-banner/PageTopBanner'
import SubscriptionCard from '@/components/common/subscription/SubscriptionCard'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

function page() {
    const router = useRouter()
    const [price, setPrice] = useState(null)
    const [purchaseAnnual, { isLoading }] = usePurchaseAnnualMutation()

    const handlerSubscriptionRenew = React.useCallback(async () => {
        try {
            const res = await purchaseAnnual(undefined).unwrap()
            if (!res?.success) {
                throw new Error(res?.message)
            }
            toast.success(res?.message)
            if (window !== undefined) {
                window.location.href = res?.data?.payment_url
            } else {
                router.push(res?.data?.payment_url)
            }
        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || "Something went wrong!")
        }
    }, [purchaseAnnual]);

    return (
        <>
            <PageTopBanner
                title='Simple. Fair. One Plan.'
                description={`Everything you need — no tiers, no confusion. Just $${price}/year to access all events.`} />
            <SubscriptionCard setPrice={setPrice} disable={isLoading} buttonText={isLoading ? 'Loading...' : 'Renew Now'} onPointerDown={() => handlerSubscriptionRenew()} />
        </>
    )
}

export default page