export interface FilterOption {
    value: string
    label: string
}

export interface FilterSection {
    id: string
    type: 'input' | 'select' | 'accordion'
    label: string
    options?: FilterOption[]
    placeholder?: string
    defaultValue?: string
}