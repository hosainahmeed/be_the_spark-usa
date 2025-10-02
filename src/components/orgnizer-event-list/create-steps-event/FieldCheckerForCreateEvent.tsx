import { Button } from '@/components/ui/button'
import React from 'react'

function FieldCheckerForCreateEvent({ children, index, setCurrentIndex }: { children: React.ReactNode[], index: number, setCurrentIndex: React.Dispatch<React.SetStateAction<number>> }) {

    return (
        <div>
            {children[index]}
            <div className='flex mt-12 gap-4 justify-start'>
                <Button
                    className='bg-[var(--blue)] text-white hover:text-[var(--blue)] md:px-6 px-4 text-lg md:py-6 py-4 rounded cursor-pointer hover:!bg-white'
                    onClick={() => setCurrentIndex(index - 1)}>Previous</Button>
                {index < children.length - 1 ? <Button
                    className='bg-[var(--blue)] text-white hover:text-[var(--blue)] md:px-6 px-4 text-lg md:py-6 py-4 rounded cursor-pointer hover:!bg-white'
                    onClick={() => setCurrentIndex(index + 1)}>Next</Button> :
                    <Button
                        disabled={index < children.length - 1}
                        className='bg-[var(--blue)] text-white hover:text-[var(--blue)] md:px-6 px-4 text-lg md:py-6 py-4 rounded cursor-pointer hover:!bg-white'
                        onClick={() => setCurrentIndex(index + 1)}>Save & Publish</Button>}
            </div>
        </div>
    )
}

export default FieldCheckerForCreateEvent