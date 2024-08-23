import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchJobs, addToSearchHistory } from '../slices/searchSlice';
import JobCard from '../components/JobCard';
import '../styles/SearchJobs.css';

function SearchJobs() {
    const dispatch = useDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const { results, history } = useSelector((state) => state.search);

    useEffect(() => {
        if (query) {
            dispatch(addToSearchHistory(query));
            dispatch(searchJobs(query));
        }
    }, [dispatch, query]);

    return (
        <div className="search-jobs-container">
            <div className="search-results">
                <h2>"{query}" jobs ({results.length})</h2>
                <div className="job-list">
                    {results.length > 0 ? (
                        results.map((job) => <JobCard key={job.id} job={job} />)
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            </div>

            <div className="search-history">
                <h3>Search history:</h3>
                <ul>
                    {history.length > 0 ? (
                        history.map((search, index) => (
                            <li key={index}>
                                <a href={`/jobs/search?query=${search}`}>{search}</a>
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
