'use client'
import React, { useEffect, useMemo } from 'react'
import { IMAGE } from '../../../../public/assets/image/index.image'
import SectionLayout from '@/components/component-layout/SectionLayout'
import { useGetAnnualQuery } from '@/app/redux/service/annualApis'
import { Button } from '@/components/ui/button'
import { useMyProfile } from '@/app/hooks/useMyProfile'
import { Alert } from 'antd'
import { usePathname } from 'next/navigation'


function SubscriptionCard({ buttonText, onPointerDown, disable, setPrice }: { buttonText: string, disable?: boolean, setPrice?: any, onPointerDown: () => void }) {
    const { data: annualAccessFeeData, isLoading: annualDataLoading } = useGetAnnualQuery({})
    const { profile } = useMyProfile()
    const pathname = usePathname()

    const plan = useMemo(() => {
        const data = annualAccessFeeData?.data || [];
        if (!data) return null;

        return {
            name: 'Annual Access Fee',
            price: data.fee,
            discount: data?.discountAmount?.toString(),
            isDiscountActive: data?.isDiscountActive,
            previousPrice: (data.fee)?.toString(),
            discountReason: data?.discountReason,
            description: data?.description
        };
    }, [annualAccessFeeData]);

    useEffect(() => {
        if (!annualDataLoading && setPrice) {
            setPrice(plan?.isDiscountActive ? plan?.price - plan?.discount : plan?.price)
        }
    }, [plan, annualDataLoading])


    if (annualDataLoading) {
        return (
            <div className='md:mt-28 mt-16 px-1 h-72 bg-gray-200 max-w-2xl shadow-2xl mx-auto rounded-md mb-12 animate-pulse'></div>
        )
    }


    // if (!profile?.annualAccessExpiryDate && pathname?.includes('/subscription')) {
    //     return (
    //         <div className='md:mt-28 mt-16 px-1 h-72 w-full bg-gray-200 max-w-2xl shadow-2xl mx-auto rounded-md mb-12 animate-pulse'></div>
    //     )
    // }

    const expiryDate = profile?.annualAccessExpiryDate ? new Date(profile.annualAccessExpiryDate).getTime() : 0;
    const currentDate = new Date().getTime();
    const diffTime = Math.abs(expiryDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Only apply expiration check on the subscription-purchase route
    const isExpired = pathname?.includes('/subscription-purchase') ? diffDays > 5 : false;

    return (
        <div>
            <div className='md:mt-28 mt-16 px-1'>
                <SectionLayout>
                    <div className="container mx-auto min-w-2xl max-w-2xl">
                        <div
                            style={{
                                backgroundImage: `url(${IMAGE.subscriptionImage.src})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}
                            className="border border-gray-200 p-2 rounded-xl shadow-sm bg-white"
                        >
                            {/* Header */}
                            <div className="p-6 border border-[#FFDAD9] rounded-md flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold">{plan?.name}</h2>
                                    <p className="text-gray-500 text-sm">
                                        {`Join for $${plan?.isDiscountActive ? plan?.price - plan?.discount : plan?.price}/year`}
                                    </p>
                                </div>

                                <div className="mb-4 flex flex-col items-end">
                                    <div>
                                        <span className="text-black text-4xl font-bold">${plan?.isDiscountActive ? plan?.price - plan?.discount : plan?.price}</span>
                                        {plan?.isDiscountActive && (
                                            <span className="text-black ml-1 line-through">
                                                ${plan?.previousPrice}/year
                                            </span>
                                        )}
                                    </div>
                                    {plan?.isDiscountActive && (
                                        <span className="text-gray-500 text-sm">
                                            {plan?.discountReason} ${plan?.discount}/year
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className='my-6 p-2' dangerouslySetInnerHTML={{ __html: plan?.description }} />
                            <Button
                                // disabled={disable || (pathname?.includes('/subscription-purchase') && isExpired)}
                                onPointerDown={onPointerDown}
                                className='w-fit rounded px-12 cursor-pointer mt-4 py-5 self-start bg-[var(--blue)] text-white hover:bg-[var(--blue)]'
                            >{buttonText}</Button>
                            {pathname?.includes('/subscription-purchase') && isExpired && <div className="mt-4">
                                <Alert title="You can renew annual access only within the last 5 days before expiry" type="info" showIcon />
                            </div>}
                        </div>

                    </div>
                </SectionLayout>
            </div>
        </div>
    )
}

export default SubscriptionCard


