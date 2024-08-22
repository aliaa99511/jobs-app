import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';
import InfiniteScroll from '../components/InfiniteScroll';
import '../styles/JobsList.css';

function AllJobs() {
    const [jobs, setJobs] = useState([]);
    const [cursor, setCursor] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        const response = await axios.get(`https://skills-api-zeta.vercel.app/jobs?cursor=${cursor}&limit=12`);
        setJobs([...jobs, ...response.data.data.jobs]);
        setCursor(cursor + 12);
        setTotalJobs(response.data.data.meta.count);
    };

    return (
        <div>
            <h2>All Jobs ({totalJobs})</h2>
            <InfiniteScroll loadMore={loadJobs} hasMore={cursor < totalJobs}>
                <div className="job-list">
                    {jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default AllJobs;
