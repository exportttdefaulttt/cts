import { useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectCountries, selectSearchTerm, selectCountriesLoadingStatusFlags } from '@/store/slices/searchCountries/selectors';
import { fetchSearchCountries } from '@/store/slices/searchCountries/actions';
import { updateSelectedCountryName } from '@/store/slices/countryInfo/actions';
import clsx from 'clsx';
import FoundCountriesListItem from '@/components/FoundCountriesListItem';

import styles from './FoundCountriesList.module.scss';

const FoundCountriesList = () => {

    const countries = useAppSelector(selectCountries);
    const { isSuccess } = useAppSelector(selectCountriesLoadingStatusFlags);
    const searchTerm = useAppSelector(selectSearchTerm);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchSearchCountries(searchTerm));
    }, [dispatch, searchTerm]);

    const elements = useMemo(() => {
        return countries.map(country => (
            <FoundCountriesListItem
                key={country.name}
                onClick={() => dispatch(updateSelectedCountryName(country.name))}
                searchTerm={searchTerm}
                {...country}
            />
        ));
    }, [dispatch, countries]);

    return (
        <ul 
            style={{ height: isSuccess ? countries.length * 32 + 'px' : '0px' }}
            className={clsx(styles.root, countries.length > 3 && styles.scroll)}
        >
            {elements}
        </ul>
    );
}
 
export default FoundCountriesList;