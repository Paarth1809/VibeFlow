import { useQuery } from "@tanstack/react-query";

export const useImages = (query: string = "music") => {
    return useQuery({
        queryKey: ["images", query],
        queryFn: async () => {
            const res = await fetch(`/api/pixabay?q=${query}&per_page=30`);
            const data = await res.json();
            return data.hits || [];
        },
    });
};
