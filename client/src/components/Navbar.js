import styled from 'styled-components';
import { FaAlignLeft, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import { useState } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { translateText } from '../utils/translateText';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { language, toggleSidebar, changeLanguage, logoutUser, user } =
    useAppContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">{translateText('Πίνακας', language)}</h3>
        </div>
        <div className="btn-container">
          <button className="btn" onClick={() => setShowLogout(!showLogout)}>
            <CircleFlag
              countryCode={translateText('gr', language)}
              className="flag"
            />
            {user ? user.name === 'Χρήστης'? translateText('Χρήστης', language) : user.name : '-'}
            <FaCaretDown />
          </button>
          <div
            className={
              showLogout
                ? 'dropdown show-dropdown show-dropdown-firstLanguage'
                : 'dropdown'
            }
          >
            <button
              type="button"
              onClick={() => {
                const newLanguage =
                  language === 'ελληνικά' ? 'english' : 'ελληνικά';
                changeLanguage(newLanguage);
              }}
              className="dropdown-btn"
            >
              {language === 'ελληνικά' ? (
                <CircleFlag countryCode="uk" className="flag-dropdown" />
              ) : (
                <CircleFlag countryCode="gr" className="flag-dropdown" />
              )}
              {language === 'ελληνικά' ? 'English' : 'Ελληνικά'}
            </button>
          </div>
          <div
            className={
              showLogout
                ? 'dropdown show-dropdown show-dropdown-secondLanguage'
                : 'dropdown'
            }
          >
            <button
              type="button"
              onClick={() => {
                const newLanguage =
                  language === 'svenska' ? 'english' : 'svenska';
                changeLanguage(newLanguage);
              }}
              className="dropdown-btn"
            >
              {language === 'svenska' ? (
                <CircleFlag countryCode="uk" className="flag-dropdown" />
              ) : (
                <CircleFlag countryCode="se" className="flag-dropdown" />
              )}
              {language === 'svenska' ? 'English' : 'Svenska'}
            </button>
          </div>
          <div
            className={
              showLogout
                ? 'dropdown show-dropdown show-dropdown-exit'
                : 'dropdown'
            }
          >
            <button className="dropdown-btn btn-exit" onClick={logoutUser}>
              {translateText('Έξοδος', language)}
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  .logo {
    display: flex;
    align-items: center;
    margin-left: 130px;
    width: 50px;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .flag {
    width: 25px;
    height: 25px;
  }
  .flag-dropdown {
    margin-right: 5px;
    width: 13px;
    height: 13px;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  background: var(--white);
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
    font-size: 20px;
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--primary-100);
    box-shadow: var(--shadow-2);
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
  .show-dropdown-firstLanguage {
    margin-top: 0px;
  }
  .show-dropdown-secondLanguage {
    margin-top: 30px;
  }
  .show-dropdown-exit {
    margin-top: 60px;
  }
  .logo-text {
    display: none;
    margin: 0 0 0 135px;
  }
  .btn-exit {
    padding: 0.3rem 0;
    font-size: 20px;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;

export default Navbar;
