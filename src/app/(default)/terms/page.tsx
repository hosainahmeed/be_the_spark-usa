'use client'
import { useGetTermsAndConditionsQuery } from '@/app/redux/service/manageApis';
import PageTopBanner from '@/components/common/status-banner/PageTopBanner'
import SectionLayout from '@/components/component-layout/SectionLayout'
import React from 'react'

function page() {
    const { data: terms, isLoading, isError } = useGetTermsAndConditionsQuery({});
    return (
        <div>
            <PageTopBanner
                title="Terms and Conditions"
                description="The Sport families are searching for most — find events in one click."
            />
            <SectionLayout className='mt-12'>
                {isLoading ? isError ?
                    <div className='flex items-center justify-center'>
                        Something is wrong !
                    </div>
                    : <div className='w-full h-[50vh] bg-gray-200 animate-pulse rounded-md' /> : <div
                    style={{ fontFamily: 'sans-serif' }}
                    dangerouslySetInnerHTML={{
                        __html: terms?.data?.description
                    }} />}
            </SectionLayout>
        </div>
    )
}

export default page