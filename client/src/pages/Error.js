import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import styled from 'styled-components';
import { useAppContext } from '../context/appContext';
import { translateText } from '../utils/translateText';

const Error = () => {
  const { language } = useAppContext();

  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>{translateText('ΩΠ! ΚΑΤΙ ΠΗΓΕ ΛΑΘΟΣ.', language)}</h3>
        <p>
          {translateText(
            'Φαίνεται ότι δεν μπορούμε να ξετρυπώσουμε την σελίδα που ψάχνεις.',
            language
          )}
        </p>
        <Link to="/">{translateText('ΕΠΙΣΤΡΟΦΗ', language)}</Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;

export default Error;
