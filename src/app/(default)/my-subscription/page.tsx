'use client';

import { useGetMyProfileQuery } from '@/app/redux/service/profileApis';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

// Skeleton Loader Component
const SubscriptionSkeleton = () => (
    <div className="w-full max-w-4xl my-12 h-screen mx-auto space-y-6">
        <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((item) => (
                <Card key={item} className="border border-gray-100 rounded-lg shadow-sm">
                    <CardContent className="p-6">
                        <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-6 w-36 bg-gray-100 rounded animate-pulse" />
                    </CardContent>
                </Card>
            ))}
        </div>
        <div className="h-12 w-48 bg-gray-200 rounded animate-pulse" />
    </div>
);

// Error Component
const ErrorMessage = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
    <div className="text-center py-10">
        <p className="text-red-500 mb-4">{message}</p>
        <Button onClick={onRetry} variant="outline">
            Try Again
        </Button>
    </div>
);

// Format date with timezone consideration
const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC' // Ensure consistent date display
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid date';
    }
};

const SubscriptionPage = () => {
    const router = useRouter();
    const {
        data: profileData,
        isLoading,
        isError,
        refetch
    } = useGetMyProfileQuery({});

    const subscriptionData = useMemo(() => ({
        lastPurchaseDate: formatDate(profileData?.data?.lastPurchaseDate),
        expiryDate: formatDate(profileData?.data?.annualAccessExpiryDate),
        isExpired: profileData?.data?.annualAccessExpiryDate
            ? new Date(profileData.data.annualAccessExpiryDate) < new Date()
            : true,
    }), [profileData]);

    const handleBack = () => router.back();
    const handleRenew = () => router.push('/subscription-renew');

    if (isLoading) return <SubscriptionSkeleton />;
    if (isError) return <ErrorMessage message="Failed to load subscription data" onRetry={refetch} />;

    return (
        <main className="min-h-[calc(100vh-200px)] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={handleBack}
                    className="flex items-center text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors mb-8"
                    aria-label="Go back to previous page"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    My Subscription
                </button>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    Last Purchase Date
                                </h2>
                                <p className="text-gray-600">
                                    {subscriptionData.lastPurchaseDate}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    Subscription {subscriptionData.isExpired ? 'Expired' : 'Expires'}
                                </h2>
                                <p
                                    className={`text-lg font-medium ${subscriptionData.isExpired ? 'text-red-500' : 'text-gray-600'
                                        }`}
                                >
                                    {subscriptionData.expiryDate}
                                    {subscriptionData.isExpired && (
                                        <span className="ml-2 text-sm text-red-500">(Expired)</span>
                                    )}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                            onClick={handleRenew}
                            className='w-fit rounded px-12 cursor-pointer py-5 self-start bg-[var(--blue)] text-white hover:bg-[var(--blue)]'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Renew Subscription'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default React.memo(SubscriptionPage);