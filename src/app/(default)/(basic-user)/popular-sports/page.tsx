import PageTopBanner from '@/components/common/status-banner/PageTopBanner'
import SectionLayout from '@/components/component-layout/SectionLayout'
import { sportData } from '@/components/landing/Popular Sport/PopularSportSection'
import SportCategoryCard from '@/components/landing/Popular Sport/SportCategoryCard'
import React from 'react'

function page() {
  return (
    <div>
      <PageTopBanner
        title='Popular Sports'
        description='The sports families are searching for most — find events in one click.' />

      <SectionLayout className='my-12'>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {sportData.map((item, index) => (
            <SportCategoryCard key={index} title={item.title} background={item.background} icon={item.icon} />
          ))}
        </div>
      </SectionLayout>
    </div>
  )
}

export default page