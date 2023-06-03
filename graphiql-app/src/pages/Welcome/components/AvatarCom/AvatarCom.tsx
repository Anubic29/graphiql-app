import React from 'react';
import { Avatar, Typography } from '@mui/material';

import styles from './AvatarCom.module.scss';

interface AvatarProps {
  person: {
    avatar: string;
    name: string;
  };
}

function AvatarCom(props: AvatarProps) {
  const { person } = props;

  return (
    <div className={styles['avatar-block']}>
      <Avatar alt={person.name} src={person.avatar} sx={{ width: 90, height: 90 }} />
      <Typography variant="h5" className={styles['avatar-name']}>
        {person.name}
      </Typography>
    </div>
  );
}

export default AvatarCom;
