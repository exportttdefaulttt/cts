import { createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '@/store';
import type { ThunkExtra } from '@/store/extra';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{ 
    state: RootState;
    dispatch: AppDispatch;
    extra: ThunkExtra; 
}>();

export const createAppSelector = createSelector.withTypes<RootState>();