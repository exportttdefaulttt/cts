import { useEffect, useRef, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { 
    selectCountriesWithPagination, 
    selectPaginationPagesInfo,
    selectLoadingStatusFlags,
    selectActiveRegion
} from '@/store/slices/countriesByRegion/selectors';
import { updateCurrentPage, resetPagination } from '@/store/slices/countriesByRegion/actions';
import { fetchCountriesByRegion } from '@/store/slices/countriesByRegion/thunks';
import { updateSelectedCountryName } from '@/store/slices/countryInfo/actions';
import { scrollToElement } from '@/utils/scrollToElement';
import CountriesList from '@/components/CountriesList';
import Pagination from '@/components/Pagination';
import clsx from 'clsx';

import styles from './CountriesByRegion.module.scss';

const CountriesByRegion = () => {

    const countries = useAppSelector(selectCountriesWithPagination);

    const { isLoading, isError } = useAppSelector(selectLoadingStatusFlags);

    const { 
        totalPages,
        currentPage,
        hasMultiplePages,
        hasPrevPage,
        hasNextPage
    } = useAppSelector(selectPaginationPagesInfo);

    const activeRegion = useAppSelector(selectActiveRegion);

    const countriesListRef = useRef<HTMLUListElement>(null);

    const dispatch = useAppDispatch();

    const onCountrySelected = useCallback((name: string) => {
        dispatch(updateSelectedCountryName(name));
    }, [dispatch]);

    const onUpdatePage = useCallback((page: number, isCurrentPage: boolean) => {
        if (isCurrentPage) return;

        dispatch(updateCurrentPage(page));
        setTimeout(() => scrollToElement(countriesListRef), 150);
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCountriesByRegion(activeRegion));
    }, [dispatch, activeRegion]);

    useEffect(() => {
        return () => {
            dispatch(resetPagination());
        }
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <div className={clsx(styles.content, { [styles.centered]:  !countries.length && isLoading || isError })}>
                <CountriesList 
                    countries={countries}
                    isLoading={isLoading}
                    isError={isError}
                    rows={3}
                    onCountrySelected={onCountrySelected}
                    countriesListRef={countriesListRef}
                />
            </div>
            <Pagination 
                totalPages={totalPages}
                currentPage={currentPage}
                hasMultiplePages={hasMultiplePages}
                hasPrevPage={hasPrevPage}
                hasNextPage={hasNextPage}
                isLoading={isLoading}
                onUpdatePage={onUpdatePage}
            />
        </div>
    );
}
 
export default CountriesByRegion;