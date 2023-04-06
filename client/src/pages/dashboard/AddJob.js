import styled from 'styled-components';
import { FormRow, FormRowSelect, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';

const AddJob = () => {
  const {
    language,
    isLoading,
    showAlert,
    displayAlert,
    isEditing,
    position,
    company,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    jobLocation,
    createJob,
    editJob,
    handleChange,
    clearValues,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  const handleJobInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'Αλλαγή Εργασίας' : 'Προσθήκη Εργασίας'} </h3>
        {showAlert && <Alert />}

        {/* position */}
        <div className="form-center">
          <FormRow
            labelText={
              language === 'english'
                ? 'Job Position'
                : language === 'svenska'
                ? 'Befattning'
                : 'Θέση Εργασίας'
            }
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            labelText={
              language === 'english'
                ? 'Company'
                : language === 'svenska'
                ? 'Företag'
                : 'Εταιρεία'
            }
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            labelText={
              language === 'english'
                ? 'Location'
                : language === 'svenska'
                ? 'Spårande'
                : 'Τοποθεσία'
            }
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job type */}
          <FormRowSelect
            labelText={
              language === 'english'
                ? 'Job Type'
                : language === 'svenska'
                ? 'Arbetstyp'
                : 'Τύπος Εργασίας'
            }
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* job status */}
          <FormRowSelect
            labelText={
              language === 'english'
                ? 'Status'
                : language === 'svenska'
                ? 'Status'
                : 'Κατάσταση'
            }
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {language === 'english'
                ? 'Submit'
                : language === 'svenska'
                ? 'Skicka In'
                : 'Αποθήκευση'}
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
             {language === 'english'
                ? 'Clear'
                : language === 'svenska'
                ? 'Klar'
                : 'Εκκαθάριση'}
              
            </button>
          </div>
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
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default AddJob;
