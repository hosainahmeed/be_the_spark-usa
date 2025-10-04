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

function FaQ() {
    const data = [
        {
            question: 'How do I find events for my child’s age and sport?',
            answer: 'Use the search bar on the homepage — just pick your child’s sport, age group, and ZIP code. You’ll see matching events in seconds. No login needed to browse!'
        },
        {
            question: 'What does “Sponsored” mean on an event?',
            answer: 'Sponsored events are supported by local businesses and organizations. They help keep Play Finder free for everyone to use.'
        },
        {
            question: 'Can I save events to register later?',
            answer: 'Yes! Just click the “Save” button on any event page. You can find them in your account under “Saved Events.”'
        },
        {
            question: 'How do I know if an event is still open for registration?',
            answer: 'The event page shows how many spots are left. If it says “Full,” the event is sold out.'
        },
        {
            question: 'Why do I need to create an account?',
            answer: 'Creating an account lets you save events, register for multiple events, and see your saved events in one place.'
        },
        {
            question: 'Is my payment and personal information safe?',
            answer: 'Yes, we use secure payment processing and encryption to protect your information.'
        }
    ];

    return (
        <div className="min-h-screen">
            <PageTopBanner
                title="Frequently asked questions"
                description="The Sport families are searching for most — find events in one click."
            />
            <div className='container mx-auto'>
                <SectionLayout className='mt-10'>
                    <h1 className='text-2xl font-semibold text-[#022C22] mb-6'>Frequently asked questions</h1>
                    {data?.length > 0 ? (
                        <div className="">
                            <Accordion
                                className="rounded-lg p-0"
                                type="single"
                                collapsible
                                defaultValue="item-1"
                            >
                                {data?.map(
                                    (
                                        item: { question: string; answer: string },
                                        index: number
                                    ) => (
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
                </SectionLayout>
            </div>
        </div>
    );
}

export default FaQ;
