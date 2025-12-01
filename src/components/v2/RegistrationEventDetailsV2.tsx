import React, { useEffect, useState } from 'react';
import { Input, InputNumber, Form, Typography } from 'antd';
import SectionTitleFormal from '../component-layout/SectionTitleFormal';
import JoditComponent from '../ui/form-related/JoditComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setEventData, updateEventData } from '@/app/redux/slices/eventSlice';

const { Title } = Typography;

function RegistrationEventDetailsV2() {
  const [form] = Form.useForm();
  const eventData = useSelector((state: any) => state.event.data);
  const dispatch = useDispatch()
 
  const [formData, setFormData] = useState({
    websiteLink: eventData?.websiteLink,
    registrationFee: eventData?.registrationFee as number | undefined,
  });
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (eventData) {
      setContent(eventData?.description)
    }
  }, [])

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    dispatch(updateEventData({ field: 'description', value: newContent }))
  };

  const handleInputChange = (name: string, url: string | number | null) => {
    setFormData(prev => ({
      ...prev,
      [name]: url
    }));
    console.log(url)
    dispatch(updateEventData({ field: 'websiteLink', value: url }))
  };

  return (
    <div className='p-4'>
      <SectionTitleFormal
        title="Registration & Event Details"
        description="Provide all the important information about your event and how families can register."
        className="mb-8"
      />

      <Form
        form={form}
        initialValues={{
          websiteLink: eventData?.websiteLink,
          registrationFee: eventData?.registrationFee
        }}
        layout="vertical"
      >
        <Form.Item
          label="Event Website/Registration Link"
          name="websiteLink"
          rules={[
            {
              type: 'url',
              message: 'Please enter a valid URL',
            },
          ]}
          className="mb-6"
        >
          <Input
            size="large"
            placeholder="e.g., 'https://forms.gle/xyz123'"
            value={formData.websiteLink}
            onChange={(e) => handleInputChange('websiteLink', e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Event Registration Fee (Optional)"
          name="registrationFee"
          className="mb-6"
        >
          <InputNumber
            size="large"
            min={0}
            step={1}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            placeholder="$"
            style={{ width: '100%' }}
            value={formData.registrationFee}
            onChange={(value) => dispatch(updateEventData({ field: 'registrationFee', value: value }))}
          />
        </Form.Item>

        <div className="mb-6">
          <Title level={4} className="mb-2">Describe About Your Event *</Title>
          <JoditComponent
            content={content}
            setContent={handleContentChange}
          />
          {!content && (
            <p className="text-red-500 text-sm mt-1">Description is required</p>
          )}
        </div>
      </Form>
    </div>
  );
}

export default RegistrationEventDetailsV2;