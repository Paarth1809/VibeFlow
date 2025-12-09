import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAudiobooks = (query: string = "") => {
    return useQuery({
        queryKey: ['audiobooks', query],
        queryFn: async () => {
            const { data } = await axios.get(`/api/audiobooks?q=${query}&limit=6`);
            // LibriVox format usually returns { books: [...] }
            return data.books || [];
        }
    });
};
