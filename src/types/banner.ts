export interface BannerProps {
    title: string;
    description: string;
    image: {
        src: string;
        alt: string;
        width: number;
        height: number;
    };
}

export interface SEOProps {
    title: string;
    description: string;
    imageUrl?: string;
}