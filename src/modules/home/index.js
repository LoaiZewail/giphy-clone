import style from './style.module.css'
import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import ResultContainer from './components/ResultContainer'
import useSearchHook from '../../hooks/useSearchHook'

function Home() {

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const { gifs, loading, error, hasMore } = useSearchHook(query, page);

    const loadMore = () => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window?.addEventListener('scroll', handleScroll);
        return () => {
            window?.removeEventListener('scroll', handleScroll);
        };
    }, [hasMore]);

    const handleScroll = () => {
        let userScrollHeight = window.innerHeight + window.scrollY;
        let windowBottomHeight = document.documentElement.scrollHeight;
        if (userScrollHeight >= windowBottomHeight - 10) {
            loadMore()
        }
    };

    return (
        <div className={style.home}>
            <Search setQuery={setQuery} setPage={setPage} />
            <ResultContainer results={gifs} />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        </div>
    )
}

export default Home