'use client'
import SectionLayout from '@/components/component-layout/SectionLayout'
import { Button, message, theme } from 'antd'
import EventBasicsV2 from '@/components/v2/EventBasicsV2';
import EventDatesRegistrationV2 from '@/components/v2/EventDatesRegistrationV2';
import ParticipantsLocationV2 from '@/components/v2/ParticipantsLocationV2';
import RegistrationEventDetailsV2 from '@/components/v2/RegistrationEventDetailsV2';
import { useDispatch, useSelector } from 'react-redux';
import { resetEvent, setEventData, setEventImage, setStep } from '@/app/redux/slices/eventSlice';
import { useCreateEventMutation, useGetSingleEventQuery, useUpdateEventMutation } from '@/app/redux/service/eventApis';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { mapEventToEventData } from '@/utils/mapEventToEventData';


function page() {
  const { token } = theme.useToken();
  const eventData = useSelector((state: any) => state.event)
  const dispatch = useDispatch()
  const [createEvent] = useCreateEventMutation()
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter()
  const { data: singleEventResponse, isLoading } = useGetSingleEventQuery(id as string, { skip: !id })
  const [updateEvent] = useUpdateEventMutation()

  useEffect(() => {
    if (!id) {
      dispatch(resetEvent())
    }
    if (singleEventResponse?.data) {
      const apiEvent = singleEventResponse.data;
      const mapped = mapEventToEventData(apiEvent);

      dispatch(setEventData(mapped));
      dispatch(setEventImage(mapped?.event_image));
    }
  }, [singleEventResponse]);

  const steps = [
    {
      content: <EventBasicsV2 />,
    },
    {
      content: <EventDatesRegistrationV2 />,
    },
    {
      content: <ParticipantsLocationV2 />,
    },
    {
      content: <RegistrationEventDetailsV2 />,
    },
  ];

  // useEffect(() => {
  //   const handleBeforeUnload = (e: any) => {
  //     const data = Object.values(eventData);
  //     if (data.some((value) => value !== null || value !== '' || value !== undefined || value !== 0)) {
  //       e.preventDefault();
  //       e.returnValue = "";
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  const validateStep = (step: number): boolean => {
    if (!eventData?.data) return false;

    switch (step) {
      case 0:
        return !!(eventData.data.name &&
          eventData.data.sport &&
          eventData.data.eventType &&
          eventData.data.shortDescription && eventData?.event_image);
      case 1:
        return !!(eventData.data.registrationStartDateTime &&
          eventData.data.registrationEndDateTime &&
          eventData.data.eventStartDateTime &&
          eventData.data.eventEndDateTime);
      case 2:
        return !!(
          eventData.data.city &&
          eventData.data.zipCode &&
          eventData.data.location?.coordinates?.length === 2);
      case 3:
        return !!eventData.data.description;
      default:
        return true;
    }
  };

  const next = () => {
    if (eventData?.step === undefined) return;


    if (!validateStep(eventData.step)) {
      message.destroy()
      message.error('Please fill in all required fields before proceeding');
      return;
    }


    if (eventData.step < steps.length - 1) {
      dispatch(setStep(eventData.step + 1));
    }
  };

  const prev = () => {
    dispatch(setStep(eventData?.step - 1));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    try {
      const data = {
        name: eventData?.data?.name,
        shortDescription: eventData?.data?.shortDescription,
        sport: eventData?.data?.sport,
        eventType: eventData?.data?.eventType,
        registrationStartDateTime: eventData?.data?.registrationStartDateTime,
        registrationEndDateTime: eventData?.data?.registrationEndDateTime,
        eventStartDateTime: eventData?.data?.eventStartDateTime,
        eventEndDateTime: eventData?.data?.eventEndDateTime,
        minAge: eventData?.data?.minAge,
        maxAge: eventData?.data?.maxAge,
        skillLevel: eventData?.data?.skillLevel,
        availableSlot: eventData?.data?.availableSlot,
        zipCode: eventData?.data?.zipCode,
        address: eventData?.data?.address,
        location: {
          type: 'Point',
          coordinates: eventData?.data?.location?.coordinates
        },
        vanue: eventData?.data?.vanue,
        city: eventData?.data?.city,
        websiteLink: eventData?.data?.websiteLink,
        registrationFee: eventData?.data?.registrationFee,
        description: eventData?.data?.description
      }

      if (eventData?.event_image instanceof File) {
        formData.append('event_image', eventData?.event_image)
      }

      Object.entries(data).forEach(([key, value]) => {
        if (value === null || value === false || value === 0 || value === '') {
          throw new Error(`${key} should not be null, false or empty string`);
        }
      });

      formData.append('data', JSON.stringify(data))

      let res;
      if (id) {
        formData.append('_method', 'PATCH');
        res = await updateEvent({
          formData,
          id
        }).unwrap();
      } else {
        res = await createEvent(formData).unwrap()
      }
      if (!res?.success) {
        throw new Error(res?.message)
      }
      toast.success(res?.message)
      dispatch(resetEvent())
      router.push("/my-events")
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || 'something went wrong while create event!')
    }
  }

  const contentStyle: React.CSSProperties = {
    minHeight: '460px',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };
  const buttonStyle = {
    backgroundColor: '#002868',
    borderRadius: '2px',
    color: 'white'
  }
  return (
    <SectionLayout>
      <div style={contentStyle}>{steps[eventData?.step].content}</div>
      <div style={{ marginTop: 24 }}>
        {eventData?.step > 0 && (
          <Button size='large' style={buttonStyle} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {eventData?.step < steps.length - 1 && (
          <Button
            style={buttonStyle}
            size='large' onClick={() => next()}>
            Next
          </Button>
        )}
        {eventData?.step === steps.length - 1 && (
          <Button size='large' style={buttonStyle} onClick={() => handleSubmit()}>
            {id ? "Update Event" : "Save & Publish"}
          </Button>
        )}
      </div>
    </SectionLayout>
  )
}

export default page

