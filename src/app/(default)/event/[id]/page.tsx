'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MapPin, Mail, Phone, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AgeIcon, CalenderIcon, EventIcon, SaveIcon, ShareIcon, SlotIcon, SportIcon } from '@/components/events/custom.icons'
import SingleEventBanner from '@/components/events/SingleEventBanner'
import SingleEventTitleStatus from '@/components/events/SingleEventTitleStatus'
import UserFeedbackGivenSection from '@/components/events/UserFeedbackGivenSection'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { useDeleteEventMutation, useGetSingleEventQuery } from '@/app/redux/service/eventApis'
import { EventDetails } from '@/types/event'
import { imageUrl } from '@/utils/imageHandler'
import { useMarkAsBookMarkMutation } from '@/app/redux/service/bookMarkApis'
import { toast } from 'sonner'
import { useMyProfile } from '@/app/hooks/useMyProfile'
import { FaEdit } from 'react-icons/fa'


function Page() {
    const { id } = useParams()
    const { data: event, isLoading } = useGetSingleEventQuery(id as string, { skip: !id })
    const [markBook, { isLoading: bookMarkLoading }] = useMarkAsBookMarkMutation()
    const [deleteEvent, { isLoading: eventDeleting }] = useDeleteEventMutation()
    const { user } = useMyProfile()
    const router = useRouter()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold">Event loading...</p>
            </div>
        )
    }

    if (!event?.data) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold">Event not found</p>
            </div>
        )
    }
    const eventData: EventDetails = event?.data && event?.data;

    if (!event) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold">Event not found</p>
            </div>
        )
    }

    const handleShare = (event: EventDetails) => {
        if (navigator.share) {
            navigator.share({
                title: event?.name || "Event",
                text: "Check this out!",
                url: window.location.href,
            });
        } else {
            alert("Share not supported on this device");
        }
    };

    const handleEventBookMark = async (id: string) => {
        try {
            if (!id) {
                throw new Error('Event Id is invalid!')
            }
            const res = await markBook(id).unwrap()
            if (!res?.success) {
                throw new Error(res?.message || '')
            }
            toast.dismiss()
            toast.success(res?.message)
        } catch (error: any) {
            toast.dismiss()
            toast.error(error?.data?.message || error?.message || 'something went wrong while ')
        }
    }

    const handlerEventDelete = async (id: string) => {
        try {
            if (!id) {
                throw new Error("ID is not found for this event!")
            }
            const res = await deleteEvent(id).unwrap()
            if (!res?.success) {
                throw new Error(res?.message)
            }
            toast.success(res?.message)
            router.push("/my-events")
        } catch (error: any) {
            const errorMessage = error?.data?.message || error?.message || "somthing went wrong!"
            toast.error(errorMessage)
        }

    }

    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-10 py-6">
            <SingleEventBanner event={eventData} />
            <SingleEventTitleStatus event={eventData} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border rounded-xl shadow-sm p-5">
                        <h2 className="text-lg font-semibold mb-4">About The Event</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-start gap-2">
                                <IconShader>
                                    <CalenderIcon />
                                </IconShader>
                                <div>
                                    <p className="font-medium">Event Start On</p>
                                    <time className="text-gray-600">{new Date(eventData?.eventStartDateTime).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}</time>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <IconShader>
                                    <AgeIcon />
                                </IconShader>
                                <div>
                                    <p className="font-medium">Ages</p>
                                    <p className="text-gray-600">{eventData?.minAge} min - {eventData?.maxAge} max</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <IconShader>
                                    <SportIcon />
                                </IconShader>
                                <div>
                                    <p className="font-medium">Sport</p>
                                    <p className="text-gray-600">{eventData?.sport?.name}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <IconShader>
                                    <SlotIcon />
                                </IconShader>
                                <div>
                                    <p className="font-medium">Available Slots</p>
                                    <p className="text-gray-600">{eventData?.availableSlot}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <IconShader>
                                    <EventIcon />
                                </IconShader>
                                <div>
                                    <p className="font-medium">Event Type</p>
                                    <p className="text-gray-600">{eventData?.eventType?.type}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <IconShader >
                                    <CalenderIcon />
                                </IconShader>
                                <div>
                                    <p className="font-medium">Registration Deadline</p>
                                    <time className="text-gray-600">{new Date(eventData?.registrationEndDateTime).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}</time>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border rounded-xl shadow-sm p-5">
                        <h2 className="text-lg font-semibold mb-4">Event Details</h2>
                        <div dangerouslySetInnerHTML={{ __html: eventData?.description || '' }} />
                    </div>
                    {event?.isMyFeedbackGiven &&
                        <div>
                            <h1 className='text-lg font-semibold mb-4'>My feedback</h1>
                            <Card className='flex flex-row items-center gap-2 p-5'>
                                <Image
                                    src={event?.feedbackData?.profilePhotoUrl || ''}
                                    alt="Profile"
                                    width={50}
                                    height={50}
                                    className='rounded-full overflow-hidden'
                                />
                                <div>
                                    <h1 className="font-semibold text-xl">{event?.feedbackData?.name}</h1>
                                    <span className='flex items-center gap-1'>⭐ {" "} {event?.feedbackData?.rating} / 5</span>
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
                                    <p className="text-2xl font-bold">${eventData?.registrationFee}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    {user?.role !== 'organizer' && <IconShader className={`cursor-pointer ${eventData?.isBookmark ? "bg-[var(--blue)]" : ""}`} onPointerDown={() => {
                                        if (!bookMarkLoading) {
                                            handleEventBookMark(eventData?._id)
                                        }
                                    }}>
                                        {bookMarkLoading ?
                                            <div className="w-5 h-5 border-red-400 rounded-full animate-spin border-t border-l"></div>
                                            :
                                            <SaveIcon stroke={`${eventData?.isBookmark ? '#fff' : '#002868'}`} />
                                        }
                                    </IconShader>}
                                    <IconShader className='cursor-pointer' onPointerDown={() => handleShare(eventData)}>
                                        <ShareIcon />
                                    </IconShader>
                                </div>
                            </div>
                            <Button
                                onPointerDown={() => window.open(eventData?.websiteLink, '_blank')}
                                className="mt-4 bg-[var(--blue)] rounded text-white hover:bg-[var(--blue)] hover:text-white cursor-pointer w-full"
                            >Go to Event Registration Link</Button>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2 className="text-lg font-semibold">Organizer Info</h2>
                            <div className="flex items-center gap-2 border border-gray-200 rounded-2xl p-2">
                                <Image
                                    src={imageUrl({ image: eventData?.organizer?.profile_image })}
                                    alt="Avatar"
                                    width={50}
                                    height={50}
                                    className='rounded-full w-12 h-12 object-cover overflow-hidden'
                                />
                                <div>
                                    <p className="font-black">Organized By: </p>
                                    <p>{eventData?.organizer?.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 border border-gray-200 rounded-2xl p-2">
                                <div className='bg-[#E6ECF5] rounded-full p-2'>
                                    <Star className="w-4 h-4 text-yellow-500" />
                                </div>
                                <div>
                                    <h1 className="font-black">Rating</h1>
                                    <p>{eventData?.averageRating} ({eventData?.totalRating || 0})</p>
                                </div>
                            </div>
                            <div
                                className="flex items-center gap-2 border border-gray-200 rounded-2xl p-2">
                                <div className='bg-[#E6ECF5] rounded-full p-2'>
                                    <Mail className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <h1 className="font-black">Contact Email</h1>
                                    <span>{eventData?.organizer?.email}</span>
                                </div>
                            </div>
                            <div
                                className="flex items-center gap-2 border border-gray-200 rounded-2xl p-2">
                                <div className='bg-[#E6ECF5] rounded-full p-2'>
                                    <Phone className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <h1 className="font-black">Contact Phone</h1>
                                    <span>{eventData?.organizer?.phone}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="mt-3">
                        <h2 className="text-lg font-semibold mb-3">Event Location</h2>
                        <div className='border border-gray-200 rounded-xl p-5'>
                            <div className="flex mb-3 items-start gap-2">
                                <div className="flex items-center gap-2 bg-[#E6ECF5] rounded-full p-2">
                                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                                </div>
                                <div>
                                    <p className="font-medium">Location</p>
                                    <p className="text-gray-600">{eventData?.address}</p>
                                </div>
                            </div>
                            <iframe
                                src={`https://www.google.com/maps?q=${encodeURIComponent(
                                    eventData?.address
                                )}&output=embed`}
                                width="100%"
                                height="200"
                                className="rounded-lg"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {user?.role !== 'organizer' &&
                        event?.data?.ratingData ?
                        <Card style={{ width: '100%', marginTop: 20 }} className="flex flex-col p-6">
                            <h1>My Feedback</h1>
                            <div className='flex items-center gap-4'>
                                <div className="border-2 overflow-hidden rounded-full w-12 h-12 ">
                                    <Image
                                        width={40}
                                        height={40}
                                        src={imageUrl({ image: event?.data?.ratingData?.user?.profile_image })}
                                        alt={event?.data?.ratingData?.user?.name}
                                        className='object-cover w-full h-full'
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-semibold'>{event?.data?.ratingData?.user?.name}</p>
                                    <p className='text-sm text-gray-500'>Rating :{event?.data?.ratingData?.rating}</p>
                                </div>
                            </div>
                        </Card>
                        : <UserFeedbackGivenSection eventData={eventData} />}
                </div>
            </div>
            {user?.role === 'organizer' && (
                <div className='flex items-center gap-2'>
                    <Button
                        onPointerDown={() => handlerEventDelete(id as string)}
                        className="mt-4 bg-white rounded text-red-500 border border-red-500 hover:border-[var(--blue)] hover:bg-[var(--blue)] hover:text-white cursor-pointer px-6">
                        {eventDeleting ? "Deleting..." : "Delete"}</Button>
                    <Button
                        onPointerDown={() => router.push(`/list-events-organizer?id=${id}`)}
                        className="mt-4 bg-[var(--blue)] rounded text-white hover:bg-[var(--blue)] hover:text-white cursor-pointer px-6"><FaEdit /> Edit</Button>
                </div>
            )}
        </div >
    )
}

export default Page


const IconShader = ({ children, onPointerDown, className }: { children: React.ReactNode, onPointerDown?: () => void, className?: string }) => {
    return (
        <div onPointerDown={onPointerDown} className={cn("flex items-center gap-2 bg-[#E6ECF5] rounded-full p-2", className)}>
            {children}
        </div>
    )
}
