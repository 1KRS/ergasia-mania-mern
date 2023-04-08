import main from '../assets/images/main-alternative.svg';
import styled from 'styled-components';
import logo from '../assets/images/EM.en.svg';
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
          <div>
            <img src={logo} alt="ErgasioMania" className="logo" />
          </div>
        </nav>
        <div className="container page">
          <div className="info">
            {/* info */}
            <h1>
              Job <span>Tracking</span> App
            </h1>
            <p>
              Welcome to our job tracker app, where you can have a fast overview
              of all your work applications at a glance, important information
              for each individual application of yours as well as the monthly
              statistics of the last six months.
            </p>
            <footer>
              <div className="actions">
                <Link to="/register" className="btn btn-hero">
                  Login / Register
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
                  {isLoading ? 'Loading...' : 'Demo App'}
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
    margin: 7rem auto 0;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo {
    max-height: 15rem;
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
