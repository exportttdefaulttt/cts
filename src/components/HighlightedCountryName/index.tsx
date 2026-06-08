type HighlightedCountryNameProps = {
    countryName: string;
    searchTerm: string;
};

const HighlightedCountryName = ({ countryName, searchTerm }: HighlightedCountryNameProps) => {

    const lowerCaseCountry = countryName.toLowerCase();
    const lowerCaseSearch = searchTerm.toLowerCase();

    const matchIndex = lowerCaseCountry.indexOf(lowerCaseSearch);

    if (matchIndex === -1) {
        return <h2>{countryName}</h2>;
    }

    const beforeMatch = countryName.slice(0, matchIndex);
    const matchText = countryName.slice(matchIndex, matchIndex + searchTerm.length);
    const afterMatch = countryName.slice(matchIndex + searchTerm.length);

    return (
        <h2>
            {beforeMatch}
            <span>{matchText}</span>
            {afterMatch}
        </h2>
    );
}
 
export default HighlightedCountryName;