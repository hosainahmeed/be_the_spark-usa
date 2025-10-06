'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card'
import Image from 'next/image'
import { IMAGE } from '../../../../public/assets/image/index.image'
import { Input } from '../input'
import Link from 'next/link'
import { Button } from '../button'
import { useRouter } from 'next/navigation'

function EmailVarify() {
    const [formData, setFormData] = useState({
        email: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            router.push(`/one-time-pass?email=${formData.email}`,)
            setIsLoading(false)
        }, 2000)
    }

    const handleChange = (e: React.FormEvent, key: string, value: string) => {
        e.preventDefault()
        setFormData((prev) => ({ ...prev, [key]: value }))
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
                    Verify Your Email
                </CardTitle>
                <CardDescription className="text-gray-400 text-lg mb-3">
                    We sent a 6-digit code to your email
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="flex mt-3 flex-col gap-6">
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleChange(e, 'email', e.target.value)}
                        required
                        className="w-full pr-10"
                        aria-required="true"
                    />
                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-[var(--blue)] hover:bg-[var(--blue)]"
                        disabled={isLoading}
                        size="lg"
                    >
                        {isLoading ? 'Confirming...' : 'Confirm'}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex mt-3 flex-col gap-2">
                <p className="text-sm text-center text-gray-600">Back to <Link className='hover:underline' href="/sign-up">Sign Up</Link></p>
            </CardFooter>
        </div>
    )
}

export default EmailVarify
