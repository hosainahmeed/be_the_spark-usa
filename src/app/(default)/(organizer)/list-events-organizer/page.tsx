'use client'
import React from 'react'
import ImageUpload from '@/components/orgnizer-event-list/ImageUpload'
import SectionLayout from '@/components/component-layout/SectionLayout';
import DatePickerCustom from '@/components/orgnizer-event-list/DatePickerCustom';
import FieldCheckerForCreateEvent from '@/components/orgnizer-event-list/create-steps-event/FieldCheckerForCreateEvent';
import EventBasics from '@/components/orgnizer-event-list/create-steps-event/EventBasics';
import ParticipantsLocation from '@/components/orgnizer-event-list/create-steps-event/ParticipantsLocation';
import RegistrationEventDetails from '@/components/orgnizer-event-list/create-steps-event/RegistrationEventDetails';


function page() {
  const [file, setFile] = React.useState<File | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  return (
    <SectionLayout className='mt-20'>
      <FieldCheckerForCreateEvent index={currentIndex} setCurrentIndex={setCurrentIndex}>
        <EventBasics />
        <ParticipantsLocation />
        <RegistrationEventDetails />
      </FieldCheckerForCreateEvent>
    </SectionLayout>
  )
}

export default page
