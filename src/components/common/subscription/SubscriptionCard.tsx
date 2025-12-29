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


    // if (!profile?.annualAccessExpiryDate && pathname?.includes('/subscription-purchase')) {
    //     return (
    //         <div className='md:mt-28 mt-16 px-1 h-72 bg-gray-200 max-w-2xl shadow-2xl mx-auto rounded-md mb-12 animate-pulse'></div>
    //     )
    // }

    // const expiryDate = profile?.annualAccessExpiryDate ? new Date(profile.annualAccessExpiryDate).getTime() : 0;
    // const currentDate = new Date().getTime();
    // const diffTime = Math.abs(expiryDate - currentDate);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // const isExpired = diffDays > 5;

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
                                // disabled={disable || isExpired}
                                onPointerDown={onPointerDown}
                                className='w-fit rounded px-12 cursor-pointer mt-4 py-5 self-start bg-[var(--blue)] text-white hover:bg-[var(--blue)]'
                            >{buttonText}</Button>
                            {/* {isExpired && <div className="mt-4">
                                <Alert title="You can renew annual access only within the last 5 days before expiry" type="info" showIcon />
                            </div>} */}
                        </div>

                    </div>
                </SectionLayout>
            </div>
        </div>
    )
}

export default SubscriptionCard


const Icon = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.689 2.298C13.818 2.013 12.632 2 10 2C8.589 2 7.58 2 6.785 2.055C5.999 2.108 5.495 2.211 5.087 2.381C4.48018 2.63216 3.92879 3.00041 3.46432 3.46472C2.99984 3.92902 2.63139 4.48027 2.38 5.087C2.21 5.496 2.107 5.999 2.054 6.785C2 7.58 2 8.588 2 10C2 11.412 2 12.42 2.055 13.215C2.108 14.001 2.211 14.505 2.381 14.913C2.63227 15.5196 3.00057 16.0708 3.46487 16.5351C3.92917 16.9994 4.48037 17.3677 5.087 17.619C5.496 17.789 5.999 17.892 6.785 17.945C7.58 18 8.59 18 10 18C11.41 18 12.42 18 13.215 17.945C14.001 17.892 14.505 17.789 14.913 17.619C15.5196 17.3677 16.0708 16.9994 16.5351 16.5351C16.9994 16.0708 17.3677 15.5196 17.619 14.913C17.789 14.504 17.892 14.001 17.945 13.215C18 12.42 18 11.412 18 10C18 9.234 18 8.584 17.99 8.016C17.9858 7.75078 18.087 7.49474 18.2716 7.30421C18.4561 7.11367 18.7088 7.00424 18.974 7C19.2392 6.99576 19.4953 7.09704 19.6858 7.28158C19.8763 7.46612 19.9858 7.71878 19.99 7.984C20 8.569 20 9.235 20 9.994V10.037C20 11.404 20 12.48 19.94 13.351C19.88 14.239 19.754 14.985 19.467 15.679C18.7565 17.394 17.394 18.7565 15.679 19.467C14.985 19.754 14.239 19.88 13.351 19.941C12.481 20 11.403 20 10.037 20H9.963C8.596 20 7.52 20 6.649 19.94C5.761 19.88 5.015 19.754 4.321 19.467C2.60602 18.7565 1.24345 17.394 0.533 15.679C0.246 14.985 0.12 14.239 0.059 13.351C1.49012e-08 12.481 0 11.404 0 10.037V9.963C0 8.597 -5.58794e-08 7.52 0.0599999 6.649C0.12 5.761 0.246 5.015 0.533 4.321C1.24322 2.6062 2.60539 1.24367 4.32 0.533C5.014 0.246 5.76 0.12 6.648 0.059C7.519 1.49012e-08 8.596 0 9.963 0H10.215C12.565 0 14.096 5.96046e-08 15.311 0.397C15.5561 0.484886 15.7573 0.664908 15.8717 0.898793C15.9862 1.13268 16.0049 1.40198 15.9238 1.64944C15.8428 1.8969 15.6685 2.103 15.4379 2.22393C15.2073 2.34486 14.9386 2.37207 14.689 2.298ZM19.864 2.996C19.9302 3.10945 19.9734 3.23484 19.9912 3.365C20.0089 3.49516 20.0009 3.62755 19.9674 3.75459C19.934 3.88162 19.8759 4.00083 19.7963 4.1054C19.7168 4.20996 19.6175 4.29784 19.504 4.364L19.282 4.493C15.6871 6.58998 12.7989 9.71082 10.986 13.457C10.9165 13.6006 10.8137 13.7255 10.6862 13.8213C10.5586 13.9171 10.41 13.9809 10.2527 14.0075C10.0954 14.0342 9.93401 14.0228 9.78202 13.9743C9.63004 13.9259 9.49185 13.8417 9.379 13.729L5.366 9.719C5.26826 9.62734 5.18993 9.51698 5.13568 9.39446C5.08142 9.27194 5.05234 9.13976 5.05017 9.00579C5.04799 8.87181 5.07276 8.73876 5.12301 8.61454C5.17326 8.49033 5.24796 8.37748 5.34268 8.28269C5.43739 8.18791 5.55019 8.11313 5.67437 8.06279C5.79855 8.01246 5.93158 7.98759 6.06556 7.98967C6.19954 7.99175 6.33174 8.02074 6.45429 8.07491C6.57685 8.12907 6.68727 8.20732 6.779 8.305L9.829 11.352C11.8288 7.78846 14.7443 4.8239 18.274 2.765L18.496 2.636C18.6095 2.56978 18.7348 2.52656 18.865 2.50882C18.9952 2.49107 19.1275 2.49914 19.2546 2.53258C19.3816 2.56601 19.5008 2.62414 19.6054 2.70366C19.71 2.78317 19.7978 2.88251 19.864 2.996Z" fill="#28A745" />
        </svg>

    )
}

