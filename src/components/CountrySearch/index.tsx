import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectTotalCountries, selectCountriesLoadingStatusFlags } from '@/store/slices/searchCountries/selectors';
import { updateSearchTerm } from '@/store/slices/searchCountries/actions';
import Spinner from '@/components/Spinner';

import styles from './CountrySearch.module.scss';

const CountrySearch = () => {
    
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string | undefined>(undefined);

    const totalCountries = useAppSelector(selectTotalCountries);
    const { isLoading, isSuccess, isError } = useAppSelector(selectCountriesLoadingStatusFlags);
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timerId = setTimeout(() => {
            const searchTerm = value.trim();

            if (searchTerm && searchTerm.length < 3) {
                setError('Please enter at least 3 characters');
            } else {
                setError(undefined);
                dispatch(updateSearchTerm(searchTerm));
            }
        }, 1000);

        return () => {
            clearTimeout(timerId);
        }
    }, [dispatch, value]);

    return (
        <div className={styles.wrapper}>
            <label htmlFor="search" className={styles.search}>
                Search:
                    {error && <span className={styles.errorText}> {error}</span>}
                    {!error && isError && <span className={styles.errorText}> No results</span>}
                    {!error && isSuccess && <span className={styles.success}> Total countries found - {totalCountries}</span>}
            </label>
            <div className={styles.root}>
                <input
                    id='search'
                    autoComplete="off"
                    className={error && styles.error}
                    value={value}
                    type="text"
                    placeholder="Type a country name"
                    onChange={(event) => setValue(event.target.value)}
                />
                {isLoading && <Spinner height={30} width={30} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '10px' }} />}
            </div>
        </div>
    );
}
 
export default CountrySearch;