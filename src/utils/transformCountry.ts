import type { CountryPicker } from '@yusifaliyevpro/countries/types';
import type { CountryFields, AppRegion } from '@/api';

export const transformCountry = (country: CountryPicker<CountryFields>) => {
    return {
        name: country.names.common,
        officialName: country.names.official,
        region: country.region as AppRegion,
        subregion: country.subregion,
        capital: country.capitals.map(capital => capital.name),
        flagImg: country.flag.url_png,
        flagAlt: country.flag.description,
        area: country.area.kilometers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
        population: country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
        currencies: country.currencies && Object.values(country.currencies).map(currency => currency.name),
        languages: country.languages.map(language => language.name),
        alphaCode: country.codes.alpha_2,
        urlPath: country.names.common.replace(/\s+/g, '-').toLowerCase(),
        topLevelDomains: country.tlds,
        borders: country.borders,
    };
};

export type Country = ReturnType<typeof transformCountry>;