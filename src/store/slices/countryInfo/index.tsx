import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '@/store/helpers';
import type { Country, LoadingStatus } from '@/api';

export const fetchCountryInfo = createAppAsyncThunk(
    'countryInfo/fetchCountryInfo',
    (countryName: string, { extra }) => {
        return extra.api.getCountriesByName(countryName, true);
    },
    {
        condition: (countryName, { getState }) => {
            const { cacheSelectedCountries } = getState().countryInfo;
            return !!countryName && !cacheSelectedCountries[countryName];
        }
    }
);

type CountryInfoState = {
    country: Country | null;
    countryLoadingStatus: LoadingStatus;
    cacheSelectedCountries: Record<string, Country>;
    selectedCountryName: string;
};

const initialState: CountryInfoState = {
    country: null,
    countryLoadingStatus: 'idle',
    cacheSelectedCountries: {},
    selectedCountryName: '',
};

const countryInfoSlice = createSlice({
    name: 'countryInfo',
    initialState,
    reducers: {
        updateSelectedCountryName: (state, action: PayloadAction<string>) => {
            state.selectedCountryName = action.payload;
            state.country = state.cacheSelectedCountries[action.payload] || state.country;
            state.countryLoadingStatus = state.country ? 'success' : state.countryLoadingStatus;
        },
        resetSelectedCountry: (state) => {
            state.country = null;
            state.countryLoadingStatus = 'idle';
            state.selectedCountryName = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountryInfo.pending, (state) => {
                state.countryLoadingStatus = 'loading';
            })
            .addCase(fetchCountryInfo.fulfilled, (state, action) => {
                const [ country ] = action.payload;
                state.countryLoadingStatus = 'success';
                state.country = country;
                state.cacheSelectedCountries[country.name] = country;
            })
            .addCase(fetchCountryInfo.rejected, (state) => {
                state.countryLoadingStatus = 'error';
            })
            .addDefaultCase(() => { });
    },
    selectors: {
        selectCountry: (state) => state.country,
        selectCountryLoadingStatus: (state) => state.countryLoadingStatus,
        selectSelectedCountryName: (state) => state.selectedCountryName,
    },
});

export const { selectCountry, selectCountryLoadingStatus, selectSelectedCountryName } = countryInfoSlice.selectors;

export const { updateSelectedCountryName, resetSelectedCountry } = countryInfoSlice.actions;

export default countryInfoSlice.reducer;