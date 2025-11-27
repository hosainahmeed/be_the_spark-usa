// 'use client'
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react'
// import PopularSportSectionAnimationStyle from './PopularSportSectionAnimationStyle';
import { StaticImageData } from 'next/image';

function SportCategoryCard({ title, background, icon }: { title: string, background: StaticImageData, icon: string }) {
    // const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    return (
        <Card style={{
            backgroundImage: `url(${background.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}
            // onMouseEnter={() => setHoverIndex(index)}
            // onMouseLeave={() => setHoverIndex(null)}
            className="flex relative shadow-none overflow-hidden items-center justify-center flex-col"
        >
            <div>
                <Image
                    className="w-20 h-20"
                    src={icon} alt={title} width={100} height={100} />
            </div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            {/* {index === hoverIndex && <div className="absolute z-10 pointer-events-none inset-0">
                <PopularSportSectionAnimationStyle />
            </div>} */}
        </Card>
    )
}

export default SportCategoryCard
