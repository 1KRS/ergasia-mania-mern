import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Job from './Job';
import styled from 'styled-components';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
  const {
    language,
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext();
  
  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>
          {language === 'english'
            ? 'No jobs found...'
            : language === 'svenska'
            ? 'Inga jobb hittades...'
            : 'Δεν βρέθηκαν εργασίες...'}
        </h2>
      </Wrapper>
    );
  }

  
    /* <h4>{totalJobs} job{jobs.length > 1 && 's'} found */
  
  return (
    <Wrapper>
      <h4>
        {jobs.length > 1 ? 'Βρέθηκαν' : 'Βρέθηκε'} {totalJobs}{' '}
        {jobs.length > 1 ? 'εργασίες.' : 'εργασία.'}
      </h4>
      <div className="paginator-top">
        {numOfPages > 1 && <PageBtnContainer />}
      </div>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      <div className="paginator-bottom">
        {numOfPages > 1 && <PageBtnContainer />}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
    text-align: center;
  }
  & > h4 {
    text-transform: none;
    text-align: center;
    font-weight: 700;
    margin-bottom: 0;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  .paginator-top {
      margin-bottom 0.7rem;
  }
  .paginator-bottom {
      margin-top 1rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default JobsContainer;
