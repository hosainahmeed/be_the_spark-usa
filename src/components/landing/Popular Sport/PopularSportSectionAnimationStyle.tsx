'use client'
import React from 'react'
import { motion } from 'framer-motion'

function PopularSportSectionAnimationStyle() {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full h-full pointer-events-none -z-1'>
      <div className='w-full h-full bg-[var(--blue)]/10 z-10 pointer-events-none'></div>
    </motion.div>
  )
}

export default PopularSportSectionAnimationStyle