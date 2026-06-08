import { createAppSelector } from "@/store/helpers";
import {
    selectCountriesByRegion,
    selectCountriesByRegionLoadingStatus,
    selectIsOddStep,
    selectPagination,
    selectPaginationTotalItems,
    selectPaginationItemsPerPage,
    selectPaginationCurrentPage
} from '@/store/slices/countriesByRegion';

export { selectActiveRegion } from '@/store/slices/countriesByRegion';

export const selectCountriesByRegionWithPagination = createAppSelector(
    [selectCountriesByRegion, selectPagination],
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
    [selectPaginationTotalItems, selectIsOddStep],
    (totalItems, isOddStep) => {
        const step = isOddStep ? 3 : 2;
        const minItemsPerPage = isOddStep ? 9 : 10;
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

export const selectCountriesByRegionLoadingStatusFlags = createAppSelector(
    [selectCountriesByRegionLoadingStatus],
    (status) => ({
        isIdle: status === 'idle',
        isLoading: status === 'loading',
        isSuccess: status === 'success',
        isError: status === 'error',
    })
);