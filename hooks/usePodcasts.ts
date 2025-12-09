
import { useQuery } from "@tanstack/react-query";

interface Podcast {
    collectionId: number;
    collectionName: string;
    artistName: string;
    artworkUrl600: string;
    artworkUrl100: string;
    feedUrl: string;
}

export const usePodcasts = (query: string = "podcast") => {
    return useQuery({
        queryKey: ["podcasts", query],
        queryFn: async () => {
            const res = await fetch(`/api/podcasts?q=${query}`);
            if (!res.ok) throw new Error("Failed to fetch podcasts");
            const data = await res.json();
            return data.results as Podcast[];
        },
    });
};
