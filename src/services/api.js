import axios from 'axios';

const BASE_URL = 'https://skills-api-zeta.vercel.app';

export const fetchJobs = (cursor = 0, limit = 12) => {
    return axios.get(`${BASE_URL}/jobs?cursor=${cursor}&limit=${limit}`);
};

export const searchJobs = (query) => {
    return axios.get(`${BASE_URL}/jobs/search?query=${query}`);
};

export const fetchJobDetails = (id) => {
    return axios.get(`${BASE_URL}/job/${id}`);
};

export const fetchSkillDetails = (id) => {
    return axios.get(`${BASE_URL}/skill/${id}`);
};
