import { BannerServer } from '@/components/landing/Banner.server'
import React from 'react'

function page() {
  return (
    <div className='flex flex-col items-center justify-center gap-28'>
      <BannerServer />
    </div>
  )
}

export default page