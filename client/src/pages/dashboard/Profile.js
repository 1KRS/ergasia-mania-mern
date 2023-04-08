import { useState } from 'react';
import styled from 'styled-components';
import { Alert, FormRow } from '../../components';
import { useAppContext } from '../../context/appContext';
import { translateText } from '../../utils/translateText';

const Profile = () => {
  const { user, language, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove while testing
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, location });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{translateText('Σελίδα Χρήστη', language)}</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow
            labelText={translateText('Όνομα', language)}
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            labelText={translateText('Επώνυμο', language)}
            type="text"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            labelText={translateText('ηΤαχυδρομείο', language)}
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            labelText={translateText('Τοποθεσία', language)}
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading
              ? translateText('Παρακαλώ Περιμένετε...', language)
              : translateText('Αποθήκευση Αλλαγών', language)}
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

export default Profile;
