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

function page() {
  const { profile, isLoading } = useMyProfile()
  if (isLoading) {
    return <div className='h-screen bg-gray-200 animate-pulse'>
    </div>
  }
  return (
    <div className='flex flex-col items-center justify-center gap-16'>
      <BannerServer />
      {!profile && <HowToWork />}
      <FeaturedEvents />
      {profile ? <PopularSportSection /> : <TestimonialCarousel />}
      {!profile ? <OurImpact /> : <HowToWork />}
      <DiscoverBanner
        listbutton={!profile ? true : false}
        title="Discover Youth Sport Events Near You"
        description="From soccer camps to basketball tryouts — find the perfect event for your child in minutes." />
    </div>
  )
}

export default page