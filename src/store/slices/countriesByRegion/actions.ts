import { countriesByRegionActions } from '@/store/slices/countriesByRegion';

export const {
    updateActiveRegion,
    updateCurrentPage,
    updateItemsPerPage,
    resetPagination
} = countriesByRegionActions;