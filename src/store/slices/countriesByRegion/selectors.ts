import { createAppSelector } from '@/store/helpers';
import { countriesByRegionSelectors } from '@/store/slices/countriesByRegion';

const {
    selectCountries,
    selectLoadingStatus,
    selectPagination,
    selectPaginationTotalItems,
    selectPaginationItemsPerPage,
    selectPaginationCurrentPage,
} = countriesByRegionSelectors;

export const {
    selectActiveRegion
} = countriesByRegionSelectors;

export const selectCountriesWithPagination = createAppSelector(
    [selectCountries, selectPagination],
    (countries, { currentPage, totalItems, itemsPerPage }) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems!);
        return countries.slice(startIndex, endIndex);
    }
);

export const selectPaginationItemsInfo = createAppSelector(
    [selectPaginationTotalItems, selectPaginationItemsPerPage],
    (totalItems, itemsPerPage) => ({ totalItems, itemsPerPage })
);

export const selectPaginationItemsSettings = createAppSelector(
    [selectPaginationTotalItems],
    (totalItems) => {
        const step = 3;
        const minItemsPerPage = 9;
        const maxItemsPerPage = Math.max(totalItems!, Math.ceil(totalItems! / step) * step);
        return { totalItems, step, minItemsPerPage, maxItemsPerPage };
    }
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
        hasNextPage: currentPage < totalPages,
    })
);

export const selectLoadingStatusFlags = createAppSelector(
    [selectLoadingStatus],
    (status) => ({
        isIdle: status === 'idle',
        isLoading: status === 'loading',
        isSuccess: status === 'success',
        isError: status === 'error',
    })
);