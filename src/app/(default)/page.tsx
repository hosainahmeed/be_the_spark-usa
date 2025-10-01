import DiscoverBanner from '@/components/common/status-banner/DiscoverBanner'
import PageTopBanner from '@/components/common/status-banner/PageTopBanner'
import { BannerServer } from '@/components/landing/banner-related/Banner.server'
import FeaturedEvents from '@/components/landing/Featured Events/FeaturedEvents'
import HowToWork from '@/components/landing/how-to/HowToWork'
import OurImpact from '@/components/landing/Impact-section/OurImpact'
import PopularSportSection from '@/components/landing/Popular Sport/PopularSportSection'
import React from 'react'

function page() {
  return (
    <div className='flex flex-col items-center justify-center gap-16'>
      <BannerServer />
      <HowToWork />
      <FeaturedEvents />
      <OurImpact />
      <PopularSportSection />
      <DiscoverBanner />
      
    </div>
  )
}

export default page