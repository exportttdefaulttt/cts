import { defineFields, getCountriesByRegion, getCountriesByCodes, getCountriesByName } from '@yusifaliyevpro/countries';
import type { CountryPicker, Region } from '@yusifaliyevpro/countries/types';

export type Codes = Parameters<typeof getCountriesByCodes>[0]['codes'];

export type AppRegion = Exclude<Region, 'Antarctic'>;

export type Country = ReturnType<typeof transformCountry>;

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export type Pagination = {
    currentPage: number;
    totalItems: number | null;
    itemsPerPage: number;
};

const countryFields = defineFields([
    'name', 'region', 'subregion', 'capital', 'flags', 'area',
    'population', 'currencies', 'languages', 'cca2', 'tld', 'borders'
]);

function transformCountry(country: CountryPicker<typeof countryFields>) {
    return {
        name: country.name.common,
        officialName: country.name.official,
        region: country.region,
        subregion: country.subregion,
        capital: country.capital,
        flagImg: country.flags.png,
        flagAlt: country.flags.alt,
        area: country.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
        population: country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
        currencies: country.currencies && Object.values(country.currencies).map(currency => currency.name),
        languages: country.languages && Object.values(country.languages),
        alphaCode: country.cca2,
        urlPath: country.name.common.replace(/\s+/g, '-').toLowerCase(),
        topLevelDomains: country.tld,
        borders: country.borders,
    };
}

function ensureResult<T>(res: T | null): T {
    if (res === null) {
        throw new Error('Countries not found');
    }

    return res;
}

export const api = {
    async getCountriesByRegion(region: AppRegion): Promise<Country[]> {
        const res = ensureResult(await getCountriesByRegion({ region, fields: countryFields }));
        return res.map(transformCountry);
    },
    async getCountriesByCodes(codes: Codes): Promise<Country[]> {
        const res = ensureResult(await getCountriesByCodes({ codes, fields: countryFields }));
        return res.map(transformCountry);
    },
    async getCountriesByName(name: string, fullText?: boolean): Promise<Country[]> {
        const res = ensureResult(await getCountriesByName({ name, fullText, fields: countryFields }));
        return res.map(transformCountry);
    }
};