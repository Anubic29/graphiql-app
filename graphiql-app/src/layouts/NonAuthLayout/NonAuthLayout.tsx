import React from 'react';
import { Outlet } from 'react-router-dom';
import { NonAuthHeader } from '../../components';

import styles from './NonAuthLayout.module.scss';

function NonAuthLayout() {
  return (
    <>
      <NonAuthHeader />
      <div className={styles['container']}>
        <Outlet />
      </div>
    </>
  );
}

export default NonAuthLayout;
