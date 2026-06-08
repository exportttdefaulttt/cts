import { api } from '@/api';
import type { LoaderFunctionArgs } from 'react-router-dom';

export const singleCountryLoader = async ({ params }: LoaderFunctionArgs) => {
    const { countryName } = params;
    const formattedCountryName = countryName ? countryName.replace(/-/g, ' '): '';
    const [country] = await api.getCountriesByName(formattedCountryName, true);
    return { country };
}