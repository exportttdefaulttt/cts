import { createAppSelector } from '@/store/helpers';
import {
    selectBorderCountries,
    selectBorderCountriesLoadingStatus,
    selectPagination,
    selectPaginationCurrentPage,
    selectPaginationItemsPerPage,
    selectPaginationTotalItems
} from '@/store/slices/borderCountries';
export { selectIsOddStep } from '@/store/slices/borderCountries';

export const selectBorderCountriesWithPagination = createAppSelector(
    [selectBorderCountries, selectPagination],
    (countries, { totalItems, itemsPerPage, currentPage }) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems!);

        return countries.slice(startIndex, endIndex);
    }
);

export const selectPaginationItemsInfo = createAppSelector(
    [selectPaginationTotalItems, selectPaginationItemsPerPage],
    (totalItems, itemsPerPage) => ({ totalItems, itemsPerPage })
);

export const selectPaginationTotalPages = createAppSelector(
    [selectPaginationItemsInfo],
    ({ totalItems, itemsPerPage }) => totalItems! && Math.ceil(totalItems / itemsPerPage)
);

export const selectPaginationPagesInfo = createAppSelector(
    [selectPaginationTotalPages, selectPaginationCurrentPage],
    (totalPages, currentPage) => ({
        totalPages,
        currentPage,
        hasMultiplePages: totalPages > 1,
        hasPrevPage: currentPage > 1,
        hasNextPage: currentPage < totalPages
    })
);

export const selectBorderCountriesLoadingStatusFlags = createAppSelector(
    [selectBorderCountriesLoadingStatus],
    (status) => ({
        isIdle: status === 'idle',
        isLoading: status === 'loading',
        isSuccess: status === 'success',
        isError: status === 'error',
    })
);