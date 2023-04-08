import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import styled from 'styled-components';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  language: 'ελληνικά',
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const {
    user,
    language,
    isLoading,
    showAlert,
    displayAlert,
    registerUser,
    loginUser,
  } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUserForRegister = { name, email, password };
    const currentUserForLogin = { email, password };

    if (isMember) {
      loginUser(currentUserForLogin);
    } else {
      registerUser(currentUserForRegister);
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>
          {values.isMember
            ? language === 'english'
              ? 'Login'
              : language === 'svenska'
              ? 'Logga In'
              : 'Είσοδος'
            : language === 'english'
            ? 'Register'
            : language === 'svenska'
            ? 'Registrera'
            : 'Εγγραφή'}
        </h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            labelText={
              language === 'english'
                ? 'Name'
                : language === 'svenska'
                ? 'Namn'
                : 'Όνομα'
            }
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          labelText={
            language === 'english'
              ? 'e-Mail'
              : language === 'svenska'
              ? 'e-Post'
              : 'Ηλ. Ταχυδρομείο'
          }
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          labelText={
            language === 'english'
              ? 'Password'
              : language === 'svenska'
              ? 'Lösenord'
              : 'Κωδικός'
          }
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {values.isMember
            ? language === 'english'
              ? 'Login'
              : language === 'svenska'
              ? 'Logga In'
              : 'Σύνδεση'
            : language === 'english'
            ? 'Register'
            : language === 'svenska'
            ? 'Registrera'
            : 'Εγγραφή'}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            loginUser({
              email: 'test@test.gr',
              password: 'secret',
            });
          }}
        >
          {isLoading ? language === 'english'
              ? 'Loading...'
              : language === 'svenska'
              ? 'Laddning...'
              : 'Φόρτωση...'
            : language === 'english'
            ? 'Demo App'
            : language === 'svenska'
            ? 'Demo App'
            : 'Επίδειξη Εφαρμογής'}
        </button>
        <p>
          {values.isMember ? language === 'english'
              ? 'Not a member?'
              : language === 'svenska'
              ? 'Inte en medlem?'
              : 'Δεν είσαι μέλος; '
            : language === 'english'
            ? 'Already a member?'
            : language === 'svenska'
            ? 'Redan medlem?'
            : 'Είσαι ήδη μέλος; '}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? language === 'english'
              ? 'Register.'
              : language === 'svenska'
              ? 'Registrera.'
              : 'Εγγράψου.'
            : language === 'english'
            ? 'Login.'
            : language === 'svenska'
            ? 'Logga In.'
            : 'Συνδέσου.'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

export default Register;
