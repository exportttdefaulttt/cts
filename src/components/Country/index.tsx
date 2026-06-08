import { Link } from 'react-router-dom';
import type { Country as CountryProps } from '@/api';
import CountryDisplayField from '@/components/CountryDisplayField';

import styles from './Country.module.scss';

const Country = ({ flagImg, flagAlt, name, region, subregion, area, capital, population, currencies, languages, urlPath }: CountryProps) => {

    return (
        <div className={styles.root}>
            <div className={styles.top}>
                <img className={styles.img} src={flagImg} alt={flagAlt} />
                <div>
                    <h2 className={styles.name}>{name}</h2>
                    <div className={styles.main}>
                        <p className={styles.region}>
                            {region} / {subregion && subregion.length > 22 && <br/>}{subregion}
                        </p>
                        <p className={styles.area}>{area} <span>km<sup>2</sup></span></p>
                    </div>
                </div>
                <Link to={`/${urlPath}`} className={styles.link2} />
            </div>

            <div className={styles.info}>
                {capital && <CountryDisplayField singularLabel="Capital" pluralLabel="Capitals" data={capital} shouldTruncate hasWrapper />}
                <CountryDisplayField singularLabel="Population" data={population} hasWrapper />
                {currencies && <CountryDisplayField singularLabel="Currency" pluralLabel="Currencies" data={currencies} shouldTruncate hasWrapper />}
                {languages && <CountryDisplayField singularLabel="Language" pluralLabel="Languages" data={languages} shouldTruncate hasWrapper />}
            </div>

            <Link to={`/${urlPath}`} className={styles.link}>
                More info
            </Link>
        </div>
    );
}
 
export default Country;