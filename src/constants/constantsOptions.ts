import { FilterSection } from "@/types/global";

export const AgeOptions: { value: string; label: string }[] = [
    { value: '2-4', label: '2–4 years' },
    { value: '5-7', label: '5–7 years' },
    { value: '8-10', label: '8–10 years' },
    { value: '11-13', label: '11–13 years' },
    { value: '14-16', label: '14–16 years' },
    { value: '17-100000', label: '17+ years' }
]

// export const SportOptions: { value: string; label: string }[] = [
//     { value: 'all-sport', label: 'All Sport' },
//     { value: 'badminton', label: 'Badminton' },
//     { value: 'baseball', label: 'Baseball' },
//     { value: 'basketball', label: 'Basketball' },
//     { value: 'boxing', label: 'Boxing' },
//     { value: 'cheerleading', label: 'Cheerleading' },
//     { value: 'climbing', label: 'Climbing' },
//     { value: 'cross-country', label: 'Cross Country' },
//     { value: 'dance', label: 'Dance' },
//     { value: 'football-flag', label: 'Football - Flag' },
//     { value: 'football-tackle', label: 'Football - Tackle' },
//     { value: 'golf', label: 'Golf' },
//     { value: 'gymnastics', label: 'Gymnastics' },
//     { value: 'hockey-field', label: 'Hockey - Field' },
//     { value: 'hockey-ice', label: 'Hockey - Ice' },
//     { value: 'horse-riding', label: 'Horse Riding' },
//     { value: 'lacrosse', label: 'Lacrosse' },
//     { value: 'martial-arts', label: 'Martial Arts' },
//     { value: 'pickleball', label: 'Pickleball' },
//     { value: 'skateboarding', label: 'Skateboarding' },
//     { value: 'skiing', label: 'Skiing' },
//     { value: 'snowboarding', label: 'Snowboarding' },
//     { value: 'soccer', label: 'Soccer' },
//     { value: 'softball', label: 'Softball' },
//     { value: 'squash', label: 'Squash' },
//     { value: 'swimming', label: 'Swimming' },
//     { value: 'table-tennis', label: 'Table Tennis' },
//     { value: 'tennis', label: 'Tennis' },
//     { value: 'track-field', label: 'Track & Field' },
//     { value: 'volleyball', label: 'Volleyball' },
//     { value: 'wrestling', label: 'Wrestling' }
// ]

export const EventTypes: { value: string; label: string }[] = [
    { value: 'league', label: 'League' },
    { value: 'tournament', label: 'Tournament' },
    { value: 'camps', label: 'Camps' },
    { value: 'tryouts', label: 'Tryouts' },
    { value: 'private-coaching', label: 'Private Coaching' },
    { value: 'strength-training', label: 'Speed Strength & Agility Training' },
    { value: 'skills-academy', label: 'Skills Academy' },
    { value: 'open-play', label: 'Open Play / Scrimmage' }
]
export const EventStatus: { value: string; label: string }[] = [
    { value: '', label: 'All Status' },
    { value: 'UPCOMING', label: 'Upcoming' },
    { value: 'REGISTRATION_OPEN', label: 'Registration Open' },
    { value: 'EVENT_STARTED', label: 'Event Started' },
    { value: 'EVENT_FINISHED', label: 'Event Finished' }
]

export const SkillLevel: { value: string; label: string }[] = [
    { value: '', label: 'All Types' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
]

export const DateRange: { value: string; label: string }[] = [
    { value: 'anytime', label: 'Anytime' },
    { value: 'this-weekend', label: 'This Weekend' },
    { value: 'next-7-days', label: 'Next 7 Days' },
    { value: 'next-30-days', label: 'Next 30 Days' }
]

export const FILTER_SECTIONS: FilterSection[] = [
    {
        id: 'location',
        type: 'input',
        label: 'Location',
        placeholder: 'Location (ZIP Code or City)',
    },
    {
        id: 'sport',
        type: 'select',
        label: 'Sport',
        placeholder: 'All Sport',
        options: []
    },
    {
        id: 'age',
        type: 'accordion',
        label: 'Age Group',
        options: AgeOptions
    },
    {
        id: 'eventType',
        type: 'select',
        label: 'Event Type',
        placeholder: 'Event Type',
        options: []
    },
    {
        id: 'eventStatus',
        type: 'select',
        label: 'Event Status',
        placeholder: 'Event Status',
        options: EventStatus
    },
    {
        id: 'skillLevel',
        type: 'select',
        label: 'Skill Level',
        placeholder: 'Skill Level',
        options: SkillLevel
    },
    {
        id: 'dateRange',
        type: 'select',
        label: 'Date Range',
        placeholder: 'Date Range',
        options: DateRange
    }
] as const