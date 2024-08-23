import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchJobs = createAsyncThunk('search/searchJobs', async (query) => {
    const response = await axios.get(`https://skills-api-zeta.vercel.app/jobs/search?query=${query}`);
    return response.data.data.jobs;
});

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [],
        history: JSON.parse(localStorage.getItem('searchHistory')) || [],
        status: 'idle',
    },
    reducers: {
        addToSearchHistory: (state, action) => {
            const newQuery = action.payload;
            if (!state.history.includes(newQuery)) {
                state.history.push(newQuery);
                localStorage.setItem('searchHistory', JSON.stringify(state.history));
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(searchJobs.fulfilled, (state, action) => {
            state.results = action.payload;
        });
    },
});

export const { addToSearchHistory } = searchSlice.actions;
export default searchSlice.reducer;
