import { Button } from '@/components/ui/button';
import React from 'react';

function FieldCheckerForCreateEvent({
    children,
    index,
    setCurrentIndex,
    nextStep,
    prevStep,
    canProceed,
    onFinalSubmit,
    isLastStep,
}: {
    children: React.ReactNode[];
    index: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    nextStep: () => void;
    prevStep: () => void;
    canProceed: boolean;
    onFinalSubmit: () => void;
    isLastStep: boolean;
}) {
    const totalSteps = children.length;

    const handleNext = () => {
        if (canProceed) {
            nextStep();
        }
    };

    const handleSubmit = () => {
        if (canProceed) {
            onFinalSubmit();
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto">
            {children[index]}
            <div className="flex mt-12 gap-4 justify-start">
                <Button
                    disabled={index === 0}
                    className="bg-[var(--blue)] text-white hover:text-[var(--blue)] md:px-6 px-4 text-lg md:py-6 py-4 rounded cursor-pointer hover:!bg-white"
                    onPointerDown={prevStep}
                >
                    Previous
                </Button>
                {index < totalSteps - 1 ? (
                    <Button
                        className="bg-[var(--blue)] text-white hover:text-[var(--blue)] md:px-6 px-4 text-lg md:py-6 py-4 rounded cursor-pointer hover:!bg-white"
                        onPointerDown={handleNext}
                        disabled={!canProceed}
                    >
                        Next
                    </Button>
                ) : (
                    <Button
                        className="bg-[var(--blue)] text-white hover:text-[var(--blue)] md:px-6 px-4 text-lg md:py-6 py-4 rounded cursor-pointer hover:!bg-white"
                        onPointerDown={handleSubmit}
                        disabled={!canProceed}
                    >
                        Save & Publish
                    </Button>
                )}
            </div>
            {!canProceed && (
                <p className="text-red-500 text-sm mt-2">Please fill all required fields to continue</p>
            )}
        </div>
    );
}

export default FieldCheckerForCreateEvent;