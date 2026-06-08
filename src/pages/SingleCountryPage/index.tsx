import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { resetSelectedCountry } from '@/store/slices/countryInfo/actions';
import { singleCountryLoader } from '@/router/singleCountryLoader';
import CountryDisplayField from '@/components/CountryDisplayField';
import BorderCountries from '@/components/BorderCountries';

import styles from './SingleCountryPage.module.scss';

const SingleCountryPage = () => {

    const { country } = useLoaderData<typeof singleCountryLoader>();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetSelectedCountry());
    }, [dispatch, country]);

    const onBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };
    
    return (
        <section className={styles.root}>
            <div className={styles.top}>
                <button onClick={onBack} className={styles.button} />
                <h1>{country.name} {country.name !== country.officialName && `/ ${country.officialName}`}</h1>
            </div>
            <div className={styles.details}>
                <img src={country.flagImg} alt={country.flagAlt} />
                <div>
                    <div className={styles.main}>
                        <div>
                            <h2 className={styles.name}>{country.name}</h2>
                            <p className={styles.region}>{country.region} / {country.subregion}</p>
                        </div>
                        <p className={styles.area}>{country.area} km<sup>2</sup></p>
                    </div>
                    <div className={styles.text}>
                        {country.capital && <CountryDisplayField singularLabel="Capital" pluralLabel="Capitals" data={country.capital} hasWrapper />}
                        <CountryDisplayField singularLabel="Population" data={country.population} hasWrapper />
                        {country.currencies && <CountryDisplayField singularLabel="Currency" pluralLabel="Currencies" data={country.currencies} hasWrapper />}
                        {country.languages && <CountryDisplayField singularLabel="Language" pluralLabel="Languages" data={country.languages} hasWrapper />}
                        {country.topLevelDomains && <CountryDisplayField singularLabel="TLD" pluralLabel="TLDs" data={country.topLevelDomains} hasWrapper />}
                    </div>
                </div>
            </div>
            { 
                country.borders && (
                    <>
                        <h3>Border countries:</h3>
                        <BorderCountries borders={country.borders} />
                    </>
                )       
            }
        </section>
    );
}
 
export default SingleCountryPage;