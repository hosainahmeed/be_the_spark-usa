import SideImage from '@/components/component-layout/SideImage'
import React from 'react'
import { IMAGE } from '../../../../public/assets/image/index.image'
import EmailVarify from '@/components/ui/form-related/EmailVarify'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Verify Your Email | Tryouts, Camps & Tournaments",
    description: "Verify your email to access Tryouts, Camps, and Tournaments across America.",
    keywords: "sports tryouts, camps, tournaments, sign up, registration",
    openGraph: {
        title: "Verify Your Email | Tryouts, Camps & Tournaments",
        description: "Verify your email to access Tryouts, Camps, and Tournaments across America.",
        type: 'website',
    },
};

function page() {
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 items-center justify-center max-w-screen-xl mx-auto min-h-screen md:p-4 gap-8 content-center">
            {/* Left side image */}
            <SideImage image={IMAGE.lockImage} />

            {/* Right side form card */}
            <EmailVarify />
        </main>
    )
}

export default page