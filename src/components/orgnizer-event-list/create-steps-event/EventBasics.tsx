import SectionTitleFormal from '@/components/component-layout/SectionTitleFormal'
import React from 'react'
import ImageUpload from '../ImageUpload'
import { Input } from '@/components/ui/input';

function EventBasics() {
    const [file, setFile] = React.useState<File | null>(null);
    return (
    <div  className='max-w-screen-md mx-auto'>
        <SectionTitleFormal title="Event Basics" description='Provide essential information so families can quickly understand your event.' />
        <form className='flex flex-col gap-4' action="post" onSubmit={(e) => e.preventDefault()}>
            <div className='flex flex-col gap-4'>
                <div>
                    <label htmlFor="">Event Name</label>
                    <Input placeholder='Event Name' type="text" />
                </div>
                <div>
                    <label htmlFor="">Event Short Description</label>
                    <Input placeholder='Event Short Description' type="text" />
                </div>
            </div>
            <div>
                <label htmlFor="">Sport</label>
                
            </div>
            <div>
                <label htmlFor="">Event Image</label>
                <ImageUpload title="Event Image" file={file} setFile={setFile} />
            </div>
        </form>
    </div>
  )
}

export default EventBasics