export const url = "https://api.playfinderusa.com";
export const imageUrl = ({ image, fallback }: { image: string, fallback?: string }) => {
    return image
        ? image?.startsWith("http")
            ? image
            : image?.startsWith("/")
                ? `${url}${image}`
                : `${url}/${image}`
        : fallback || "https://placehold.co/400";
};