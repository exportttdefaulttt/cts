import CountrySearch from '@/components/CountrySearch';
import FoundCountriesList from '@/components/FoundCountriesList';
import CountryInfo from '@/components/CountryInfo';

import styles from './Aside.module.scss';

const Aside = () => {
    
    return (
        <aside className={styles.aside}>
            <CountrySearch />
            <FoundCountriesList />
            <CountryInfo />
        </aside>
    );
}
 
export default Aside;