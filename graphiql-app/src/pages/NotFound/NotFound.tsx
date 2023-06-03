import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import styles from './NotFound.module.scss';

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className={styles['not-found']}>
      <div className={styles['back']}></div>
      <Container className={styles['container']}>
        <div className={styles['rocket']}></div>
        <div className={styles['content']}>
          <Typography variant="h2">404</Typography>
          <Typography variant="h3" align="center">
            {t('Page not found')}
          </Typography>
          <NavLink className={styles['button']} to="/">
            <Button variant="contained">{t('To Main Page')}</Button>
          </NavLink>
        </div>
      </Container>
    </div>
  );
}

export default NotFound;
