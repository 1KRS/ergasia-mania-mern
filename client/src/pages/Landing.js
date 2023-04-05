import main from '../assets/images/main-alternative.svg';
import styled from 'styled-components';
import { Logo } from '../components';
import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import React from 'react';

const Landing = () => {
  const { user, isLoading, loginUser } = useAppContext();
  return (
    <React.Fragment>
      {user && <Navigate to="/" />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          <div className="info">
            {/* info */}
            <h1>
              Σημείο <span>Ιχνηλάτησης</span> Εργασίας
            </h1>
            <p>
              Καλώς ήλθατε στο σημείο ιχνηλάτησης της εργασίας σας, όπου
              μπορείτε με μια ματιά να έχετε την εποπτεία όλων αιτημάτων σας για
              εργασία, σημαντικές πληροφορίες για κάθε ξεχωριστό αίτημά σας
              καθώς και μηνιαία στατιστικά του τελευταίου εξαμήνου.
            </p>
            <footer>
              <div className="actions">
                <Link to="/register" className="btn btn-hero">
                  Σύνδεση / Εγγραφή
                </Link>
                <button
                  type="button"
                  className="btn btn-hipster"
                  disabled={isLoading}
                  onClick={() => {
                    loginUser({
                      email: 'test@test.gr',
                      password: 'secret',
                    });
                  }}
                >
                  {isLoading ? 'Φόρτωση...' : 'Επίδειξη Εφαρμογής'}
                </button>
              </div>
            </footer>
          </div>
          <img src={main} alt="Job hunt" className="img main-img" />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    font-size: 2.6rem;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  footer {
    border-radius: var(--borderRadius);
    display: grid;
    grid-template-rows: 1fr auto;
  }
  .btn-hero {
    margin: 0 0.5rem 0 0;
  }
  .btn-hipster {
    font-size: 1.25rem;
    margin: 0 0 0 0.5rem;
    padding: 0.5rem 1.25rem;
    cursor: pointer;
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;
