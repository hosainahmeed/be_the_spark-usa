import { Metadata } from 'next';
import { IMAGE } from '../../../../public/assets/image/index.image';
import SignupForm from '@/components/ui/form-related/SignupForm';
import SideImage from '@/components/component-layout/SideImage';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Sign Up | Tryouts, Camps & Tournaments",
  description: "Sign up to access Tryouts, Camps, and Tournaments across America. Secure your spot today!",
  keywords: "sports tryouts, camps, tournaments, sign up, registration",
  openGraph: {
    title: "Sign Up | Tryouts, Camps & Tournaments",
    description: "Sign up to access Tryouts, Camps, and Tournaments across America.",
    type: 'website',
  },
};

export default function SignupPage() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 items-center justify-center max-w-screen-xl mx-auto min-h-screen md:p-4 gap-8 content-center">
      {/* Left side image */}
      <SideImage image={IMAGE.signUpImage} />
      {/* Right side form card */}
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm />
      </Suspense>
    </main>
  );
}