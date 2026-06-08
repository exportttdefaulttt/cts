import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectCountry, selectCountryLoadingStatus, selectSelectedCountryName } from '@/store/slices/countryInfo/selectors';
import { fetchCountryInfo } from '@/store/slices/countryInfo/actions';

import Skeleton from '@/components/Skeleton';
import Spinner from '@/components/Spinner';
import ErrorMessage from '@/components/ErrorMessage';
import Country from '@/components/Country';

import styles from './CountryInfo.module.scss';

const CountryInfo = () => {

    const country = useAppSelector(selectCountry);
    const countryLoadingStatus = useAppSelector(selectCountryLoadingStatus);
    const selectedCountryName = useAppSelector(selectSelectedCountryName);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCountryInfo(selectedCountryName));
    }, [dispatch, selectedCountryName]);

    function setContent() {
        switch (countryLoadingStatus) {
            case 'idle':
                return <Skeleton />;
            case 'loading':
                return <Spinner />;
            case 'success':
                return country && <Country {...country} />;
            case 'error':
                return <ErrorMessage className={styles.error}>Error</ErrorMessage>;
        }
    }
    return (
        <div className={styles.root}>
            {setContent()}
        </div>
    );
}
 
export default CountryInfo;