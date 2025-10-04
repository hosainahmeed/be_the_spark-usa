'use client';
import SectionTitleFormal from '@/components/component-layout/SectionTitleFormal';
import React, { useEffect, useState } from 'react'
import DatePickerCustom from '../DatePickerCustom'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form';

interface DatesData {
  registration_start_date?: Date;
  registration_end_date?: Date;
  registration_time?: string;
  event_start_date?: Date;
  event_start_time?: string;
  event_end_date?: Date;
  event_end_time?: string;
}

function EventDatesRegistration({ 
  data, 
  onUpdate,
  onValidationChange 
}: { 
  data: any; 
  onUpdate: (data: DatesData) => void;
  onValidationChange: (isValid: boolean) => void;
}) {
  const { register, watch, setValue, formState: { errors } } = useForm<DatesData>({
    defaultValues: data,
    mode: 'onChange'
  });

  const [currentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const watchedValues = watch();


  useEffect(() => {
    const isValid = 
      watchedValues.registration_start_date &&
      watchedValues.registration_end_date &&
      watchedValues.registration_time &&
      watchedValues.event_start_date &&
      watchedValues.event_start_time &&
      watchedValues.event_end_date &&
      watchedValues.event_end_time;

    onValidationChange(!!isValid);
  }, [watchedValues, onValidationChange]);


  useEffect(() => {
    const subscription = watch((values: any) => onUpdate(values));
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  const handleFieldChange = (field: keyof DatesData, value: any) => {
    setValue(field, value, { shouldValidate: true });
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <SectionTitleFormal
        className='mb-8'
        title="Event Dates & Registration"
        description='Set the timeline for registration and the event itself.' 
      />
      <form className='grid grid-cols-1 md:grid-cols-2 gap-4' onSubmit={(e) => e.preventDefault()}>
        <div className='md:col-span-2'>
          <Label htmlFor="registration_start_date">Registration Start Date *</Label>
          <DatePickerCustom 
            date={data?.registration_start_date} 
            setDate={(value) => handleFieldChange('registration_start_date', value)} 
          />
          {errors.registration_start_date && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div>
          <Label htmlFor="registration_end_date">Registration End Date *</Label>
          <DatePickerCustom 
            date={data?.registration_end_date} 
            setDate={(value) => handleFieldChange('registration_end_date', value)} 
          />
          {errors.registration_end_date && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div>
          <Label htmlFor="registration_time">Registration Time *</Label>
          <Input
            type="time"
            className='bg-[#FFFFFF]'
            id="registration_time"
            defaultValue={data?.registration_time || currentTime}
            {...register('registration_time', { required: true })}
          />
          {errors.registration_time && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div>
          <Label htmlFor="event_start_date">Event Start Date *</Label>
          <DatePickerCustom 
            date={data?.event_start_date} 
            setDate={(value) => handleFieldChange('event_start_date', value)} 
          />
          {errors.event_start_date && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div>
          <Label htmlFor="event_start_time">Event Start Time *</Label>
          <Input
            type="time"
            className='bg-[#FFFFFF]'
            id="event_start_time"
            defaultValue={data?.event_start_time || currentTime}
            {...register('event_start_time', { required: true })}
          />
          {errors.event_start_time && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div>
          <Label htmlFor="event_end_date">Event End Date *</Label>
          <DatePickerCustom 
            date={data?.event_end_date} 
            setDate={(value) => handleFieldChange('event_end_date', value)} 
          />
          {errors.event_end_date && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div>
          <Label htmlFor="event_end_time">Event End Time *</Label>
          <Input
            type="time"
            className='bg-[#FFFFFF]'
            id="event_end_time"
            defaultValue={data?.event_end_time || currentTime}
            {...register('event_end_time', { required: true })}
          />
          {errors.event_end_time && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>
      </form>
    </div>
  );
};

export default EventDatesRegistration;