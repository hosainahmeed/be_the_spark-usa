import type { Metadata } from "next";
import { NavigationMenuBar } from "@/components/common/NavigationMenuBar";
import Footer from "@/components/common/footer/Footer";

export const metadata: Metadata = {
    title: {
        default: "play Finder USA",
        template: "%s | play Finder USA"
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavigationMenuBar />
            {children}
            <Footer />
        </>
    );
}
