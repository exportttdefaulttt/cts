import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '@/store/helpers';
import type { Country, LoadingStatus, Codes, Pagination } from '@/api';

export const fetchBorderCountries = createAppAsyncThunk(
    'borderCountries/fetchBorderCountries',
    (codes: Codes, { extra }) => extra.api.getCountriesByCodes(codes)
);

type BorderCountriesState = {
    countries: Country[];
    countriesLoadingStatus: LoadingStatus;
    isOddStep: boolean;
    pagination: Pagination;
};

const initialState: BorderCountriesState = {
    countries: [],
    countriesLoadingStatus: 'loading',
    isOddStep: true,
    pagination: {
        currentPage: 1,
        totalItems: null,
        itemsPerPage: 3
    }
};

const borderCountriesSlice = createSlice({
    name: 'borderCountries',
    initialState,
    reducers: {
        updateCurrentPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        updateStepFlag: (state, action: PayloadAction<boolean>) => {
            state.isOddStep = action.payload;
        },
        resetPagination: (state) => {
            state.pagination.currentPage = 1;
            state.pagination.itemsPerPage = state.isOddStep ? 3 : 4;
            state.pagination.totalItems = null;
        },
        resetBorderCountries: (state) => {
            state.countriesLoadingStatus = 'loading';
            state.countries = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBorderCountries.pending, (state) => {
                state.countriesLoadingStatus = 'loading';
            })
            .addCase(fetchBorderCountries.fulfilled, (state, action) => {
                state.countriesLoadingStatus = 'success';
                state.countries = action.payload;
                state.pagination.totalItems = action.payload.length;
                state.pagination.currentPage = 1;
            })
            .addCase(fetchBorderCountries.rejected, (state) => {
                state.countriesLoadingStatus = 'error';
                state.countries = [];
                state.pagination.totalItems = null;
            })
            .addDefaultCase(() => { });
    },
    selectors: {
        selectBorderCountries: (state) => state.countries,
        selectBorderCountriesLoadingStatus: (state) => state.countriesLoadingStatus,
        selectIsOddStep: (state) => state.isOddStep,
        selectPagination: (state) => state.pagination,
        selectPaginationTotalItems: (state) => state.pagination.totalItems,
        selectPaginationItemsPerPage: (state) => state.pagination.itemsPerPage,
        selectPaginationCurrentPage: (state) => state.pagination.currentPage,
    },
});

export const {
    selectBorderCountries,
    selectBorderCountriesLoadingStatus,
    selectIsOddStep,
    selectPagination,
    selectPaginationCurrentPage,
    selectPaginationItemsPerPage,
    selectPaginationTotalItems
} = borderCountriesSlice.selectors;

export const {
    updateCurrentPage, 
    updateStepFlag,
    resetPagination,
    resetBorderCountries
} = borderCountriesSlice.actions;

export default borderCountriesSlice.reducer;