'use client';
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import PageTopBanner from '@/components/common/status-banner/PageTopBanner';
import SectionLayout from '@/components/component-layout/SectionLayout';
import { useGetFaqQuery } from '@/app/redux/service/manageApis';

function FaQ() {
    const { data, isLoading } = useGetFaqQuery({})


    return (
        <div className="min-h-screen">
            <PageTopBanner
                title="Frequently asked questions"
                description="The Sport families are searching for most — find events in one click."
            />
            <div className='container mx-auto'>
                {isLoading ?
                    <div className='w-full h-[50vh] bg-gray-200 mt-4 animate-pulse rounded-md' />
                    : <SectionLayout className='mt-10'>
                        <h1 className='text-2xl font-semibold text-[#022C22] mb-6'>Frequently asked questions</h1>
                        {data?.data?.length > 0 ? (
                            <div className="">
                                <Accordion
                                    className="rounded-lg p-0"
                                    type="single"
                                    collapsible
                                    defaultValue="item-1"
                                >
                                    {data?.data?.map(
                                        (item: { question: string, answer: string }, index: number) => (
                                            <AccordionItem value={`item-${index + 1}`} key={index}>
                                                <AccordionTrigger className="font-poppins  py-3 font-medium text-lg md:text-xl text-[#000] transition-all ease-in-out duration-300">
                                                    {item?.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-[#6B7280] leading-relaxed  py-3 text-base md:text-base">
                                                    {item?.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        )
                                    )}
                                </Accordion>
                            </div>
                        ) : (
                            <p>No data available</p>
                        )}
                    </SectionLayout>}
            </div>
        </div>
    );
}

export default FaQ;
