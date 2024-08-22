import React, { useEffect } from 'react';

function InfiniteScroll({ loadMore, hasMore, children }) {
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            if (hasMore) loadMore();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    return <div>{children}</div>;
}

export default InfiniteScroll;
