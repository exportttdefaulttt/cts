import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '@/store/helpers';
import type { LoadingStatus } from '@/api';
import type { Country } from '@/utils/transformCountry';

export const fetchSearchCountries = createAppAsyncThunk(
    'searchCountries/fetchSearchCountries',
    async (searchTerm: string, { extra }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return extra.api.getCountriesByName(searchTerm);
    },
    {
        condition: (searchTerm) => searchTerm.length > 2
    }
);

type SearchCountriesState = {
    countries: Country[];
    countriesLoadingStatus: LoadingStatus;
    searchTerm: string;
};

const initialState: SearchCountriesState = {
    countries: [],
    countriesLoadingStatus: 'idle',
    searchTerm: ''
};

const searchCountriesSlice = createSlice({
    name: 'searchCountries',
    initialState,
    reducers: {
        updateSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
            state.countriesLoadingStatus = action.payload.length ? state.countriesLoadingStatus : 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchCountries.pending, (state) => {
                state.countriesLoadingStatus = 'loading';
            })
            .addCase(fetchSearchCountries.fulfilled, (state, action) => {
                state.countriesLoadingStatus = 'success';
                state.countries = action.payload;
            })
            .addCase(fetchSearchCountries.rejected, (state) => {
                state.countriesLoadingStatus = 'error';
            })
            .addDefaultCase(() => { });
    },
    selectors: {
        selectCountries: (state) => state.countries,
        selectCountriesLoadingStatus: (state) => state.countriesLoadingStatus,
        selectSearchTerm: (state) => state.searchTerm,
    },
});

export const { selectCountries, selectCountriesLoadingStatus, selectSearchTerm } = searchCountriesSlice.selectors;

export const { updateSearchTerm } = searchCountriesSlice.actions;

export default searchCountriesSlice.reducer;