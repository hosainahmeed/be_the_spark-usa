'use client'
import React, { useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../input-otp'
import Image from 'next/image'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card'
import { IMAGE } from '../../../../public/assets/image/index.image'
import { Button } from '../button'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useVerifySignUpOtpMutation } from '@/app/redux/service/authApis'

function OtpForm() {
    const router = useRouter()
    const [verifyOtp, { isLoading: verifyLoading }] = useVerifySignUpOtpMutation()

    const searchParams = useSearchParams();
    const role = searchParams.get('role');
    const email = searchParams.get('email');

    const [verifyCode, setVerifyCode] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!email) throw new Error('Email is required for verify!')
            if (!role) throw new Error('Role is required for verify!')
            if (!verifyCode || verifyCode.length !== 6)
                throw new Error('Please enter a valid 6-digit OTP.')

            const data = {
                email,
                verifyCode: parseInt(verifyCode),
            }

            const res = await verifyOtp(data).unwrap()

            if (!res?.success) throw new Error(res?.message)

            toast.success(res?.message || "OTP verified successfully")

            setTimeout(() => {
                if (role === 'organizer') {
                    router.push(`/sign-in`)
                } else {
                    router.push(`/subscription-purchase?role=${role}`)
                }
            }, 500)

        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || 'Something went wrong')
        }
    }

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
                    Please enter the 6-digit code sent to your email
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-3">

                    {/* Bind OTP to State */}
                    <InputOTP
                        style={{ width: '100%' }}
                        maxLength={6}
                        value={verifyCode}
                        onChange={(value) => setVerifyCode(value)}
                    >
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
                        disabled={verifyLoading}
                        size="lg"
                    >
                        {verifyLoading ? 'Verifying...' : 'Verify'}
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="flex mt-3 flex-col gap-2">
                <p className="text-sm text-center text-gray-600">
                    Didn’t receive the OTP?{' '}
                    <span
                        className="hover:underline cursor-pointer"
                        onClick={() => toast.info("Resend OTP coming soon")}
                    >
                        Resend OTP
                    </span>
                </p>
            </CardFooter>
        </div>
    )
}

export default OtpForm
