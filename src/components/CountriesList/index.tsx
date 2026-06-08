import clsx from 'clsx';
import type { RefObject } from 'react';
import type { Country } from '@/api';

import CountriesListItem from '@/components/CountriesListItem';
import Spinner from '@/components/Spinner';
import ErrorMessage from '@/components/ErrorMessage';

import styles from './CountriesList.module.scss';

type CountriesListProps = {
    countries: Country[];
    isLoading: boolean;
    isError: boolean;
    rows: number;
    countriesListRef: RefObject<HTMLUListElement | null>;
    onCountrySelected: (countryName: string) => void;
};

const CountriesList = ({ countries, isLoading, isError, rows, onCountrySelected, countriesListRef }: CountriesListProps) => {

    if (isLoading && !countries.length) {
        return <Spinner />;
    }

    if (isError) {
        return (
            <ErrorMessage>
                <p>An error has occurred.<br />Try again.</p>
            </ErrorMessage>
        );
    }

    return (
        <ul 
            ref={countriesListRef}
            className={clsx(styles.root, isLoading && styles.loading)}
            style={{ 'gridTemplateRows': `repeat(${rows}, minmax(126px, auto))` }} 
        >
            {
                countries.map(country => (
                    <CountriesListItem 
                        key={country.name}
                        onCountrySelected={onCountrySelected}
                        {...country}
                    />
                ))
            }
        </ul>
    );
}
 
export default CountriesList;