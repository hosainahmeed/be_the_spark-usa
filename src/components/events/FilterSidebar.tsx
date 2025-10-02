"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

// Types
interface FilterOption {
    value: string
    label: string
}

interface FilterSection {
    id: string
    type: 'input' | 'select' | 'accordion'
    label: string
    options?: FilterOption[]
    placeholder?: string
    defaultValue?: string
}

// Constants
const FILTER_SECTIONS: FilterSection[] = [
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
        options: [
            { value: 'all-sport', label: 'All Sport' },
            { value: 'badminton', label: 'Badminton' },
            { value: 'baseball', label: 'Baseball' },
            { value: 'basketball', label: 'Basketball' },
            { value: 'boxing', label: 'Boxing' },
            { value: 'cheerleading', label: 'Cheerleading' },
            { value: 'climbing', label: 'Climbing' },
            { value: 'cross-country', label: 'Cross Country' },
            { value: 'dance', label: 'Dance' },
            { value: 'football-flag', label: 'Football - Flag' },
            { value: 'football-tackle', label: 'Football - Tackle' },
            { value: 'golf', label: 'Golf' },
            { value: 'gymnastics', label: 'Gymnastics' },
            { value: 'hockey-field', label: 'Hockey - Field' },
            { value: 'hockey-ice', label: 'Hockey - Ice' },
            { value: 'horse-riding', label: 'Horse Riding' },
            { value: 'lacrosse', label: 'Lacrosse' },
            { value: 'martial-arts', label: 'Martial Arts' },
            { value: 'pickleball', label: 'Pickleball' },
            { value: 'skateboarding', label: 'Skateboarding' },
            { value: 'skiing', label: 'Skiing' },
            { value: 'snowboarding', label: 'Snowboarding' },
            { value: 'soccer', label: 'Soccer' },
            { value: 'softball', label: 'Softball' },
            { value: 'squash', label: 'Squash' },
            { value: 'swimming', label: 'Swimming' },
            { value: 'table-tennis', label: 'Table Tennis' },
            { value: 'tennis', label: 'Tennis' },
            { value: 'track-field', label: 'Track & Field' },
            { value: 'volleyball', label: 'Volleyball' },
            { value: 'wrestling', label: 'Wrestling' }
        ]
    },
    {
        id: 'age',
        type: 'accordion',
        label: 'Age Group',
        options: [
            { value: 'any', label: 'Any Age' },
            { value: '2-4', label: '2–4 years' },
            { value: '5-7', label: '5–7 years' },
            { value: '8-10', label: '8–10 years' },
            { value: '11-13', label: '11–13 years' },
            { value: '14-16', label: '14–16 years' },
            { value: '17+', label: '17+ years' }
        ]
    },
    {
        id: 'eventType',
        type: 'select',
        label: 'Event Type',
        placeholder: 'Event Type',
        options: [
            { value: 'league', label: 'League' },
            { value: 'tournament', label: 'Tournament' },
            { value: 'camps', label: 'Camps' },
            { value: 'tryouts', label: 'Tryouts' },
            { value: 'private-coaching', label: 'Private Coaching' },
            { value: 'strength-training', label: 'Speed Strength & Agility Training' },
            { value: 'skills-academy', label: 'Skills Academy' },
            { value: 'open-play', label: 'Open Play / Scrimmage' }
        ]
    },
    {
        id: 'eventStatus',
        type: 'select',
        label: 'Event Status',
        placeholder: 'Event Status',
        options: [
            { value: 'all', label: 'All Status' },
            { value: 'registration-open', label: 'Registration Open' },
            { value: 'event-started', label: 'Event Started' },
            { value: 'event-finished', label: 'Event Finished' }
        ]
    },
    {
        id: 'skillLevel',
        type: 'select',
        label: 'Skill Level',
        placeholder: 'Skill Level',
        options: [
            { value: 'all', label: 'All Types' },
            { value: 'beginner', label: 'Beginner' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' }
        ]
    },
    {
        id: 'dateRange',
        type: 'select',
        label: 'Date Range',
        placeholder: 'Date Range',
        options: [
            { value: 'anytime', label: 'Anytime' },
            { value: 'this-weekend', label: 'This Weekend' },
            { value: 'next-7-days', label: 'Next 7 Days' },
            { value: 'next-30-days', label: 'Next 30 Days' }
        ]
    }
] as const

// Components
const AccordionFilter = ({
    section,
    isOpen,
    onToggle
}: {
    section: FilterSection
    isOpen: boolean
    onToggle: () => void
}) => (
    <div className="space-y-2">
        <button
            className="flex justify-between w-full font-medium items-center hover:opacity-80 transition-opacity"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={`${section.id}-content`}
        >
            {section.label}
            <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                    }`}
            />
        </button>

        {isOpen && (
            <div
                id={`${section.id}-content`}
                className="space-y-2 pl-2 text-sm animate-in fade-in duration-200"
            >
                {section.options?.map((option) => (
                    <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded px-2 py-1 transition-colors"
                    >
                        <input
                            type="radio"
                            name={section.id}
                            value={option.value}
                            className="accent-blue-500"
                        />
                        {option.label}
                    </label>
                ))}
            </div>
        )}
    </div>
)

const SelectFilter = ({ section }: { section: FilterSection }) => (
    <Select>
        <SelectTrigger className="w-full">
            <SelectValue placeholder={section.placeholder} />
        </SelectTrigger>
        <SelectContent>
            {section.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                    {option.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
)

const InputFilter = ({ section }: { section: FilterSection }) => (
    <Input
        placeholder={section.placeholder}
        aria-label={section.label}
        className="focus:border-blue-500 focus:ring-blue-500"
    />
)

// Main Component
export function FilterSidebar() {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        age: true
    })

    const toggleSection = (sectionId: string) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }))
    }

    const renderFilterSection = (section: FilterSection) => {
        switch (section.type) {
            case 'input':
                return <InputFilter section={section} />

            case 'select':
                return <SelectFilter section={section} />

            case 'accordion':
                return (
                    <AccordionFilter
                        section={section}
                        isOpen={!!openSections[section.id]}
                        onToggle={() => toggleSection(section.id)}
                    />
                )

            default:
                return null
        }
    }

    return (
        <div
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6 sticky top-26"
            role="search"
            aria-label="Filter events"
        >
            {FILTER_SECTIONS.map((section) => (
                <div key={section.id}>
                    {renderFilterSection(section)}
                </div>
            ))}
        </div>
    )
}