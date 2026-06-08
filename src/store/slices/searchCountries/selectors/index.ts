import { createAppSelector } from '@/store/helpers';
import { selectCountries, selectCountriesLoadingStatus } from '@/store/slices/searchCountries';

export { selectSearchTerm, selectCountries } from '@/store/slices/searchCountries';

export const selectTotalCountries = createAppSelector(
    [selectCountries],
    (countries) => countries.length
);

export const selectCountriesLoadingStatusFlags = createAppSelector(
    [selectCountriesLoadingStatus],
    (status) => ({
        isIdle: status === 'idle',
        isLoading: status === 'loading',
        isSuccess: status === 'success',
        isError: status === 'error',
    })
);