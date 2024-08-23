import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobsSlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        search: searchReducer,
    },
});

export default store;
