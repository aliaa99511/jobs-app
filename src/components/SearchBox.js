
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBox.css';

function SearchBox() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (query.length >= 3) {
            navigate(`/jobs/search?query=${query}`);
        }
    }, [query, navigate]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Search jobs..."
                value={query}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default SearchBox;
