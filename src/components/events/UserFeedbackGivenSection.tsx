'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { X, Star } from 'lucide-react'
import { toast } from 'sonner'
import { EventDetails } from '@/types/event'
import { useGiveRatingMutation } from '@/app/redux/service/ratingApis'
import { useGetOrganizerQuery } from '@/app/redux/service/organizerRatingApis'
import { Card } from 'antd'

interface FeedbackFormData {
    rating: number
}

function UserFeedbackGivenSection({ eventData }: { eventData: EventDetails }) {
    const { data, isLoading } = useGetOrganizerQuery(eventData?.organizer?._id as string, { skip: !eventData?.organizer?._id })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState<FeedbackFormData>({
        rating: 0,
    })

    const [hoveredRating, setHoveredRating] = useState(0)
    const [giveRating, { isLoading: ratingLoading }] = useGiveRatingMutation()

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => {
        setIsModalOpen(false)
        setFormData({ rating: 0 })
        setHoveredRating(0)
    }

    const handleRatingClick = (rating: number) => {
        setFormData(prev => ({ ...prev, rating }))
    }

    const handleRatingHover = (rating: number) => {
        setHoveredRating(rating)
    }

    const handleRatingLeave = () => {
        setHoveredRating(0)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.rating === 0) {
            toast.error('Please select a rating')
            return
        }

        try {
            const data = {
                event: eventData?._id,
                rating: formData?.rating
            }
            const res = await giveRating(data).unwrap()
            if ('success' in res && !res?.success) {
                throw new Error(res?.message)
            }
            toast.success('Thank you for your feedback!', {
                description: 'Your review has been submitted successfully.',
                duration: 4000,
            })
            handleCloseModal()

        } catch (error: any) {
            console.error('Error submitting feedback:', error)
            toast.error(error?.data?.message || error?.message || 'Failed to submit feedback. Please try again.')
        }
    }


    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => {
            const starNumber = index + 1
            const isFilled = starNumber <= (hoveredRating || formData.rating)

            return (
                <button
                    key={starNumber}
                    type="button"
                    className="p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
                    onPointerDown={() => handleRatingClick(starNumber)}
                    onMouseEnter={() => handleRatingHover(starNumber)}
                    onMouseLeave={handleRatingLeave}
                    disabled={ratingLoading}
                >
                    <Star
                        className={`w-8 h-8 ${isFilled
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                            } transition-colors duration-200`}
                    />
                </button>
            )
        })
    }
    if (isLoading) {
        return (
            <Card loading />
        )
    }
    return (
        <div>
            <Button
                onPointerDown={handleOpenModal}
                className="mt-4 bg-[var(--blue)] rounded text-white hover:bg-[var(--blue)] hover:text-white cursor-pointer w-full"
            >
                Give Feedback
            </Button>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h1 className="text-xl font-semibold text-gray-900">Leave Feedback</h1>
                            <button
                                onPointerDown={handleCloseModal}
                                disabled={ratingLoading}
                                className="cursor-pointer bg-[var(--blue)] rounded-full p-2 w-8 h-8 flex items-center justify-center text-white hover:bg-[var(--blue)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Organizer Info */}
                        <div className="p-6 border-b flex justify-between border-gray-200">
                            <div className="mb-2">
                                <span className="text-sm font-medium text-gray-600">Organized By</span>
                                <p className="text-lg font-semibold text-gray-900">{data?.data?.name || "N/A"}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-600">Ratings</span>
                                <p className="text-lg font-semibold text-gray-900">{data?.data?.averageRating} ({data?.data?.totalRatings})</p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6">
                            {/* Rating Section */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-4">
                                    How was your experience attending this event?
                                </label>

                                {/* Star Rating */}
                                <div className="flex justify-center space-x-1 mb-4">
                                    {renderStars()}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={ratingLoading || formData.rating === 0}
                                className="w-full rounded bg-[var(--blue)] hover:bg-[var(--blue)] text-white font-semibold py-3 px-4 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {ratingLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Submitting...
                                    </div>
                                ) : (
                                    'Submit Feedback'
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserFeedbackGivenSection