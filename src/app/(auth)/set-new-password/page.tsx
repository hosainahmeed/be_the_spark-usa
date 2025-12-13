import SideImage from "@/components/component-layout/SideImage";
import { Metadata } from "next";
import { IMAGE } from "../../../../public/assets/image/index.image";
import { Suspense } from "react";
import NewPasswordSet from "@/components/ui/form-related/NewPasswordSet";

export const metadata: Metadata = {
    title: "Set New Password | Tryouts, Camps & Tournaments",
    description: "Set New Password to access Tryouts, Camps, and Tournaments across America.",
    keywords: "sports tryouts, camps, tournaments, sign up, registration",
    openGraph: {
        title: "Set New Password | Tryouts, Camps & Tournaments",
        description: "Set New Password to access Tryouts, Camps, and Tournaments across America.",
        type: 'website',
    },
};

export default function SetNewPasswordPage() {
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 items-center justify-center max-w-screen-xl mx-auto min-h-screen md:p-4 gap-8 content-center">
            <SideImage image={IMAGE.lockImage} />
            <Suspense fallback={<div>Loading...</div>}>
                <NewPasswordSet />
            </Suspense>
        </main>
    );
}