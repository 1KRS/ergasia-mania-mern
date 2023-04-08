import styled from 'styled-components';
import { useAppContext } from '../context/appContext';
import { translateText } from '../utils/translateText';

const JobInfo = ({ icon, text }) => {
  const { language } = useAppContext();

  return (
    <Wrapper className="">
      <span className="icon">{icon}</span>
      <span className="text">{translateText(text, language)}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0.25rem 0 0.25rem;
  display: flex;
  align-items: center;

  .icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--grey-400);
    }
  }
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
`;

export default JobInfo;
