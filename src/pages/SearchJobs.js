

import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import JobCard from '../components/JobCard';
import '../styles/SearchJobs.css'; // Add a custom CSS file for styling

function SearchJobs() {
    const [jobs, setJobs] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (query) {
            persistSearchHistory(query);
            fetchSearchResults();
        }
    }, [query]);

    const persistSearchHistory = (query) => {
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        if (!history.includes(query)) {
            history.push(query);
            localStorage.setItem('searchHistory', JSON.stringify(history));
        }
        setSearchHistory(history);
    };

    const fetchSearchResults = async () => {
        try {
            const response = await axios.get(`https://skills-api-zeta.vercel.app/jobs/search?query=${query}`);
            setJobs(response.data.data.jobs);
        } catch (error) {
            console.error("Error fetching search results", error);
        }
    };

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        setSearchHistory(history);
    }, []);

    return (
        <div className="search-jobs-container">
            <div className="search-results">
                <h2>"{query}" jobs ({jobs.length})</h2>
                <div className="job-list">
                    {jobs.length > 0 ? (
                        jobs.map((job) => <JobCard key={job.id} job={job} />)
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            </div>

            <div className="search-history">
                <h3>Search history:</h3>
                <ul>
                    {searchHistory.length > 0 ? (
                        searchHistory.map((search, index) => (
                            <li key={index}>
                                <Link to={`/jobs/search?query=${search}`}>{search}</Link>
                            </li>
                        ))
                    ) : (
                        <p>No search history</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default SearchJobs;

