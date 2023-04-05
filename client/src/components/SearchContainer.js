import { Alert, FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import { useState, useMemo } from 'react';
import styled from 'styled-components';

const SearchContainer = () => {
  const { showAlert } = useAppContext();
  const [localSearch, setLocalSearch] = useState('');
  const {
    isLoading,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    clearFilters();
  };

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };

  // eslint-disable-next-line
  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className="form">
        <h3>Φίλτρα Αναζήτησης</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow // Πεδίο Αναζήτησης
            labelText={'Αναζήτηση'}
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          <FormRowSelect // Αναζήτηση μέσω κατάστασης
            labelText="Φάση Αίτησης"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={['Όλα', ...statusOptions]}
          />
          <FormRowSelect // Αναζήτηση μέσω τύπου
            labelText="Τύπος Εργασίας"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={['Όλα', ...jobTypeOptions]}
          />
          <FormRowSelect
            labelText="Οργάνωση"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Καθαρισμός Φίλτρων
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);

  .form {
    margin: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;

export default SearchContainer;
