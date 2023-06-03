import React, { useMemo } from 'react';
import { Typography } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';

import styles from './SchemaListItem.module.scss';

interface SchemaListItemProps {
  text: string;
  newClassName?: string;
  onClickHandler?: () => void;
}

function SchemaListItem(props: SchemaListItemProps) {
  const { text, newClassName, onClickHandler } = props;

  const classNames = useMemo(() => {
    let className = styles['item'];
    if (onClickHandler) className += ` ${styles['click-item']}`;
    if (newClassName) className += ` ${newClassName}`;
    return className;
  }, [newClassName, onClickHandler]);

  return (
    <Typography variant="body2" component="li" className={classNames} onClick={onClickHandler}>
      {text} {onClickHandler && <ArrowRight />}
    </Typography>
  );
}

export default SchemaListItem;
