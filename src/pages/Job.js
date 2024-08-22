import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Job() {
    const { id } = useParams();
    const [job, setJob] = useState();

    const fetchJob = async () => {
        try {
            const response = await axios.get(`https://skills-api-zeta.vercel.app/job/${id}`);
            setJob(response.data.data.job);
        } catch (error) {
            console.error("Error fetching results", error);
        }
    };

    useEffect(() => {
        fetchJob();
    }, [id]);


    if (!job) return <p>Loading...</p>

    return (
        <div>
            <h3>{job?.attributes?.title}</h3>
            <div className="skills">
                {job?.relationships?.skills.map((skill) => {
                    <p key={skill.id}>
                        {/* {skill.name}  */}
                    </p>
                })}
            </div>
        </div>
    );
}

export default Job;
