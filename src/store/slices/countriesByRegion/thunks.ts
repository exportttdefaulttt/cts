import { createAppAsyncThunk } from '@/store/helpers';
import type { AppRegion } from '@/api';

export const fetchCountriesByRegion = createAppAsyncThunk(
    'countriesByRegion/fetchCountriesByRegion',
    (region: AppRegion, { extra }) => extra.api.getCountriesByRegion(region),
    {
        condition: (region, { getState }) => {
            const { regionLoaded } = getState().countriesByRegion;
            return regionLoaded !== region;
        }
    }
);