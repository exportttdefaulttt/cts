import type { Country } from '@/api';
import HighlightedCountryName from '@/components/HighlightedCountryName';

import styles from './FoundCountriesListItem.module.scss';

type Props = Country & {
    searchTerm: string;
    onClick: () => void;
};

const FoundCountriesListItem = ({ name, flagImg, flagAlt, searchTerm, onClick }: Props) => {

    return (
        <li className={styles.root}>
            <div onClick={onClick}>
                <img src={flagImg} alt={flagAlt} />
                <HighlightedCountryName countryName={name} searchTerm={searchTerm} />
            </div>
        </li>
    );
}
 
export default FoundCountriesListItem;