'use client'
import { CAMP_DATA } from '@/components/landing/Featured Events/FeaturedEvents'
import { useParams } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Calendar, Users, MapPin, Mail, Phone, Star } from 'lucide-react'

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
            {/* Banner */}
            <div
                style={{
                    backgroundImage: `url(${event.photoUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl shadow-lg">
                <div className='absolute md:block hidden top-0 left-0 w-full rounded-2xl h-full backdrop-blur-md opacity-50'></div>
                <div className='absolute md:block hidden -bottom-4 shadow-xl left-1/2 h-48 w-72 -translate-x-1/2 rounded-2xl overflow-hidden'>
                    <Image
                        src={event.photoUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Title + Status */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold">{event.title}</h1>
                    <p className="text-sm text-gray-500">
                        For ages {event.ages} | {event.eventType} | Hosted by {event.organizer}
                    </p>
                </div>
                <span
                    className={`px-4 py-1 text-sm font-medium rounded-full self-start md:self-auto ${event.status === 'registration-open'
                        ? 'bg-green-100 text-green-700'
                        : event.status === 'started-event'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                >
                    {event.status.replace('-', ' ')}
                </span>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* About the Event */}
                    <div className="bg-white border rounded-xl shadow-sm p-5">
                        <h2 className="text-lg font-semibold mb-4">About The Event</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-start gap-2">
                                <div className="flex items-center gap-2 bg-[#E6ECF5] rounded-full p-2">
                                    <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
                                </div>
                                <div>
                                    <p className="font-medium">Registration Deadline</p>
                                    <p className="text-gray-600">{event.registrationDeadline}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="flex items-center gap-2 bg-[#E6ECF5] rounded-full p-2">
                                    <Users className="w-4 h-4 text-gray-500 mt-0.5" />
                                </div>
                                <div>
                                    <p className="font-medium">Ages</p>
                                    <p className="text-gray-600">{event.ages}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="flex items-center gap-2 bg-[#E6ECF5] rounded-full p-2">
                                    <Users className="w-4 h-4 text-gray-500 mt-0.5" />
                                </div>
                                <div>
                                    <p className="font-medium">Sport</p>
                                    <p className="text-gray-600">{event.sport}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="flex items-center gap-2 bg-[#E6ECF5] rounded-full p-2">
                                    <Users className="w-4 h-4 text-gray-500 mt-0.5" />
                                </div>
                                <div>
                                    <p className="font-medium">Available Slots</p>
                                    <p className="text-gray-600">{event.availableSlot}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="flex items-center gap-2 bg-[#E6ECF5] rounded-full p-2">
                                    <Users className="w-4 h-4 text-gray-500 mt-0.5" />
                                </div>
                                <div>
                                    <p className="font-medium">Event Type</p>
                                    <p className="text-gray-600">{event.eventType}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="flex items-center gap-2 bg-[#E6ECF5] rounded-full p-2">
                                    <Users className="w-4 h-4 text-gray-500 mt-0.5" />
                                </div>
                                <div>
                                    <p className="font-medium">Event Start On</p>
                                    <p className="text-gray-600">{event.eventStart}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Event Details */}
                    <div className="bg-white border rounded-xl shadow-sm p-5">
                        <h2 className="text-lg font-semibold mb-4">Event Details</h2>
                        <div dangerouslySetInnerHTML={{ __html: event.eventDetails || '' }} />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Price & Register */}
                    <div className="bg-white border rounded-xl shadow-sm p-5">
                        <p className="text-sm text-gray-500">Starts From</p>
                        <p className="text-2xl font-bold">${event.price.toFixed(2)}</p>
                        <Button className="mt-4 w-full">Go to Event Registration</Button>
                    </div>

                    {/* Organizer Info */}
                    <div className="bg-white border rounded-xl shadow-sm p-5 space-y-3">
                        <h2 className="text-lg font-semibold">Organizer Info</h2>
                        <p><span className="font-medium">Organized By: </span>{event.organizer}</p>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{event.rating} ({event.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span>{event.contactEmail}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{event.contactPhone}</span>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="bg-white border rounded-xl shadow-sm p-5">
                        <h2 className="text-lg font-semibold mb-3">Event Location</h2>
                        <p className="text-gray-600 mb-2">{event.location}</p>

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
            </div>
        </div>
    )
}

export default Page
