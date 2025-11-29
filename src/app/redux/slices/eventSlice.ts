import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface Location {
    type: "Point";
    coordinates: [number, number];
}

interface EventData {
    name: string | null;
    shortDescription: string | null;
    sport: string | null;
    eventType: string | null;
    registrationStartDateTime: string | null;
    registrationEndDateTime: string | null;
    eventStartDateTime: string | null;
    eventEndDateTime: string | null;
    minAge: number | null;
    maxAge: number | null;
    ageGroup: any,
    skillLevel: string | null;
    availableSlot: number | null;
    zipCode: string | null;
    address: string | null;
    location: Location;
    city: string | null;
    websiteLink: string | null;
    registrationFee: number;
    description: string | null;
}

interface EventState {
    step: number;
    event_image: File | null | [] | string;
    data: EventData;
}

const initialState: EventState = {
    step: 0,
    event_image: null,
    data: {
        name: null,
        shortDescription: null,
        sport: null,
        eventType: null,
        // 
        registrationStartDateTime: null,
        registrationEndDateTime: null,
        eventStartDateTime: null,
        eventEndDateTime: null,
        minAge: null,
        maxAge: null,
        ageGroup: null,
        skillLevel: null,
        availableSlot: null,
        zipCode: null,
        address: null,
        location: {
            type: "Point",
            coordinates: [0, 0]
        },
        city: null,
        websiteLink: null,
        registrationFee: 0,
        description: null
    }
}

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },

        setEventImage: (state, action: PayloadAction<any>) => {
            state.event_image = action.payload;
        },

        updateEventData: <K extends keyof EventData>(
            state: EventState,
            action: PayloadAction<{ field: K; value: EventData[K] }>
        ) => {
            state.data[action.payload.field] = action.payload.value;
        },

        setEventData: (state, action: PayloadAction<Partial<EventData>>) => {
            state.data = { ...state.data, ...action.payload };
        },

        setLocationCoordinates: (state, action: PayloadAction<[number, number]>) => {
            state.data.location.coordinates = action.payload;
        },

        resetEvent: () => initialState,

        setLocation: (state, action: PayloadAction<Location>) => {
            state.data.location = action.payload;
        }
    },
})

export const {
    setStep,
    setEventImage,
    updateEventData,
    setEventData,
    setLocationCoordinates,
    resetEvent,
    setLocation
} = eventSlice.actions

export default eventSlice
export type { EventState, EventData, Location }