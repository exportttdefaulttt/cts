import type { Country } from '@/api';
import CountryDisplayField from '@/components/CountryDisplayField';

import styles from './CountriesListItem.module.scss';

type CountriesListItemProps = Country & {
    onCountrySelected: (countryName: string) => void;
};

const CountriesListItem = ({ name, subregion, capital, flagImg, flagAlt, alphaCode, onCountrySelected }: CountriesListItemProps) => {

    return (
        <li onClick={() => onCountrySelected(name)} className={styles.root}>
            <div className={styles.top}>
                <img src={flagImg} alt={flagAlt} />
                <h3>{name}</h3>
            </div>
            <div className={styles.info}>
                <p className={styles.subregion}>{subregion}</p>
                {capital && <CountryDisplayField singularLabel="Capital" pluralLabel="Capitals" data={capital} shouldTruncate />}
            </div>
            <div className={styles.circle}>
                <span>{alphaCode}</span>
            </div>
        </li>
    );
}
 
export default CountriesListItem;