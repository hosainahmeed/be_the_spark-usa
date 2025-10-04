'use client';
import React, { useState } from 'react';
import SectionLayout from '@/components/component-layout/SectionLayout';
import FieldCheckerForCreateEvent from '@/components/orgnizer-event-list/create-steps-event/FieldCheckerForCreateEvent';
import EventBasics from '@/components/orgnizer-event-list/create-steps-event/EventBasics';
import ParticipantsLocation from '@/components/orgnizer-event-list/create-steps-event/ParticipantsLocation';
import RegistrationEventDetails from '@/components/orgnizer-event-list/create-steps-event/RegistrationEventDetails';
import EventDatesRegistration from '@/components/orgnizer-event-list/create-steps-event/EventDatesRegistration';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEventForm } from '@/app/hooks/useEventForm';

export default function Page() {
  const {
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
  } = useEventForm(4);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  const steps = [
    <EventBasics
      key="step1"
      data={formData.basics || {}}
      onUpdate={v => updateFormData('basics', v)}
      onValidationChange={setCanProceed}
    />,
    <EventDatesRegistration
      key="step2"
      data={formData.dates || {}}
      onUpdate={(v: any) => updateFormData('dates', v)}
      onValidationChange={setCanProceed}
    />,
    <ParticipantsLocation
      key="step3"
      data={formData.location || {}}
      onUpdate={v => updateFormData('location', v)}
      onValidationChange={setCanProceed}
    />,
    <RegistrationEventDetails
      key="step4"
      data={formData.details || {}}
      onUpdate={v => updateFormData('details', v)}
      onValidationChange={setCanProceed}
    />,
  ];

  const handleFinalSubmit = () => {
    const success = submitForm();
    if (success) {
      setShowSuccessDialog(true);
    }
  };

  return (
    <SectionLayout className="mt-20">
      <FieldCheckerForCreateEvent
        index={currentIndex}
        setCurrentIndex={setCurrentIndex}
        nextStep={nextStep}
        prevStep={prevStep}
        children={steps}
        canProceed={canProceed}
        onFinalSubmit={handleFinalSubmit}
        isLastStep={currentIndex === steps.length - 1}
      />

      {showResumePrompt && (
        <Dialog open>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Resume Your Previous Event?</DialogTitle>
            </DialogHeader>
            <p>We found previously saved event data. Would you like to continue from where you left off?</p>
            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={handleStartFresh}>Start Fresh</Button>
              <Button onClick={handleResume}>Continue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showSuccessDialog && (
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Event Created Successfully!</DialogTitle>
            </DialogHeader>
            <p>Your event has been saved and published successfully.</p>
            <DialogFooter className="mt-4 flex justify-end">
              <Button onClick={() => setShowSuccessDialog(false)}>OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </SectionLayout>
  );
}