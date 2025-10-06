'use client'
import React from 'react'
import { CAMP_DATA } from '@/components/landing/Featured Events/FeaturedEvents'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MapPin, Mail, Phone, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AgeIcon, CalenderIcon, EventIcon, SaveIcon, ShareIcon, SlotIcon, SportIcon } from '@/components/events/custom.icons'
import SingleEventBanner from '@/components/events/SingleEventBanner'
import SingleEventTitleStatus from '@/components/events/SingleEventTitleStatus'
import UserFeedbackGivenSection from '@/components/events/UserFeedbackGivenSection'
import Image from 'next/image'
import { Card } from '@/components/ui/card'

function Page() {
    const { id } = useParams()
    const event = CAMP_DATA.find((item) => item.id === Number(id))

    if (!event) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold">Event not found</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-10 py-6">
            <SingleEventBanner event={event} />
            <SingleEventTitleStatus event={event} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border rounded-xl shadow-sm p-5">
                        <h2 className="text-lg font-semibold mb-4">About The Event</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-start gap-2">
                                <IconShader >
                                    <CalenderIcon />
                                </IconShader>
                                <div>
                                    <p className="font-medium">Registration Deadline</p>
                                    <p className="text-gray-600">{event.registrationDeadline}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <IconShader>
                                    <AgeIcon />
                                </IconShader>
                                <div>
                                    <p className="font-medium">Ages</p>
                                    <p className="text-gray-600">{event.ages}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <IconShader>
                                    <SportIcon />
                                </IconShader>
                                <div>
                                    <p className="font-medium">Sport</p>
                                    <p className="text-gray-600">{event.sport}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <IconShader>
                                    <SlotIcon />
                                </IconShader>
                                <div>
                                    <p className="font-medium">Available Slots</p>
                                    <p className="text-gray-600">{event.availableSlot}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <IconShader>
                                    <EventIcon />
                                </IconShader>
                                <div>
                                    <p className="font-medium">Event Type</p>
                                    <p className="text-gray-600">{event.eventType}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <IconShader>
                                    <CalenderIcon />
                                </IconShader>
                                <div>
                                    <p className="font-medium">Event Start On</p>
                                    <p className="text-gray-600">{event.eventStart}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border rounded-xl shadow-sm p-5">
                        <h2 className="text-lg font-semibold mb-4">Event Details</h2>
                        <div dangerouslySetInnerHTML={{ __html: event.eventDetails || '' }} />
                    </div>
                    {event?.isMyFeedbackGiven &&
                        <div>
                            <h1 className='text-lg font-semibold mb-4'>My feedback</h1>
                            <Card className='flex flex-row items-center gap-2 p-5'>
                                <Image
                                    src={event.feedbackData?.profilePhotoUrl || ''}
                                    alt="Profile"
                                    width={50}
                                    height={50}
                                    className='rounded-full overflow-hidden'
                                />
                                <div>
                                    <h1 className="font-semibold text-xl">{event.feedbackData?.name}</h1>
                                    <span className='flex items-center gap-1'>⭐ {" "} {event.feedbackData?.rating} / 5</span>
                                </div>
                            </Card>
                        </div>
                    }
                </div>
                <div>
                    <Card className='bg-[#FAF7F9] p-4'>
                        <div>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className="text-sm text-gray-500">Starts From</p>
                                    <p className="text-2xl font-bold">${event.price.toFixed(2)}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <IconShader className='cursor-pointer' onClick={() => { }}>
                                        <SaveIcon />
                                    </IconShader>
                                    <IconShader className='cursor-pointer' onClick={() => { }}>
                                        <ShareIcon />
                                    </IconShader>
                                </div>
                            </div>
                            <Button
                                className="mt-4 bg-[var(--blue)] rounded text-white hover:bg-[var(--blue)] hover:text-white cursor-pointer w-full"
                            >Go to Event Registration Link</Button>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2 className="text-lg font-semibold">Organizer Info</h2>
                            <div className="flex items-center gap-2 border border-gray-200 rounded-2xl p-2">
                                <Image
                                    src={event.organizer.avatarUrl}
                                    alt="Avatar"
                                    width={50}
                                    height={50}
                                    className='rounded-full overflow-hidden'
                                />
                                <div>
                                    <p className="font-black">Organized By: </p>
                                    <p>{event.organizer.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 border border-gray-200 rounded-2xl p-2">
                                <div className='bg-[#E6ECF5] rounded-full p-2'>
                                    <Star className="w-4 h-4 text-yellow-500" />
                                </div>
                                <div>
                                    <h1 className="font-black">Rating</h1>
                                    <p>{event.organizer.rating} ({event.organizer.reviewCount})</p>
                                </div>
                            </div>
                            <div
                                className="flex items-center gap-2 border border-gray-200 rounded-2xl p-2">
                                <div className='bg-[#E6ECF5] rounded-full p-2'>
                                    <Mail className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <h1 className="font-black">Contact Email</h1>
                                    <span>{event.contactEmail}</span>
                                </div>
                            </div>
                            <div
                                className="flex items-center gap-2 border border-gray-200 rounded-2xl p-2">
                                <div className='bg-[#E6ECF5] rounded-full p-2'>
                                    <Phone className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <h1 className="font-black">Contact Phone</h1>
                                    <span>{event.contactPhone}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                    {/* Location */}
                    <div className="mt-3">
                        <h2 className="text-lg font-semibold mb-3">Event Location</h2>
                        <div className='border border-gray-200 rounded-xl p-5'>
                            <div className="flex mb-3 items-start gap-2">
                                <div className="flex items-center gap-2 bg-[#E6ECF5] rounded-full p-2">
                                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                                </div>
                                <div>
                                    <p className="font-medium">Location</p>
                                    <p className="text-gray-600">{event.location}</p>
                                </div>
                            </div>
                            <iframe
                                src={`https://www.google.com/maps?q=${encodeURIComponent(
                                    event.location
                                )}&output=embed`}
                                width="100%"
                                height="200"
                                className="rounded-lg"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {!event?.isMyFeedbackGiven && <UserFeedbackGivenSection />}
                </div>
            </div>
        </div >
    )
}

export default Page


const IconShader = ({ children, onClick, className }: { children: React.ReactNode, onClick?: () => void, className?: string }) => {
    return (
        <div onClick={onClick} className={cn("flex items-center gap-2 bg-[#E6ECF5] rounded-full p-2", className)}>
            {children}
        </div>
    )
}
