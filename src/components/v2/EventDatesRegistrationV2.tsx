import React, { useEffect } from 'react';
import { Form, DatePicker, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import SectionTitleFormal from '../component-layout/SectionTitleFormal';
import { EventData, updateEventData } from '@/app/redux/slices/eventSlice';
import dayjs from 'dayjs';

function EventDatesRegistrationV2() {
  const dispatch = useDispatch();
  const eventData = useSelector((state: any) => state.event.data);
  const [form] = Form.useForm();
  const [registrationStart, setRegistrationStart] = React.useState<dayjs.Dayjs | null>(null);
  const [registrationEnd, setRegistrationEnd] = React.useState<dayjs.Dayjs | null>(null);
  const [eventStart, setEventStart] = React.useState<dayjs.Dayjs | null>(null);

  const disabledRegistrationStartDate = (current: dayjs.Dayjs) => {
    return current && current.isBefore(dayjs(), 'day');
  };

  const disabledRegistrationEndDate = (current: dayjs.Dayjs) => {
    if (!registrationStart) {
      return current && current.isBefore(dayjs(), 'day');
    }

    return current && current.isBefore(registrationStart, 'day');
  };

  const disabledEventStartDate = (current: dayjs.Dayjs) => {
    if (!registrationEnd) {
      return true;
    }

    return current && current.isBefore(registrationEnd, 'day');
  };

  const disabledEventEndDate = (current: dayjs.Dayjs) => {
    if (!eventStart) {
      return true;
    }

    return current && current.isBefore(eventStart, 'day');
  };

  const validateDates = () => {
    const values = form.getFieldsValue();
    const errors: any[] = [];

    if (values.registrationStartDateTime && values.registrationEndDateTime) {
      if (dayjs(values.registrationEndDateTime).isBefore(values.registrationStartDateTime)) {
        errors.push({
          name: 'registrationEndDateTime',
          errors: ['Registration end must be after registration start'],
        });
      }
    }

    if (values.eventStartDateTime && values.eventEndDateTime) {
      if (dayjs(values.eventEndDateTime).isBefore(values.eventStartDateTime)) {
        errors.push({
          name: 'eventEndDateTime',
          errors: ['Event end must be after event start'],
        });
      }
    }

    if (values.eventStartDateTime && values.registrationEndDateTime) {
      if (dayjs(values.eventStartDateTime).isBefore(values.registrationEndDateTime)) {
        errors.push({
          name: 'eventStartDateTime',
          errors: ['Event must start after registration ends'],
        });
      }
    }

    if (errors.length > 0) {
      form.setFields(errors);
    } else {
      form.setFields([
        { name: 'registrationEndDateTime', errors: [] },
        { name: 'eventStartDateTime', errors: [] },
        { name: 'eventEndDateTime', errors: [] },
      ]);
    }
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.registrationStartDateTime) {
      setRegistrationStart(changedValues.registrationStartDateTime);

      form.setFieldsValue({
        registrationEndDateTime: null,
        eventStartDateTime: null,
        eventEndDateTime: null
      });
      setRegistrationEnd(null);
      setEventStart(null);
    }

    if (changedValues.registrationEndDateTime) {
      setRegistrationEnd(changedValues.registrationEndDateTime);

      form.setFieldsValue({
        eventStartDateTime: null,
        eventEndDateTime: null
      });
      setEventStart(null);
    }

    if (changedValues.eventStartDateTime) {
      setEventStart(changedValues.eventStartDateTime);

      form.setFieldsValue({
        eventEndDateTime: null
      });
    }

    validateDates();

    const updates: Partial<EventData> = {};

    if (changedValues.registrationStartDateTime) {
      updates.registrationStartDateTime = changedValues.registrationStartDateTime.toISOString();
    }

    if (changedValues.registrationEndDateTime) {
      updates.registrationEndDateTime = changedValues.registrationEndDateTime.toISOString();
    }

    if (changedValues.eventStartDateTime) {
      updates.eventStartDateTime = changedValues.eventStartDateTime.toISOString();
    }

    if (changedValues.eventEndDateTime) {
      updates.eventEndDateTime = changedValues.eventEndDateTime.toISOString();
    }

    Object.entries(updates).forEach(([field, value]) => {
      dispatch(updateEventData({
        field: field as keyof EventData,
        value: value as EventData[keyof EventData]
      }));
    });
  };

  useEffect(() => {
    if (eventData.registrationStartDateTime) {
      setRegistrationStart(dayjs(eventData.registrationStartDateTime));
    }
    if (eventData.registrationEndDateTime) {
      setRegistrationEnd(dayjs(eventData.registrationEndDateTime));
    }
    if (eventData.eventStartDateTime) {
      setEventStart(dayjs(eventData.eventStartDateTime));
    }
  }, []);

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
          registrationStartDateTime: eventData.registrationStartDateTime
            ? dayjs(eventData.registrationStartDateTime)
            : null,
          registrationEndDateTime: eventData.registrationEndDateTime
            ? dayjs(eventData.registrationEndDateTime)
            : null,
          eventStartDateTime: eventData.eventStartDateTime
            ? dayjs(eventData.eventStartDateTime)
            : null,
          eventEndDateTime: eventData.eventEndDateTime
            ? dayjs(eventData.eventEndDateTime)
            : null,
        }}
      >
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Registration Start Date & Time"
              name="registrationStartDateTime"
              rules={[
                { required: true, message: 'Please select registration start date and time' }
              ]}
            >
              <DatePicker
                showTime
                className="w-full"
                size="large"
                placeholder="Select date and time"
                format="MM/DD/YYYY hh:mm A"
                use12Hours
                disabledDate={disabledRegistrationStartDate}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Registration End Date & Time"
              name="registrationEndDateTime"
              rules={[
                { required: true, message: 'Please select registration end date and time' }
              ]}
            >
              <DatePicker
                showTime
                className="w-full"
                size="large"
                placeholder="Select date and time"
                format="MM/DD/YYYY hh:mm A"
                use12Hours
                disabledDate={disabledRegistrationEndDate}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Event Start Date & Time"
              name="eventStartDateTime"
              rules={[
                { required: true, message: 'Please select event start date and time' }
              ]}
            >
              <DatePicker
                showTime
                className="w-full"
                size="large"
                placeholder="Select date and time"
                format="MM/DD/YYYY hh:mm A"
                use12Hours
                disabledDate={disabledEventStartDate}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Event End Date & Time"
              name="eventEndDateTime"
              rules={[
                { required: true, message: 'Please select event end date and time' }
              ]}
            >
              <DatePicker
                showTime
                className="w-full"
                size="large"
                placeholder="Select date and time"
                format="MM/DD/YYYY hh:mm A"
                use12Hours
                disabledDate={disabledEventEndDate}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EventDatesRegistrationV2;