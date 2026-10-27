import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '@/store/helpers';
import type { AppRegion, LoadingStatus, Pagination } from '@/api';
import type { Country } from '@/utils/transformCountry';

export const fetchCountriesByRegion = createAppAsyncThunk(
    'countriesByRegion/fetchCountriesByRegion',
    (region: AppRegion, { extra }) => extra.api.getCountriesByRegion(region),
    {
        condition: (region, { getState }) => {
            const { regionLoadedCountries } = getState().countriesByRegion;
            return regionLoadedCountries !== region;
        }
    }
);

type CountriesByRegionState = {
    countriesByRegion: Country[];
    countriesByRegionLoadingStatus: LoadingStatus;
    activeRegion: AppRegion;
    regionLoadedCountries: AppRegion | null;
    isOddStep: boolean;
    pagination: Pagination;
};

const initialState: CountriesByRegionState = {
    countriesByRegion: [],
    countriesByRegionLoadingStatus: 'loading',
    activeRegion: 'Europe',
    regionLoadedCountries: null,
    isOddStep: true,
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
        updateStepFlag: (state, action: PayloadAction<boolean>) => {
            state.isOddStep = action.payload;
        },
        resetPagination: (state) => {
            state.pagination.currentPage = 1;
            state.pagination.itemsPerPage = state.isOddStep ? 9 : 10;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountriesByRegion.pending, (state) => {
                state.countriesByRegionLoadingStatus = 'loading';
            })
            .addCase(fetchCountriesByRegion.fulfilled, (state, action) => {
                state.countriesByRegionLoadingStatus = 'success';
                state.countriesByRegion = action.payload;
                state.pagination.totalItems = action.payload.length;
                state.pagination.currentPage = 1;
                state.regionLoadedCountries = action.meta.arg;
            })
            .addCase(fetchCountriesByRegion.rejected, (state) => {
                state.countriesByRegionLoadingStatus = 'error';
                state.countriesByRegion = [];
                state.pagination.totalItems = null;
                state.regionLoadedCountries = null;
            })
            .addDefaultCase(() => { });
    },
    selectors: {
        selectCountriesByRegion: (state) => state.countriesByRegion,
        selectCountriesByRegionLoadingStatus: (state) => state.countriesByRegionLoadingStatus,
        selectActiveRegion: (state) => state.activeRegion,
        selectIsOddStep: (state) => state.isOddStep,
        selectPagination: (state) => state.pagination,
        selectPaginationTotalItems: (state) => state.pagination.totalItems,
        selectPaginationItemsPerPage: (state) => state.pagination.itemsPerPage,
        selectPaginationCurrentPage: (state) => state.pagination.currentPage,
    },
});

export const {
    selectCountriesByRegion,
    selectCountriesByRegionLoadingStatus,
    selectActiveRegion,
    selectIsOddStep,
    selectPagination,
    selectPaginationTotalItems,
    selectPaginationItemsPerPage,
    selectPaginationCurrentPage
} = countriesByRegionSlice.selectors;

export const {
    updateActiveRegion,
    updateCurrentPage,
    updateItemsPerPage,
    updateStepFlag,
    resetPagination
} = countriesByRegionSlice.actions;

export default countriesByRegionSlice.reducer;