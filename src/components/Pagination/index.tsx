import styles from './Pagination.module.scss';

type PaginationProps = {
    totalPages: number;
    currentPage: number;
    hasMultiplePages: boolean;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    isLoading: boolean;
    onUpdatePage: (page: number, isCurrentPage: boolean) => void;
};

const Pagination = ({ totalPages, currentPage, hasMultiplePages, hasPrevPage, hasNextPage, isLoading, onUpdatePage }: PaginationProps) => {

    if (!hasMultiplePages) {
        return null;
    }

    const prevPageButton = hasPrevPage && (
        <button className={styles.prevPage} disabled={isLoading} onClick={() => onUpdatePage(currentPage - 1, false)}>
            {'<'}
        </button>
    );

    const nextPageButton = hasNextPage && (
        <button className={styles.nextPage} disabled={isLoading} onClick={() => onUpdatePage(currentPage + 1, false)}>
            {'>'}
        </button>
    );

    const pageButtons = Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;

        return (
            <button key={page} className={isActive ? styles.active : undefined} disabled={isLoading} onClick={() => onUpdatePage(page, isActive)}>
                {page}
            </button>
        );
    });

    return (
        <div className={styles.pagination}>
            {prevPageButton}
            <div className={styles.pages}>
                {pageButtons}
            </div>
            {nextPageButton}
        </div>
    );
}
 
export default Pagination;