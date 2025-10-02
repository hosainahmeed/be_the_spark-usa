'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

function page() {
    const router = useRouter();
    return (
        <div className='h-fit py-12 container mx-auto'>
            <h1
                onClick={() => router.back()}
                className='text-2xl cursor-pointer hover:text-[var(--blue)]/40 font-bold flex items-center gap-2 w-fit'><ArrowLeft />My Subscription</h1>
            <div className='w-full p-28 flex gap-4 items-center justify-center'>
                <div className='flex gap-4 items-center w-full flex-col'>
                    <div className='flex w-full gap-4'>
                        <Card className='w-full border border-[#E6ECF5] rounded-md shadow-none'>
                            <CardContent>
                                <h1
                                    style={{ fontFamily: 'sans-serif' }}
                                    className='text-2xl font-medium'>Last Purchase Date</h1>
                                <p
                                    style={{ fontFamily: 'sans-serif' }}
                                    className='text-lg text-gray-500'>January 25, 2025</p>
                            </CardContent>
                        </Card>
                        <Card className='w-full border border-[#E6ECF5] rounded-md shadow-none'>
                            <CardContent>
                                <h1
                                    style={{ fontFamily: 'sans-serif' }}
                                    className='text-2xl font-medium'>Subscription Expiry Date</h1>
                                <p
                                    style={{ fontFamily: 'sans-serif' }}
                                    className='text-lg text-gray-500'>January 25, 2026</p>
                            </CardContent>
                        </Card>
                    </div>
                    <Button
                        style={{ fontFamily: 'sans-serif' }}
                        onClick={() => router.push('/subscription-renew')}
                        className='w-fit rounded px-12 cursor-pointer py-5 self-start bg-[var(--blue)] text-white hover:bg-[var(--blue)]'>Renew Subscription</Button>
                </div>
            </div>
        </div>
    )
}

export default page