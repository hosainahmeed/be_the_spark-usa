import React from 'react'

function SectionLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='container mx-auto mb-28'>
            {children}
        </div>
    )
}

export default SectionLayout