import RegionalFilter from '@/components/RegionalFilter';
import CountriesPerPage from '@/components/CountriesPerPage';
import CountriesByRegion from '@/components/CountriesByRegion';

import styles from './CountriesPage.module.scss';

const CountriesPage = () => {

    return (
        <section className={styles.section}>
            <div className={styles.top}>
                <RegionalFilter />
                <CountriesPerPage />
            </div>
            <CountriesByRegion />
        </section>
    );
}
 
export default CountriesPage;