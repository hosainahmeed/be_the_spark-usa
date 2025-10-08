'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SectionTitleFormal from '@/components/component-layout/SectionTitleFormal';
import { Input } from '@/components/ui/input';
import JoditComponent from '@/components/ui/form-related/JoditComponent';
import { Label } from '@/components/ui/label';

interface RegistrationDetails {
    event_website: string;
    event_registration_fee?: string;
    description: string;
}

function RegistrationEventDetails({
    data,
    onUpdate,
    onValidationChange,
}: {
    data: RegistrationDetails;
    onUpdate: (data: RegistrationDetails) => void;
    onValidationChange: (isValid: boolean) => void;
}) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegistrationDetails>({
        defaultValues: data,
        mode: 'onChange'
    });

    const [content, setContent] = React.useState<string>(data?.description || '');
    const watchedValues = watch();

    // Validate all required fields
    useEffect(() => {
        const isValid = 
            watchedValues.event_website &&
            content.trim().length > 0;

        onValidationChange(!!isValid);
    }, [watchedValues, content, onValidationChange]);

    // Auto-update when fields change
    useEffect(() => {
        const subscription = watch((values: any) => onUpdate({ ...values, description: content }));
        return () => subscription.unsubscribe();
    }, [watch, content, onUpdate]);

    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };

    return (
        <div className="max-w-screen-xl mx-auto">
            <SectionTitleFormal
                title="Registration & Event Details"
                description="Provide all the important information about your event and how families can register."
                className="mb-8"
            />

            <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(() => { })}>
                <div>
                    <Label htmlFor="event_website">Event Website/Registration Link *</Label>
                    <Input
                        placeholder='e.g., "https://forms.gle/xyz123"'
                        id="event_website"
                        type="url"
                        {...register('event_website', { 
                            required: true,
                            pattern: {
                                value: /^https?:\/\/.+\..+/,
                                message: "Please enter a valid URL"
                            }
                        })}
                    />
                    {errors.event_website && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.event_website.type === 'required' 
                                ? 'Required' 
                                : 'Please enter a valid URL'
                            }
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="event_registration_fee">Event Registration Fee (Optional)</Label>
                    <Input
                        placeholder='e.g., "100"'
                        type="number"
                        id="event_registration_fee"
                        min="0"
                        step="0.01"
                        {...register('event_registration_fee', {
                            min: 0,
                            valueAsNumber: true
                        })}
                    />
                    {errors.event_registration_fee && (
                        <p className="text-red-500 text-sm mt-1">Fee must be a positive number</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="description">Describe About Your Event *</Label>
                    <JoditComponent 
                        content={content} 
                        setContent={handleContentChange} 
                    />
                    {!content.trim() && <p className="text-red-500 text-sm mt-1">Description required</p>}
                </div>
            </form>
        </div>
    );
}

export default RegistrationEventDetails;