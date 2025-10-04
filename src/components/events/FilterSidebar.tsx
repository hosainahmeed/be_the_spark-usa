"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { AgeOptions, DateRange, EventStatus, EventTypes, SkillLevel, SportOptions } from "@/constants/constantsOptions"

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
        options: SportOptions
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
        options: EventTypes
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

export const AccordionFilter = ({
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

export const SelectFilter = ({ section }: { section: FilterSection }) => (
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

export const InputFilter = ({ section }: { section: FilterSection }) => (
    <Input
        placeholder={section.placeholder}
        aria-label={section.label}
        className="focus:border-blue-500 focus:ring-blue-500"
    />
)


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