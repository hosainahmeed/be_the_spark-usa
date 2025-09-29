import SideImage from "@/components/component-layout/SideImage";
import { Metadata } from "next";
import { IMAGE } from "../../../../public/assets/image/index.image";
import OtpForm from "@/components/ui/form-related/OtpForm";

export const metadata: Metadata = {
    title: "One Time Pass | Tryouts, Camps & Tournaments",
    description: "One Time Pass to access Tryouts, Camps, and Tournaments across America.",
    keywords: "sports tryouts, camps, tournaments, sign up, registration",
    openGraph: {
        title: "One Time Pass | Tryouts, Camps & Tournaments",
        description: "One Time Pass to access Tryouts, Camps, and Tournaments across America.",
        type: 'website',
    },
};

export default function OneTimePassPage() {
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 items-center justify-center max-w-screen-xl mx-auto min-h-screen md:p-4 gap-8 content-center">
            {/* Left side image */}
            <SideImage image={IMAGE.lockImage} />
            {/* Right side form card */}
            <OtpForm />
        </main>
    );
}