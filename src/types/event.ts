export type EventStatus = "UPCOMING" | "REGISTRATION_OPEN" | "EVENT_STARTED" | "EVENT_FINISHED";
export type skillLevel = 'Intermediate' | 'Beginner' | 'Advanced'

export interface Organizer {
  _id: string;
  user: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  address: string;
  profile_image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sport {
  _id: string;
  name: string;
  category_image: string;
  type: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventType {
  _id: string;
  name: string;
  type: 'event' | 'sports';
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  type: 'Point';
  coordinates: [number, number];
}

export interface EventDetails {
  _id: string;
  organizer: Organizer;
  name: string;
  shortDescription: string;
  sport: Sport;
  eventType: EventType;
  registrationStartDateTime: string;
  registrationEndDateTime: string;
  eventStartDateTime: string;
  eventEndDateTime: string;
  minAge: number;
  maxAge: number;
  skillLevel: skillLevel;
  availableSlot: number;
  zipCode: string;
  address: string;
  location: Location;
  city: string;
  websiteLink: string;
  registrationFee: number;
  description: string;
  image: string;
  isDeleted: boolean;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
  totalRating: number;
  averageRating: number;
  isBookmark: boolean
}