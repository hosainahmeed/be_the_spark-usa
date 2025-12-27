'use client'
import DiscoverBanner from '@/components/common/status-banner/DiscoverBanner'
import { BannerServer } from '@/components/landing/banner-related/Banner.server'
import FeaturedEvents from '@/components/landing/Featured Events/FeaturedEvents'
import HowToWork from '@/components/landing/how-to/HowToWork'
import OurImpact from '@/components/landing/Impact-section/OurImpact'
import PopularSportSection from '@/components/landing/Popular Sport/PopularSportSection'
import TestimonialCarousel from '@/components/landing/testimonials/TestimonialCarousel'
import React from 'react'
import { useMyProfile } from '../hooks/useMyProfile'
import MyFeatureEvenets from '@/components/landing/Featured Events/MyFeatureEvenets'

function page() {
  const { profile, isLoading, user } = useMyProfile()
  if (isLoading) {
    return <div className='h-screen bg-gray-200 animate-pulse'>
    </div>
  }
  return (
    <div className='flex flex-col items-center justify-center gap-16'>
      <BannerServer />
      {!profile && <HowToWork />}
      {user?.role === 'organizer' ? <MyFeatureEvenets /> : <FeaturedEvents />}
      {profile ? <PopularSportSection /> : <TestimonialCarousel />}
      {!profile ? <OurImpact /> : <HowToWork />}
      <DiscoverBanner
        redirectLink={!profile ? '/sign-in' : user?.role === 'organizer' ? '/list-events-organizer' : '/browse-events'}
        listbutton={!profile ? true : false}
        title={!profile ?
          "Discover Youth Sports Events Near You" :
          user?.role === 'organizer' ?
            "Share Your Sports Event With the Right Audience" :
            "Find the Right Sports Event for Your Child"}
        // title="Discover Youth Sport Events Near You"
        description={!profile ?
          "Explore tryouts, camps, and tournaments across multiple sports — no account required to start browsing." :
          user?.role === 'organizer' ?
            "Post tryouts, camps, and tournaments with all necessary details and reach families actively searching for sports opportunities." :
            "Get personalized event recommendations based on sport, age, and location — all in one place."}
        buttonText={user?.role === 'organizer' ? 'List Your Event' : 'Find Events Near You'}
      />
    </div>
  )
}

export default page