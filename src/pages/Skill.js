import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Skill() {
    const { id } = useParams();
    const [skill, setSkill] = useState(null);

    useEffect(() => {
        fetchSkill();
    }, [id]);

    const fetchSkill = async () => {
        const response = await axios.get(`https://skills-api-zeta.vercel.app/skill/${id}`);
        console.log("response skill", response);

        setSkill(response.data.skill);
    };

    if (!skill) return <p>Loading...</p>;

    return (
        <div>
            <h2>{skill.attributes.name}</h2>
        </div>
    );
}

export default Skill;
