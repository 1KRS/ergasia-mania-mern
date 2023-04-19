import main from '../assets/images/main-alternative.svg';
import styled from 'styled-components';
import logo from '../assets/images/favicon_io-Λευκό/android-chrome-192x192-Λ.png';
import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import React from 'react';
import { translateText } from '../utils/translateText';
import { LanguagesContainer } from '../components';

const Landing = () => {
  const { language, user, isLoading, loginUser } = useAppContext();
  return (
    <React.Fragment>
      {user && <Navigate to="/" />}
      <Wrapper>
        <nav>
          <div>
            <img src={logo} alt="ΕργασιοΜανία" className="logo" />
          </div>
        </nav>
        <div className="container page">
          <div className="info">
            {/* info */}
            {language === 'english' ? (
              <h1>
                Job <span>Tracking</span> App
              </h1>
            ) : language === 'svenska' ? (
              <h1>
                Jobb<span>spårning</span>app
              </h1>
            ) : (
              <h1>
                Σημείο <span>Ιχνηλάτησης</span> Εργασίας
              </h1>
            )}
            <div className="main-text-container">
              {language === 'english' ? (
                <p className="main-text main-text-en">
                  Welcome to our job tracker app, where you can have a fast
                  overview of all your work applications at a glance, important
                  information for each individual application of yours as well
                  as the monthly statistics of the last six months.
                </p>
              ) : language === 'svenska' ? (
                <p className="main-text main-text-se">
                  Välkommen till vår jobbspårningsapp, där du kan få en snabb
                  överblick över alla dina arbetsansökningar, viktig information
                  för varje enskild ansökan samt månadsstatistiken för de
                  senaste sex månaderna.
                </p>
              ) : (
                <p className="main-text main-text-el">
                  Καλώς ήλθατε στο σημείο ιχνηλάτησης της εργασίας σας, όπου
                  μπορείτε με μια ματιά να έχετε την εποπτεία όλων αιτημάτων σας
                  για εργασία, σημαντικές πληροφορίες για κάθε ξεχωριστό αίτημά
                  σας καθώς και μηνιαία στατιστικά του τελευταίου εξαμήνου.
                </p>
              )}
            </div>
            <footer>
              <div className="actions">
                <Link to="/register" className="btn btn-hero">
                  {`${translateText('Σύνδεση', language)}
                   / 
                  ${translateText('Εγγραφή', language)}`}
                  {/* Σύνδεση / Εγγραφή */}
                </Link>
                <button
                  type="button"
                  className="btn btn-hipster"
                  disabled={isLoading}
                  onClick={() => {
                    loginUser(
                      {
                        email: 'παράδειγμα@ταχυδρομείο.gr',
                        password: 'secret',
                      },
                      language
                    );
                  }}
                >
                  {isLoading
                    ? translateText('Φόρτωση...', language)
                    : translateText('Επίδειξη Εφαρμογής', language)}
                </button>
              </div>
              <LanguagesContainer />
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
    margin: 7rem auto 0;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo {
    max-height: 7.5rem;
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
    text-align: center;
    span {
      color: var(--primary-500);
    }
  }
  .main-text-container {
    display: flex;
    justify-content: center;
  }
  .main-text-container .main-text {
    color: var(--grey-600);
    text-align: center;
  }

  footer {
    border-radius: var(--borderRadius);
    display: grid;
    grid-template-rows: 1fr auto;
  }
  .actions {
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .btn-hero {
    margin: 0.5rem 0 0;
    cursor: pointer;
  }
  .btn-hipster {
    font-size: 1.25rem;
    margin: 0.5rem 0 0;
    cursor: pointer;
  }
  .main-img {
    display: none;
  }
  .flag-container {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  .flag-btn {
    width: 50px;
    height: 50px;
    border: none;
    background-color: transparent;
    transition: var(--transition);
  }
  .flag {
    width: 40px;
    height: 40px;
    padding: 5px 0;
    cursor: pointer;
  }
  .flag:hover {
    border-radius: 50%;
    box-shadow: var(--shadow-5);
  }
  .main-text-en,
  .main-text-se {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
      'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    letter-spacing: 0.03rem;
  }

  @media (min-width: 992px) {
    .logo {
      max-height: 15rem;
    }
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
    h1 {
      font-weight: 700;
      font-size: 2rem;
      text-align: center;
      span {
        color: var(--primary-500);
      }
    }
    .actions {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .btn-hero {
      font-size: 0.95rem;
      margin: 0 0.5rem 0 0;
      cursor: pointer;
    }
    .btn-hipster {
      font-size: 0.95rem;
      margin: 0 0 0 0.5rem;
      padding: 0.5rem 1.25rem;
      cursor: pointer;
    }
  }
  @media (min-width: 1194px) {
    .btn-hero,
    .btn-hipster {
      font-size: 1.25rem;
    }
  }
`;

export default Landing;
