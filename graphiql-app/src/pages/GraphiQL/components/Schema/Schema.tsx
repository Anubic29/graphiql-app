import React, { useState } from 'react';
import { SchemaListItem, SchemaWindow } from '../';
import { useSchemaDocumentation, useThemeSwitcher } from '../../../../contexts';
import { SchemaType } from 'types/SchemaType';
import schemaGetType from '../../../../utils/SchemaGetType';
import { useTranslation } from 'react-i18next';
import COLORS from './../../../../theme/colors';
import { Typography, Divider, Box } from '@mui/material';

import styles from './Schema.module.scss';

interface SchemaProps {
  schema: SchemaType;
}

function Schema({ schema }: SchemaProps) {
  const { schemaStack, pushToStack } = useSchemaDocumentation();
  const [isActiveSchema, setIsActiveSchema] = useState(false);
  const { t } = useTranslation();
  const { isDark } = useThemeSwitcher();
  return (
    <div
      className={
        isActiveSchema ? `${styles['main-block']} ${styles['active']}` : styles['main-block']
      }
    >
      <Box
        className={styles['content']}
        style={{
          background: `${isDark ? COLORS.PRIMARY_DARK : 'white'}`,
          filter: `${
            isDark
              ? 'drop-shadow(-5px 10px 4px rgba(0, 0, 0, 0.5))'
              : 'drop-shadow(-5px 10px 4px #c8c8c8)'
          }`,
        }}
      >
        {schemaStack.length === 0 && (
          <div className={styles['queries-block']}>
            <Typography variant="h6" className={styles['title']}>
              {t('Queries')}
            </Typography>
            <Divider />
            <ul>
              {schema.types
                .find((type) => type.name === 'Query')
                ?.fields?.map((field, idx) => {
                  return (
                    <SchemaListItem
                      key={idx}
                      text={`${field.name}(...): ${schemaGetType(field.type)[0]}`}
                      onClickHandler={() =>
                        pushToStack({
                          name: field.name,
                          description: field.description,
                          type: schemaGetType(field.type),
                          args: field.args,
                        })
                      }
                    />
                  );
                })}
            </ul>
          </div>
        )}
        {schemaStack.length > 0 && <SchemaWindow />}
      </Box>
      <div
        className={styles['toggle-btn']}
        onClick={() => setIsActiveSchema((prev) => !prev)}
        style={{ background: COLORS.SECONDARY_DARK }}
      >
        {t('Schema')}
      </div>
    </div>
  );
}

export default Schema;
