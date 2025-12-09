import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useMusic = (query: string) => {
    return useQuery({
        queryKey: ['music', query],
        queryFn: async () => {
            const { data } = await axios.get(`/api/music/pixabay?q=${query}`);
            return data.hits || [];
        }
    });
};
