'use client'
import React, { useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../input-otp'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card'
import { IMAGE } from '../../../../public/assets/image/index.image'
import { Button } from '../button'
import Link from 'next/link'

function OtpForm() {
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };
    return (
        <Card className="w-full shadow-none border-none md:shadow-lg md:border">
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
                <CardDescription className="text-[#1F2937] text-xl">
                    Please enter the code we've sent to your email
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
            <CardFooter className="flex flex-col gap-2">
                <p className="text-sm text-center text-gray-600">You have not received the OTP? <span className='hover:underline cursor-pointer' onClick={() => { }}>Resend OTP</span></p>
            </CardFooter>
        </Card>

    )
}

export default OtpForm