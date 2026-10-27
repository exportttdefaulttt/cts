import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchCountriesByRegion } from '@/store/slices/countriesByRegion/thunks';
import type { AppRegion, LoadingStatus, Pagination } from '@/api';
import type { Country } from '@/utils/transformCountry';

interface CountriesByRegionState {
    countries: Country[];
    loadingStatus: LoadingStatus;
    activeRegion: AppRegion;
    regionLoaded: AppRegion | null;
    pagination: Pagination;
};

const initialState: CountriesByRegionState = {
    countries: [],
    loadingStatus: 'loading',
    activeRegion: 'Europe',
    regionLoaded: null,
    pagination: {
        currentPage: 1,
        totalItems: null,
        itemsPerPage: 9,
    },
};

const countriesByRegionSlice = createSlice({
    name: 'countriesByRegion',
    initialState,
    reducers: {
        updateActiveRegion: (state, action: PayloadAction<AppRegion>) => {
            state.activeRegion = action.payload;
        },
        updateCurrentPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        updateItemsPerPage: (state, action: PayloadAction<number>) => {
            state.pagination.itemsPerPage = action.payload;
            state.pagination.currentPage = Math.min(
                state.pagination.currentPage,
                Math.ceil(state.pagination.totalItems! / state.pagination.itemsPerPage)
            );
        },
        resetPagination: (state) => {
            state.pagination.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountriesByRegion.pending, (state) => {
                state.loadingStatus = 'loading';
            })
            .addCase(fetchCountriesByRegion.fulfilled, (state, action) => {
                state.loadingStatus = 'success';
                state.countries = action.payload;
                state.pagination.totalItems = action.payload.length;
                state.pagination.currentPage = 1;
                state.regionLoaded = action.meta.arg;
            })
            .addCase(fetchCountriesByRegion.rejected, (state) => {
                state.loadingStatus = 'error';
                state.countries = [];
                state.pagination.totalItems = null;
                state.regionLoaded = null;
            })
            .addDefaultCase(() => { });
    },
    selectors: {
        selectCountries: (state) => state.countries,
        selectLoadingStatus: (state) => state.loadingStatus,
        selectActiveRegion: (state) => state.activeRegion,
        selectPagination: (state) => state.pagination,
        selectPaginationTotalItems: (state) => state.pagination.totalItems,
        selectPaginationItemsPerPage: (state) => state.pagination.itemsPerPage,
        selectPaginationCurrentPage: (state) => state.pagination.currentPage,
    },
});

export const countriesByRegionActions = countriesByRegionSlice.actions;

export const countriesByRegionSelectors = countriesByRegionSlice.selectors;

export default countriesByRegionSlice.reducer;