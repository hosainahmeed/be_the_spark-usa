'use client'
import DiscoverBanner from '@/components/common/status-banner/DiscoverBanner'
import { BannerServer } from '@/components/landing/banner-related/Banner.server'
import FeaturedEvents from '@/components/landing/Featured Events/FeaturedEvents'
import HowToWork from '@/components/landing/how-to/HowToWork'
import OurImpact from '@/components/landing/Impact-section/OurImpact'
import PopularSportSection from '@/components/landing/Popular Sport/PopularSportSection'
import TestimonialCarousel from '@/components/landing/testimonials/TestimonialCarousel'
import React, { useEffect, useState } from 'react'

function page() {
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (localStorage) {
      const user = localStorage.getItem('user')
      const userInfo = user && JSON.parse(user)
      setUserInfo(userInfo)
    }
    setLoading(false)
  }, [])
  if (loading) {
    return <div className='h-screen bg-gray-200 animate-pulse'>
    </div>
  }
  return (
    <div className='flex flex-col items-center justify-center gap-16'>
      <BannerServer />
      {!userInfo && <HowToWork />}
      <FeaturedEvents />
      {userInfo ? <PopularSportSection /> : <TestimonialCarousel />}
      {!userInfo ? <OurImpact /> : <HowToWork />}
      <DiscoverBanner listbutton={!userInfo ? true : false} title="Discover Youth Sport Events Near You" description="From soccer camps to basketball tryouts — find the perfect event for your child in minutes." />

    </div>
  )
}

export default page