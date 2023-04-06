import React, { useState } from 'react';
import BarChart from './BarChartComponent';
import AreaChart from './AreaChartComponent';
import { useAppContext } from '../context/appContext';
import styled from 'styled-components';

function ChartsContainer() {
  const [barChart, setBarChart] = useState(true);
  const { language, monthlyApplications: data } = useAppContext();

  return (
    <Wrapper>
      <h4>
        {' '}
        {language === 'english'
          ? 'Montly Data'
          : language === 'svenska'
          ? 'Månadsdata'
          : 'Μηνιαία Δεδομένα'}
      </h4>

      {barChart ? (
        <h5>
          {language === 'english'
            ? 'Bar Chart'
            : language === 'svenska'
            ? 'Stapeldiagram'
            : 'Ραβδόγραμμα'}
        </h5>
      ) : (
        <h5>
          {' '}
          {language === 'english'
            ? 'Area Chart'
            : language === 'svenska'
            ? 'Områdesdiagram'
            : 'Γράφημα Περιοχής'}
        </h5>
      )}

      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}

      <button type="button" onClick={() => setBarChart(!barChart)}>
      {language === 'english'
          ? 'Change Chart'
          : language === 'svenska'
          ? 'Ändra Diagram'
          : 'Αλλαγή Γραφήματος'}
        
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    padding: 0.5rem;
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 1.75rem;
  }
  h5 {
    margin: 1rem 0 0.5rem 0;
  }
  .recharts-surface {
    padding-right: 2.5rem;
  }
`;

export default ChartsContainer;
