import { useEffect, useRef, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectBorderCountriesWithPagination, selectBorderCountriesLoadingStatusFlags, selectPaginationPagesInfo } from '@/store/slices/borderCountries/selectors';
import { updateCurrentPage, resetPagination, resetBorderCountries, fetchBorderCountries } from '@/store/slices/borderCountries/actions';
import { updateSelectedCountryName } from '@/store/slices/countryInfo/actions';
import { scrollToElement } from '@/utils/scrollToElement';
import type { Codes } from '@/api';
import CountriesList from '@/components/CountriesList';
import Pagination from '@/components/Pagination';

import styles from './BorderCountries.module.scss';

type BorderCountriesProps = {
    borders: Codes;
};

const BorderCountries = ({ borders }: BorderCountriesProps) => {

    const countries = useAppSelector(selectBorderCountriesWithPagination);
    const { totalPages, currentPage, hasMultiplePages, hasPrevPage, hasNextPage } = useAppSelector(selectPaginationPagesInfo);
    const { isLoading, isError } = useAppSelector(selectBorderCountriesLoadingStatusFlags);

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
        if (!borders) return;
        dispatch(fetchBorderCountries(borders));

        return () => {
            dispatch(resetPagination());
            dispatch(resetBorderCountries());
        };
    }, [dispatch, borders]);

    return (
        <>
            <div className={styles.root}>
                <CountriesList 
                    countries={countries}
                    isLoading={isLoading}
                    isError={isError}
                    rows={1}
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
        </>
    );
}
 
export default BorderCountries;