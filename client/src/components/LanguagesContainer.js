import { CircleFlag } from 'react-circle-flags';
import styled from 'styled-components';
import { useAppContext } from '../context/appContext';

const LanguagesContainer = () => {
  const { changeLanguage, isLoading } =
  useAppContext();

  return (
    <Wrapper className="">
      <div className="flag-container">
        <button
          type="button"
          className="flag-btn"
          disabled={isLoading}
          onClick={() => {
            changeLanguage('ελληνικά');
          }}
        >
          <CircleFlag countryCode="gr" className="flag" alt="Ελληνικά"/>
        </button>
        <button
          type="button"
          className="flag-btn"
          disabled={isLoading}
          onClick={() => {
            changeLanguage('english');
          }}
        >
          <CircleFlag countryCode="uk" className="flag" alt="English"/>
        </button>
        <button
          type="button"
          className="flag-btn"
          disabled={isLoading}
          onClick={() => {
            changeLanguage('svenska');
          }}
        >
          <CircleFlag countryCode="se" className="flag" alt="Svenska"/>
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
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

  @media (min-width: 992px) {
  }
`;

export default LanguagesContainer;
