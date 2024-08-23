import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../slices/jobsSlice';
import JobCard from '../components/JobCard';
import InfiniteScroll from '../components/InfiniteScroll';
import '../styles/JobsList.css';

function AllJobs() {
    const dispatch = useDispatch();
    const { jobs, cursor, totalJobs } = useSelector((state) => state.jobs);

    useEffect(() => {
        dispatch(fetchJobs(cursor));
    }, [dispatch, cursor]);

    const loadJobs = () => {
        dispatch(fetchJobs(cursor));
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
