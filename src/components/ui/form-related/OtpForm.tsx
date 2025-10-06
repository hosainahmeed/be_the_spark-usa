'use client'
import React, { useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../input-otp'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card'
import { IMAGE } from '../../../../public/assets/image/index.image'
import { Button } from '../button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function OtpForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            setTimeout(() => {
                setIsLoading(false);
                router.push('/one-time-pass');
            }, 2000);
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };
    return (
        <div>
            <CardHeader className="flex flex-col items-start gap-2">
                <Image
                    src={IMAGE.brandLogo}
                    alt="Sports Events Brand Logo"
                    width={100}
                    height={50}
                    priority
                />
                <CardTitle className="text-4xl text-[#1F2937] font-bold">
                    Verify your OTP
                </CardTitle>
                <CardDescription className="text-gray-400 mb-3 text-lg">
                    Please enter the code we've sent to your email
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-3">
                    <InputOTP style={{ width: '100%' }} maxLength={6}>
                        <InputOTPGroup className="w-full">
                            <InputOTPSlot className="w-full" index={0} />
                            <InputOTPSlot className="w-full" index={1} />
                            <InputOTPSlot className="w-full" index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup className="w-full">
                            <InputOTPSlot className="w-full" index={3} />
                            <InputOTPSlot className="w-full" index={4} />
                            <InputOTPSlot className="w-full" index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-[var(--blue)] hover:bg-[var(--blue)]"
                        disabled={isLoading}
                        size="lg"
                    >
                        {isLoading ? 'Verifying...' : 'Verify'}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex mt-3 flex-col gap-2">
                <p className="text-sm text-center text-gray-600">You have not received the OTP? <span className='hover:underline cursor-pointer' onClick={() => { }}>Resend OTP</span></p>
            </CardFooter>
        </div>

    )
}

export default OtpForm