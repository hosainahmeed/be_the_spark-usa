'use client'
import { useGetCategoryQuery } from '@/app/redux/service/categoryApis'
import PageTopBanner from '@/components/common/status-banner/PageTopBanner'
import SectionLayout from '@/components/component-layout/SectionLayout'
import { backgroundImage } from '@/components/landing/Popular Sport/PopularSportSection'
import SportCategoryCard from '@/components/landing/Popular Sport/SportCategoryCard'
import { SportCategory } from '@/types/categoryApis'
import React, { useMemo } from 'react'

function page() {
  const { data, isLoading } = useGetCategoryQuery({ type: 'sports' })

  const randomBackgrounds = useMemo(() => {
    if (!data?.data?.result) return [];
    return data.data.result.map(() => {
      const random = Math.floor(Math.random() * backgroundImage.length);
      return backgroundImage[random];
    });
  }, [data?.data?.result]);

  return (
    <div>
      <PageTopBanner
        title='Popular Sports'
        description='The sports families are searching for most — find events in one click.' />

      <SectionLayout className='my-12'>
        {isLoading ?
          <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-gray-300 h-20 rounded w-full p-2 animate-pulse" />
              ))}
            </div>
          </div>
          :
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {data?.data?.result.map((item: SportCategory, index: number) => (
              <SportCategoryCard
                key={index}
                title={item.name}
                background={randomBackgrounds[index]}
                icon={item.category_image}
              />
            ))}
          </div>}
      </SectionLayout>
    </div>
  )
}

export default page