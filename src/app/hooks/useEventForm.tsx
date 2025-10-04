'use client';
import { useState, useEffect } from 'react';

interface EventFormData {
    basics: any;
    dates: any;
    location: any;
    details: any;
}

export function useEventForm(totalSteps: number) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [formData, setFormData] = useState<EventFormData>({
        basics: {},
        dates: {},
        location: {},
        details: {},
    });
    const [showResumePrompt, setShowResumePrompt] = useState(false);

    useEffect(() => {

        const savedData = localStorage.getItem('eventFormData');
        const savedStep = localStorage.getItem('eventFormStep');
        if (savedData && savedStep) {
            setShowResumePrompt(true);
        }
    }, []);

    useEffect(() => {
        if (Object.keys(formData.basics).length > 0 ||
            Object.keys(formData.dates).length > 0 ||
            Object.keys(formData.location).length > 0 ||
            Object.keys(formData.details).length > 0) {
            localStorage.setItem('eventFormData', JSON.stringify(formData));
            localStorage.setItem('eventFormStep', currentIndex.toString());
        }
    }, [formData, currentIndex]);

    const updateFormData = (section: keyof EventFormData, data: any) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], ...data }
        }));
    };

    const nextStep = () => {
        if (currentIndex < totalSteps - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleResume = () => {
        const savedData = localStorage.getItem('eventFormData');
        const savedStep = localStorage.getItem('eventFormStep');
        if (savedData && savedStep) {
            try {
                setFormData(JSON.parse(savedData));
                setCurrentIndex(parseInt(savedStep));
            } catch (e) {

                console.error('Failed to parse saved event form data', e);
                localStorage.removeItem('eventFormData');
                localStorage.removeItem('eventFormStep');
                setFormData({ basics: {}, dates: {}, location: {}, details: {} });
                setCurrentIndex(0);
            }
        }
        setShowResumePrompt(false);
    };

    const handleStartFresh = () => {
        localStorage.removeItem('eventFormData');
        localStorage.removeItem('eventFormStep');
        setFormData({ basics: {}, dates: {}, location: {}, details: {} });
        setCurrentIndex(0);
        setShowResumePrompt(false);
    };

    const submitForm = () => {
        const isValid = validateAllSteps();

        if (isValid) {
            console.log('Final Form Data:', formData);
            localStorage.removeItem('eventFormData');
            localStorage.removeItem('eventFormStep');
            return true;
        }
        return false;
    };

    const validateAllSteps = () => {
        return true;
    };

    return {
        currentIndex,
        setCurrentIndex,
        formData,
        updateFormData,
        nextStep,
        prevStep,
        showResumePrompt,
        handleResume,
        handleStartFresh,
        submitForm,
    };
}