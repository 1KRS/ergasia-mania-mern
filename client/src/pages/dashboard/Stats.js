import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { StatsContainer, Loading, ChartsContainer } from '../../components';

const Stats = () => {
  const { language, showStats, isLoading, monthlyApplications } = useAppContext();
  useEffect(() => {
    showStats(language)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
