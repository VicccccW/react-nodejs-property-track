import React from 'react';
import NoAuth from '../NoAuth';
import AllPropertyTable from './AllPropertyTable/';
import { useGlobalState } from '../../hooks/globalHook';
import SLDSGreyBoxWrap from '../SLDSGreyBoxWrap';
import SLDSGreyBox from '../SLDSGreyBox';

const intro = `
This component will load data from Postgresql Database. 
A Postgresql Database is attached as an addon to this Heroku App and sync data from Salesforce.
`;

/**
 * component main entry point
 */
const PostgresDB = () => {
  const { auth } = useGlobalState();

  return (
    <>
      {auth.isLoggedIn ? (
        <>
          <SLDSGreyBoxWrap>
            <SLDSGreyBox detail={intro} />
          </SLDSGreyBoxWrap>

          <AllPropertyTable />
        </>
      ) : (
          <NoAuth />
        )}
    </>
  );
};

export default PostgresDB;
