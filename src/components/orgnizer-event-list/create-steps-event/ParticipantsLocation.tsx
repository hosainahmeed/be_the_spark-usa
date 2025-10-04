'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SectionTitleFormal from '@/components/component-layout/SectionTitleFormal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LocationData {
  age_group: string;
  skill_level: string;
  available_slots: number | string;
  zip_code: string;
  location_name: string;
  city_state: string;
}

function ParticipantsLocation({
  data,
  onUpdate,
  onValidationChange,
}: {
  data: LocationData;
  onUpdate: (data: LocationData) => void;
  onValidationChange: (isValid: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LocationData>({
    defaultValues: data,
    mode: 'onChange'
  });

  const watchedValues = watch();

  // Validate all required fields
  useEffect(() => {
    const isValid = 
      watchedValues.age_group &&
      watchedValues.skill_level &&
      watchedValues.available_slots &&
      watchedValues.zip_code &&
      watchedValues.location_name &&
      watchedValues.city_state;

    onValidationChange(!!isValid);
  }, [watchedValues, onValidationChange]);

  // Auto-update parent when values change
  useEffect(() => {
    const subscription = watch((values: any) => onUpdate(values));
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  return (
    <div className="max-w-screen-xl mx-auto">
      <SectionTitleFormal
        className="mb-8"
        title="Participants & Location"
        description="Define your target audience and event venue."
      />
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit(() => { })}>
        <div>
          <Label htmlFor="age_group">Age Group *</Label>
          <Select 
            value={data.age_group} 
            onValueChange={(v) => setValue('age_group', v, { shouldValidate: true })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Age Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-age">All Age</SelectItem>
              <SelectItem value="kids">Kids (5–12)</SelectItem>
              <SelectItem value="teens">Teens (13–18)</SelectItem>
              <SelectItem value="adults">Adults (18+)</SelectItem>
            </SelectContent>
          </Select>
          {errors.age_group && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div>
          <Label htmlFor="skill_level">Skill Level *</Label>
          <Select 
            value={data.skill_level} 
            onValueChange={(v) => setValue('skill_level', v, { shouldValidate: true })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Skill Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-skill-level">All Skill Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          {errors.skill_level && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div>
          <Label htmlFor="available_slots">Available Slots *</Label>
          <Input
            type="number"
            id="available_slots"
            placeholder='e.g., "10"'
            min="1"
            {...register('available_slots', { 
              required: true,
              min: 1,
              valueAsNumber: true 
            })}
          />
          {errors.available_slots && <p className="text-red-500 text-sm mt-1">Required (minimum 1)</p>}
        </div>

        <div>
          <Label htmlFor="zip_code">Zip Code *</Label>
          <Input
            type="text"
            id="zip_code"
            placeholder='e.g., "90027"'
            {...register('zip_code', { 
              required: true,
              pattern: /^\d{5}(-\d{4})?$/
            })}
          />
          {errors.zip_code && <p className="text-red-500 text-sm mt-1">Valid zip code required</p>}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="location_name">Location Name / Venue *</Label>
          <Input
            type="text"
            id="location_name"
            placeholder='e.g., "Griffith Park Fields"'
            {...register('location_name', { required: true })}
          />
          {errors.location_name && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="city_state">City / State *</Label>
          <Input
            type="text"
            id="city_state"
            placeholder='e.g., "Los Angeles, CA"'
            {...register('city_state', { required: true })}
          />
          {errors.city_state && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>
      </form>
    </div>
  );
}

export default ParticipantsLocation;