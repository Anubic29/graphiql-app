import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

import styles from './MainLayout.module.scss';

function MainLayout() {
  return (
    <div className={styles['main-container']}>
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
