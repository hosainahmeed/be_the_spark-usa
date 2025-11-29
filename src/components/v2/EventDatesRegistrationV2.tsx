import React, { useEffect } from 'react';
import { Form, DatePicker, TimePicker, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import SectionTitleFormal from '../component-layout/SectionTitleFormal';
import { EventData, updateEventData } from '@/app/redux/slices/eventSlice';
import dayjs from 'dayjs';

function EventDatesRegistrationV2() {
  const dispatch = useDispatch();
  const eventData = useSelector((state: any) => state.event.data);
  const [form] = Form.useForm();

  const validateEventDates = (startDate: any, endDate: any, startTime: any, endTime: any) => {
    if (!startDate || !endDate || !startTime || !endTime) return true;

    const start = dayjs(startDate)
      .hour(dayjs(startTime).hour())
      .minute(dayjs(startTime).minute());

    const end = dayjs(endDate)
      .hour(dayjs(endTime).hour())
      .minute(dayjs(endTime).minute());

    return start.isBefore(end);
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    const updates: any = {};


    if (changedValues.eventStartDate || changedValues.eventEndDate ||
      changedValues.eventStartTime || changedValues.eventEndTime) {

      const startDate = allValues.eventStartDate || dayjs(eventData.eventStartDateTime);
      const endDate = allValues.eventEndDate || dayjs(eventData.eventEndDateTime);
      const startTime = allValues.eventStartTime || dayjs(eventData.eventStartDateTime);
      const endTime = allValues.eventEndTime || dayjs(eventData.eventEndDateTime);

      if (startDate && endDate && startTime && endTime) {
        const isValid = validateEventDates(startDate, endDate, startTime, endTime);
        if (!isValid) {

          form.setFields([
            {
              name: 'eventStartDate',
              errors: ['Event start date must be before end date'],
            },
            {
              name: 'eventEndDate',
              errors: ['Event end date must be after start date'],
            },
          ]);
          return;
        }

        form.setFields([
          { name: 'eventStartDate', errors: [] },
          { name: 'eventEndDate', errors: [] },
        ]);
      }
    }

    if (changedValues.registrationStartDate || changedValues.registrationEndTime) {
      const date = allValues.registrationStartDate || dayjs(eventData.registrationStartDateTime);
      const time = allValues.registrationEndTime || dayjs(eventData.registrationEndDateTime);

      if (date && time) {
        updates.registrationStartDateTime = date
          .hour(time.hour())
          .minute(time.minute())
          .toISOString();
      }
    }

    if (changedValues.registrationEndDate || changedValues.registrationEndTime) {
      const date = allValues.registrationEndDate || dayjs(eventData.registrationEndDateTime);
      const time = allValues.registrationEndTime || dayjs(eventData.registrationEndDateTime);

      if (date && time) {
        updates.registrationEndDateTime = date
          .hour(time.hour())
          .minute(time.minute())
          .toISOString();
      }
    }

    if (changedValues.eventStartDate || changedValues.eventStartTime) {
      const date = allValues.eventStartDate || dayjs(eventData.eventStartDateTime);
      const time = allValues.eventStartTime || dayjs(eventData.eventStartDateTime);

      if (date && time) {
        updates.eventStartDateTime = date
          .hour(time.hour())
          .minute(time.minute())
          .toISOString();
      }
    }

    if (changedValues.eventEndDate || changedValues.eventEndTime) {
      const date = allValues.eventEndDate || dayjs(eventData.eventEndDateTime);
      const time = allValues.eventEndTime || dayjs(eventData.eventEndDateTime);

      if (date && time) {
        updates.eventEndDateTime = date
          .hour(time.hour())
          .minute(time.minute())
          .toISOString();
      }
    }

    Object.entries(updates).forEach(([field, value]) => {
      const updatedValue: EventData[keyof EventData] = value as EventData[keyof EventData];
      dispatch(updateEventData({ field: field as keyof EventData, value: updatedValue }));
    });
  };

  return (
    <div className="p-4">
      <SectionTitleFormal
        className="mb-8"
        title="Event Dates & Registration"
        description="Set the timeline for registration and the event itself."
      />

      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        requiredMark={false}
        initialValues={{
          registrationStartDate: eventData.registrationStartDateTime ? dayjs(eventData.registrationStartDateTime) : null,
          registrationEndDate: eventData.registrationEndDateTime ? dayjs(eventData.registrationEndDateTime) : null,
          registrationEndTime: eventData.registrationEndDateTime ? dayjs(eventData.registrationEndDateTime) : null,
          eventStartDate: eventData.eventStartDateTime ? dayjs(eventData.eventStartDateTime) : null,
          eventEndDate: eventData.eventEndDateTime ? dayjs(eventData.eventEndDateTime) : null,
          eventStartTime: eventData.eventStartDateTime ? dayjs(eventData.eventStartDateTime) : null,
          eventEndTime: eventData.eventEndDateTime ? dayjs(eventData.eventEndDateTime) : null,
        }}
      >

        <Row gutter={24}>
          <Col xs={24} md={24}>
            <Form.Item
              label="Registration Start Date"
              name="registrationStartDate"
              rules={[{ required: true, message: 'Please select registration start date' }]}
            >
              <DatePicker
                className="w-full"
                size="large"
                placeholder="Select date"
                format="MM/DD/YYYY"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Registration End Date"
              name="registrationEndDate"
              rules={[{ required: true, message: 'Please select registration end date' }]}
            >
              <DatePicker
                className="w-full"
                size="large"
                placeholder="Select date"
                format="MM/DD/YYYY"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Registration End Time"
              name="registrationEndTime"
              rules={[{ required: true, message: 'Please select registration end time' }]}
            >
              <TimePicker
                className="w-full"
                size="large"
                placeholder="Select time"
                format="h:mm a"
                use12Hours
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Event Start Date"
              name="eventStartDate"
              rules={[{ required: true, message: 'Please select event start date' }]}
            >
              <DatePicker
                className="w-full"
                size="large"
                placeholder="Select date"
                format="MM/DD/YYYY"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Event Start Time"
              name="eventStartTime"
              rules={[{ required: true, message: 'Please select event start time' }]}
            >
              <TimePicker
                className="w-full"
                size="large"
                placeholder="Select time"
                format="h:mm a"
                use12Hours
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Event End Date"
              name="eventEndDate"
              rules={[{ required: true, message: 'Please select event end date' }]}
            >
              <DatePicker
                className="w-full"
                size="large"
                placeholder="Select date"
                format="MM/DD/YYYY"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Event End Time"
              name="eventEndTime"
              rules={[{ required: true, message: 'Please select event end time' }]}
            >
              <TimePicker
                className="w-full"
                size="large"
                placeholder="Select time"
                format="h:mm a"
                use12Hours
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EventDatesRegistrationV2;