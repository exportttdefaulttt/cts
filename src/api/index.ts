import { defineFields, RestCountries } from '@yusifaliyevpro/countries';
import type { Region, CountryResult, CountryListResult } from '@yusifaliyevpro/countries/types';
import { transformCountry, type Country } from '@/utils/transformCountry';

const apiKey = import.meta.env.VITE_API_KEY;

export type AppRegion = Exclude<Region, 'Antarctic'>;

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export type Pagination = {
    currentPage: number;
    totalItems: number | null;
    itemsPerPage: number;
};

export type CountryFields = typeof countryFields;

type ApiResult =
    | CountryResult<CountryFields>
    | CountryListResult<CountryFields>;

const countryFields = defineFields([
    'names', 'region', 'subregion', 'capitals', 'flag', 'area',
    'population', 'currencies', 'languages', 'codes', 'tlds', 'borders'
]);

const restCountries = new RestCountries({
    apiKey,
    fetch: window.fetch.bind(window),
});

const request = async <T extends ApiResult>(promise: Promise<T>): Promise<Extract<T, { success: true }>> => {
    const response = await promise;

    if (!response.success) {
        throw response.error;
    }

    return response as Extract<T, { success: true }>;
};

const getCountriesByRegion = async (region: AppRegion): Promise<Country[]> => {
    const { countries } = await request(restCountries.getCountriesByRegion({ region, fields: countryFields, limit: 100 }));

    return countries.map(transformCountry);
};

const getCountriesByName = async (name: string, fullText?: boolean): Promise<Country[]> => {
    const { countries } = await request(restCountries.getCountriesByName({ name, fullText, fields: countryFields, limit: 100 }));

    return countries.map(transformCountry);
};

const getCountriesByCodes = async (codes: string[]): Promise<Country[]> => {
    const responses = await Promise.all(codes.map((code) => request(restCountries.getCountryByCode({ alpha_3: code, fields: countryFields }))));

    return responses.map(({ country }) => transformCountry(country));
}

export const api = {
    getCountriesByRegion,
    getCountriesByName,
    getCountriesByCodes,
};