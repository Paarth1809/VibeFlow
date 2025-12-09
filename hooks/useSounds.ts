
import { useQuery } from "@tanstack/react-query";

export const useSounds = (query: string = "nature") => {
    return useQuery({
        queryKey: ["sounds", query],
        queryFn: async () => {
            const res = await fetch(`/api/sounds/freesound?q=${query}`);
            const data = await res.json();
            return data.results || [];
        },
    });
};
