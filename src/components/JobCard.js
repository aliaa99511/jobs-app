import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/JobCard.css';

function JobCard({ job }) {
    return (
        <div className="job-card">
            <h3>{job.attributes.title}</h3>
            <div className="skills">
                {job.relationships.skills.map((skill) => (
                    <Link key={skill.id} to={`/skill/${skill.id}`} className="skill-link">
                        {/* {skill.name} */}
                    </Link>
                ))}
            </div>
            <Link to={`/job/${job.id}`}>View Job details</Link>
        </div>
    );
}

export default JobCard;
