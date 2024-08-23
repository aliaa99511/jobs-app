import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (cursor) => {
    const response = await axios.get(`https://skills-api-zeta.vercel.app/jobs?cursor=${cursor}&limit=12`);
    return response.data.data;
});

export const fetchJobById = createAsyncThunk('jobs/fetchJobById', async (id) => {
    const response = await axios.get(`https://skills-api-zeta.vercel.app/job/${id}`);
    return response.data.data.job;
});

const jobsSlice = createSlice({
    name: 'jobs',
    initialState: {
        jobs: [],
        cursor: 0,
        totalJobs: 0,
        selectedJob: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.jobs = [...state.jobs, ...action.payload.jobs];
                state.cursor += 12;
                state.totalJobs = action.payload.meta.count;
            })
            .addCase(fetchJobById.fulfilled, (state, action) => {
                state.selectedJob = action.payload;
            });
    },
});

export default jobsSlice.reducer;
