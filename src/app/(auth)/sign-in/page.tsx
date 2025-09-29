import SideImage from '@/components/component-layout/SideImage';
import { Metadata } from 'next';
import React from 'react'
import { IMAGE } from '../../../../public/assets/image/index.image';
import SigninForm from '@/components/ui/form-related/SigninForm';

export const metadata: Metadata = {
    title: "Sign-in",
    description: "Sign-in to access Tryouts, Camps, and Tournaments across America."
};

function Signin() {
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 items-center justify-center max-w-screen-xl mx-auto min-h-screen md:p-4 gap-8 content-center">
            {/* Left side image */}
            <SideImage image={IMAGE.signInImage} />
            {/* Right side form card */}
            <SigninForm />
        </main>
    )
}

export default Signin