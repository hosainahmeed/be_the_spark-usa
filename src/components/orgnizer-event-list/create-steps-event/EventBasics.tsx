'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SectionTitleFormal from '@/components/component-layout/SectionTitleFormal';
import ImageUpload from '../ImageUpload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EventTypes, SportOptions } from '@/constants/constantsOptions';

interface BasicsData {
    event_name: string;
    event_short_description: string;
    sport: string;
    event_type: string;
    image?: File | null;
}

function EventBasics({
    data,
    onUpdate,
    onValidationChange
}: {
    data: BasicsData;
    onUpdate: (data: BasicsData) => void;
    onValidationChange: any;
}) {
    const { register, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm<BasicsData>({
        defaultValues: data,
        mode: 'onChange'
    });

    const [file, setFile] = React.useState<File | null>(data?.image || null);

    const watchedValues = watch();


    useEffect(() => {
        const isFormValid =
            watchedValues.event_name &&
            watchedValues.event_short_description &&
            watchedValues.sport &&
            watchedValues.event_type &&
            file !== null;

        onValidationChange(isFormValid);
    }, [watchedValues, file, onValidationChange]);

    useEffect(() => {
        const subscription = watch((values: any) => onUpdate({ ...values, image: file }));
        return () => subscription.unsubscribe();
    }, [watch, file, onUpdate]);

    return (
        <div className="max-w-screen-xl mx-auto">
            <SectionTitleFormal
                className="mb-8"
                title="Event Basics"
                description="Provide essential information so families can quickly understand your event."
            />
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(() => { })}>
                <ImageUpload
                    title="Event Image"
                    file={file}
                    setFile={setFile}
                    required
                />

                <div>
                    <Label htmlFor="event_name">Event Name *</Label>
                    <Input
                        placeholder='e.g., "Summer Elite Soccer Camp 2025"'
                        {...register('event_name', { required: true })}
                    />
                    {errors.event_name && <p className="text-red-500 text-sm mt-1">Event Name is required</p>}
                </div>

                <div>
                    <Label htmlFor="event_short_description">Event Short Description *</Label>
                    <Input
                        placeholder='e.g., "A 3-day intensive camp for players aged 10–14"'
                        {...register('event_short_description', { required: true })}
                    />
                    {errors.event_short_description && <p className="text-red-500 text-sm mt-1">Short Description required</p>}
                </div>

                <div>
                    <Label>Sport *</Label>
                    <Select
                        value={data.sport}
                        onValueChange={(v) => setValue('sport', v, { shouldValidate: true })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Sport Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {SportOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.sport && <p className="text-red-500 text-sm mt-1">Sport is required</p>}
                </div>

                <div>
                    <Label>Event Type *</Label>
                    <Select
                        value={data.event_type}
                        onValueChange={(v) => setValue('event_type', v, { shouldValidate: true })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Event Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {EventTypes.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.event_type && <p className="text-red-500 text-sm mt-1">Event Type is required</p>}
                </div>
            </form>
        </div>
    );
}

export default EventBasics;