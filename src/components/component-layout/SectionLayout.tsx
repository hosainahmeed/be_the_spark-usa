import { cn } from '@/lib/utils';
import React from 'react'

function SectionLayout({ children, className }: Readonly<{
    children: React.ReactNode;
    className?: string;
}>) {
    return (
        <div className={cn('container mx-auto mb-28', className)}>
            {children}
        </div>
    )
}

export default SectionLayout