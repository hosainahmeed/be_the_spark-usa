import React from 'react';
import { Button } from '../ui/button';
import Image, { StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
    title: string;
    description: string;
    image: StaticImageData;
    index: number;
    barBg: string;
}

const FindYourEventsSections: React.FC<Props> = ({
    title,
    description,
    image,
    index,
    barBg,
}) => {
    return (
        <section className={cn("w-full container  mx-auto  flex flex-col  items-center gap-8 md:gap-16",
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        )}>
            <div
                className={cn(
                    'flex-1 w-full md:w-1/2 h-[250px] md:h-[450px] relative',
                    index % 2 === 0 ? 'order-1' : 'order-2'
                )}
            >
                <Image
                    src={image.src}
                    alt={title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={true}
                />
            </div>

            <div
                className={cn(
                    'flex-1 flex flex-col gap-4 relative',
                    index % 2 === 0 ? 'items-start text-left' : 'items-end text-right',
                    'md:order-2'
                )}
            >
                <div
                    className={cn(
                        'absolute w-24 h-2 -top-2 rounded-br-[20px]',
                        index % 2 === 0 ? 'left-0 rounded-br-[20px]' : 'right-0 rounded-bl-[20px]',
                        barBg
                    )}
                />

                <h2 className="text-3xl sm:text-4xl font-bold">{title}</h2>
                <p className="text-base sm:text-lg text-gray-700">{description}</p>
                <Button className="mt-4 self-start md:self-auto primary-btn px-6 py-3 text-lg rounded hover:bg-white hover:text-[#BF0A30] transition-colors">
                    Start Find Events
                </Button>
            </div>
        </section>
    );
};

export default FindYourEventsSections;
