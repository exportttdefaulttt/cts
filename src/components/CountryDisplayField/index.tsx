type CountryDisplayFieldProps = {
    singularLabel: string;
    pluralLabel?: string;
    data: string | string[];
    shouldTruncate?: boolean;
    hasWrapper?: boolean;
};

const CountryDisplayField = ({ singularLabel, pluralLabel, data, shouldTruncate, hasWrapper }: CountryDisplayFieldProps) => {

    const isArray = Array.isArray(data);
    const isMultiple = isArray && data.length > 1;

    const label = isMultiple ? pluralLabel : singularLabel;
    const content = isArray ? 
        shouldTruncate && data.length > 2 ? `${data.slice(0, 2).join(', ')} ...` : data.join(', ') 
        : data;

    return hasWrapper ? (
        <div>
            <p>{label}:</p>
            <span>{content}</span>
        </div>
    ) : <p>{label}: <span>{content}</span></p>;
}
 
export default CountryDisplayField;