'use client'
import SubscriptionCard from '@/components/common/subscription/SubscriptionCard'
import React from 'react'
import { useRouter } from 'next/navigation'
import { usePurchaseAnnualMutation } from '@/app/redux/service/annualApis';
import { toast } from 'sonner';

function page() {
    const router = useRouter();
    const [purchaseAnnual, { isLoading }] = usePurchaseAnnualMutation()

    const handlerSubscription = React.useCallback(async () => {
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
        <div className="flex w-full min-h-screen items-center justify-center">
            <SubscriptionCard disable={isLoading} buttonText={isLoading ? 'loading...': 'Purchase'} onPointerDown={() => handlerSubscription()} />
        </div>
    )
}

export default page