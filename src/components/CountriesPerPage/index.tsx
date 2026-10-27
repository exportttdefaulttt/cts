import { useState, useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectPaginationItemsSettings, selectLoadingStatusFlags } from '@/store/slices/countriesByRegion/selectors';
import { updateItemsPerPage } from '@/store/slices/countriesByRegion/actions';

import styles from './CountriesPerPage.module.scss';

const CountriesPerPage = () => {

    const { 
        totalItems, 
        step,
        minItemsPerPage,
        maxItemsPerPage
    } = useAppSelector(selectPaginationItemsSettings);

    const { isLoading } = useAppSelector(selectLoadingStatusFlags);

    const dispatch = useAppDispatch();

    const [value, setValue] = useState<number | string>(minItemsPerPage);

    const backgroundStyleInputValue = useMemo(() => {
        const ratio = (Number(value) - minItemsPerPage) / (maxItemsPerPage - minItemsPerPage) * 100;
        
        return `linear-gradient(90deg, #525252 ${ratio}%, #dddddd ${ratio}%)`;
    }, [value, minItemsPerPage, maxItemsPerPage]);

    useEffect(() => {
        const timerId = setTimeout(() => dispatch(updateItemsPerPage(Number(value))), 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [dispatch, value]);

    if (!totalItems) {
        return null;
    }

    return (
        <div className={styles.root}>
            <span className={styles.total}>{totalItems}</span>
            <p>Countries per page: {Number(value) < totalItems ? value : totalItems}</p>
            <input
                className={styles.inputRange}
                style={{ 'background': backgroundStyleInputValue }}
                type="range"
                min={minItemsPerPage}
                max={maxItemsPerPage}
                step={step}
                value={value}
                disabled={isLoading}
                onChange={(event) => setValue(event.target.value)}
            />
        </div>
    );
}
 
export default CountriesPerPage;