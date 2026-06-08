import { configureStore } from '@reduxjs/toolkit';
import { extra } from '@/store/extra';
import { 
    countriesByRegionReducer, 
    countryInfoReducer, 
    searchCountriesReducer,
    borderCountriesReducer
} from '@/store/reducers';

export const store = configureStore({
    reducer: {
        countriesByRegion: countriesByRegionReducer,
        countryInfo: countryInfoReducer,
        searchCountries: searchCountriesReducer,
        borderCountries: borderCountriesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: extra } }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;