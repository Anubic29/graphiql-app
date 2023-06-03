import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthHeader } from '../../components';

import styles from './AuthLayout.module.scss';

function AuthLayout() {
  return (
    <>
      <AuthHeader />
      <div className={styles['container']}>
        <Outlet />
      </div>
    </>
  );
}

export default AuthLayout;
