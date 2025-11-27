export const url = "http://10.10.20.3:7050";
export const imageUrl = ({ image, fallback }: { image: string, fallback?: string }) => {
    return image
        ? image?.startsWith("http")
            ? image
            : image?.startsWith("/")
                ? `${url}${image}`
                : `${url}/${image}`
        : fallback || "https://placehold.co/400";
};