import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import SocialIcons from '@/components/ui/SocialIcons';
import ContactForm from '@/components/ui/ContactForm';
import { IMAGE } from '../../../../public/assets/image/index.image';
import PageTopBanner from '@/components/common/status-banner/PageTopBanner';
export const metadata: Metadata = {
    title: 'Contact Us',
};
function ContactPage() {
    return (
        <div className="min-h-dvh">
            <PageTopBanner title='Contact Us' description='The Sport families are searching for most — find events in one click.' />
            <div className="container mx-auto px-4 py-8">
                <div className="grid bg-white shadow-lg rounded-2xl lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
                    {/* Left Sidebar - Green Section */}
                    <div className="lg:col-span-4 p-8 rounded-l-lg lg:rounded-r-none rounded-r-lg relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full">
                            <Image
                                src={IMAGE.contactImage}
                                alt="Contact Background"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                            />
                        </div>
                        <div className="absolute bottom-6 left-6">
                            <h1 className="text-white text-xl mb-3 font-semibold">
                                Follow Us On
                            </h1>
                            <SocialIcons />
                        </div>
                    </div>

                    {/* Right Content - Form Section */}
                    <div className="lg:col-span-8 bg-white p-8 rounded-r-lg lg:rounded-l-none rounded-l-lg">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Contact Us
                            </h2>
                            <p className="text-gray-600 mb-8">
                                The Sport families are searching for most — find events in one click.
                            </p>

                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;