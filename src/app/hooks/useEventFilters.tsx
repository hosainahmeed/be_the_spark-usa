"use client"

import { useState } from "react"

export type EventFilters = {
    search?: string
    age?: string
    category?: string
    location?: string
    price?: string
}

export function useEventFilters() {
    const [filters, setFilters] = useState<EventFilters>({})

    const updateFilter = (key: keyof EventFilters, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value || undefined
        }))
    }

    const resetFilters = () => {
        setFilters({})
    }

    return {
        filters,
        updateFilter,
        resetFilters
    }
}
