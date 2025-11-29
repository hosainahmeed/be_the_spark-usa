
// 'use client'
// import SectionLayout from '@/components/component-layout/SectionLayout'
// import { Button, message, theme } from 'antd'
// import EventBasicsV2 from '@/components/v2/EventBasicsV2';
// import EventDatesRegistrationV2 from '@/components/v2/EventDatesRegistrationV2';
// import ParticipantsLocationV2 from '@/components/v2/ParticipantsLocationV2';
// import RegistrationEventDetailsV2 from '@/components/v2/RegistrationEventDetailsV2';
// import { useDispatch, useSelector } from 'react-redux';
// import { setStep } from '@/app/redux/slices/eventSlice';


// function page() {
//   const { token } = theme.useToken();
//   const eventData = useSelector((state: any) => state.event)
//   const dispatch = useDispatch()

//   const steps = [
//     {
//       content: <EventBasicsV2 />,
//     },
//     {
//       content: <EventDatesRegistrationV2 />,
//     },
//     {
//       content: <ParticipantsLocationV2 />,
//     },
//     {
//       content: <RegistrationEventDetailsV2 />,
//     },
//   ];
//   console.log(eventData)
//   const validateStep = (step: number): boolean => {
//     if (!eventData?.data) return false;

//     switch (step) {
//       case 0:
//         return !!(eventData.data.name &&
//           eventData.data.sport &&
//           eventData.data.eventType &&
//           eventData.data.shortDescription && eventData?.event_image);
//       case 1:
//         return !!(eventData.data.registrationStartDateTime &&
//           eventData.data.registrationEndDateTime &&
//           eventData.data.eventStartDateTime &&
//           eventData.data.eventEndDateTime);
//       case 2:
//         return !!(
//           eventData.data.city &&
//           eventData.data.zipCode &&
//           eventData.data.location?.coordinates?.length === 2);
//       case 3:
//         return !!eventData.data.description;
//       default:
//         return true;
//     }
//   };

//   const next = () => {
//     if (eventData?.step === undefined) return;


//     if (!validateStep(eventData.step)) {
//       message.destroy()
//       message.error('Please fill in all required fields before proceeding');
//       return;
//     }


//     if (eventData.step < steps.length - 1) {
//       dispatch(setStep(eventData.step + 1));
//     }
//   };

//   const prev = () => {
//     dispatch(setStep(eventData?.step - 1));
//   };

//   const contentStyle: React.CSSProperties = {
//     minHeight: '460px',
//     color: token.colorTextTertiary,
//     backgroundColor: token.colorFillAlter,
//     borderRadius: token.borderRadiusLG,
//     marginTop: 16,
//   };
//   const buttonStyle = {
//     backgroundColor: '#002868',
//     borderRadius: '2px',
//     color: 'white'
//   }
//   return (
//     <SectionLayout>
//       <div style={contentStyle}>{steps[eventData?.step].content}</div>
//       <div style={{ marginTop: 24 }}>
//         {eventData?.step > 0 && (
//           <Button size='large' style={buttonStyle} onClick={() => prev()}>
//             Previous
//           </Button>
//         )}
//         {eventData?.step < steps.length - 1 && (
//           <Button
//             style={buttonStyle}
//             size='large' onClick={() => next()}>
//             Next
//           </Button>
//         )}
//         {eventData?.step === steps.length - 1 && (
//           <Button size='large' style={buttonStyle} onClick={() => message.success('Processing complete!')}>
//             Save & Publish
//           </Button>
//         )}
//       </div>
//     </SectionLayout>
//   )
// }

// export default page

