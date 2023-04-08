import { useAppContext } from '../context/appContext';
import { greekTerms, englishTerms, swedishTerms } from '../utils/translationTerms';



const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  const { language } = useAppContext();

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>

      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((itemValue, index) => {
          const termIndex = greekTerms.findIndex((e) => e === itemValue);
          const termInLanguage =
            language === 'english'
              ? englishTerms[termIndex]
              : language === 'svenska'
              ? swedishTerms[termIndex]
              : itemValue;
          return (
            <option key={index} value={itemValue}>
              {termInLanguage}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
