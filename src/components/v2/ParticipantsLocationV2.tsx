import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Select, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import SectionTitleFormal from '../component-layout/SectionTitleFormal';
import { EventData, updateEventData } from '@/app/redux/slices/eventSlice';
import { AgeOptions } from '@/constants/constantsOptions';
import PlaceSearch from '../common/PlaceSearch';

const { Option } = Select;

const skillLevels = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
];

function ParticipantsLocationV2() {
  const dispatch = useDispatch();
  const eventData = useSelector((state: any) => state.event.data);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ageGroup: eventData.ageGroup,
      skillLevel: eventData.skillLevel,
      availableSlot: eventData.availableSlot,
      zipCode: eventData.zipCode,
      venue: eventData.venue,
      city: eventData.city,
    });
  }, [eventData, form]);

  const handleValuesChange = (changedValues: any) => {
    if ('ageGroup' in changedValues) {
      const [minAge, maxAge] = changedValues.ageGroup.split('-').map(Number);
      dispatch(updateEventData({ field: 'minAge', value: minAge }));
      dispatch(updateEventData({ field: 'maxAge', value: maxAge }));
      dispatch(updateEventData({ field: 'ageGroup', value: changedValues.ageGroup }));
    }


    Object.entries(changedValues).forEach(([field, value]) => {
      if (field !== 'ageGroup') {
        const updatedValue: EventData[keyof EventData] = value as EventData[keyof EventData];
        dispatch(updateEventData({
          field: field as keyof EventData,
          value: updatedValue
        }));
      }
    });
  };
  return (
    <div className="p-4">
      <SectionTitleFormal
        className="mb-8"
        title="Participants & Location"
        description="Define your target audience and event venue."
      />

      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        initialValues={{
          ageGroup: eventData.ageGroup,
          skillLevel: eventData.skillLevel,
          availableSlot: eventData.availableSlot,
          zipCode: eventData.zipCode,
          venue: eventData.venue,
          city: eventData.city,
          address: eventData.address,
          location: eventData.location
        }}
        requiredMark={false}
      >
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Age Group"
              name="ageGroup"
              rules={[{ required: true, message: 'Please select age group' }]}
            >
              <Select
                size="large"
                placeholder="Select Age Group"
                className="w-full"
              >
                {AgeOptions.map(group => (
                  <Option key={group.value} value={group.value}>
                    {group.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Skill Level"
              name="skillLevel"
              rules={[{ required: true, message: 'Please select skill level' }]}
            >
              <Select
                size="large"
                placeholder="Select Skill Level"
                className="w-full"
              >
                {skillLevels.map(level => (
                  <Option key={level.value} value={level.value}>
                    {level.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item
              label="Available Slots"
              name="availableSlot"
              rules={[{ required: true, message: 'Please enter available slots' }]}
            >
              <InputNumber
                min={1}
                size="large"
                placeholder="e.g., '100'"
                className="!w-full"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Zip Code"
              name="zipCode"
              rules={[{ required: true, message: 'Please enter zip code' }]}
            >
              <Input
                size="large"
                placeholder="'90027'"
                className="w-full"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Location Name / Venue"
              name="venue"
              rules={[{ required: true, message: 'Please enter venue name' }]}
            >
              <Input
                size="large"
                placeholder="'Griffith Park Fields'"
                className="w-full"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="City / State"
              name="city"
              rules={[{ required: true, message: 'Please enter city and state' }]}
            >
              <Input
                size="large"
                placeholder="'Los Angeles, CA'"
                className="w-full"
              />
            </Form.Item>
          </Col>
        </Row>
        <PlaceSearch />
      </Form>
    </div>
  );
}

export default ParticipantsLocationV2;