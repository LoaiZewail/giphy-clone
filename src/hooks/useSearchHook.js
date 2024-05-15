import { useState, useEffect } from 'react';
import axios from 'axios';
import CardData from '../models/CardData';

const useSearchHook = (query, page) => {

    const [gifs, setGifs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setGifs([]);
    }, [query]);

    useEffect(() => {
        const fetchGifs = async () => {
            setLoading(true);
            setError(null);

            try {
                const offset = page * 10;
                const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
                    params: {
                        api_key: process.env.REACT_APP_GIPHY_KEY,
                        q: query || "Trending",
                        limit: 10,
                        offset: offset,
                    },
                });
                const newGifs = CardData.fromApiResponse(response.data);
                setGifs((prevGifs) => [...prevGifs, ...newGifs]);
                setHasMore(response.data.pagination.total_count > (offset + response.data.pagination.count));
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchGifs();
    }, [query, page]);

    return { gifs, loading, error, hasMore };
};

export default useSearchHook;
