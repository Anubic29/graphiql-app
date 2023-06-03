import React, { useCallback, useMemo } from 'react';
import { Typography, Divider, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import schemaGetType from '../../../../utils/SchemaGetType';
import { useSchemaDocumentation } from '../../../../contexts';
import { SArgType } from 'types/SchemaType';
import { SchemaListItem } from '../';

import styles from './SchemaWindow.module.scss';

function SchemaWindow() {
  const { schema, pushToStack, popFromStack, resetStack, getCurrentElem } =
    useSchemaDocumentation();

  const currentElem = useMemo(() => getCurrentElem(), [getCurrentElem]);
  const typeObj = useMemo(
    () => schema?.types.find((type) => type.name === currentElem.type[1]),
    [schema, currentElem]
  );

  const onClickHandlerLi = useCallback(
    (name: string, description: string, type: [string, string], args: SArgType[] = []) => {
      pushToStack({
        name,
        description,
        type,
        args,
      });
    },
    [pushToStack]
  );

  return (
    <div className={styles['schema-window-block']}>
      <div className={styles['control-panel']}>
        <Button className={styles['button']} onClick={popFromStack}>
          <ArrowBack />
        </Button>
        <Button className={styles['button']} onClick={resetStack}>
          <Typography className={styles['button-text']} variant="body2" component="span">
            Main
          </Typography>
        </Button>
      </div>
      <div className={styles['schema-window-content']}>
        <Typography variant="body2" component="span" className={styles['first-text']}>
          {currentElem.name}
        </Typography>
        {currentElem.args.length > 0 && (
          <>
            <Typography variant="body2" component="span">
              (
            </Typography>
            <ul>
              {currentElem.args.map((arg, idx) => (
                <SchemaListItem
                  key={idx}
                  text={`${arg.name}: ${schemaGetType(arg.type)[0]}`}
                  newClassName={styles['nested-item']}
                />
              ))}
            </ul>
            <Typography variant="body2" component="span" className={styles['first-text']}>
              )
            </Typography>
          </>
        )}
        <Typography variant="body2" component="span">
          : {currentElem.type[0]}
        </Typography>
      </div>
      <Typography variant="body2" className={`${styles['description']} ${styles['main-desc']}`}>
        {currentElem.description}
      </Typography>
      {typeObj && (
        <>
          <Divider className={styles['divider']} />
          <div>
            <Typography variant="h6" className={styles['title']}>
              Type Details
            </Typography>
            {typeObj.description.length > 0 && (
              <div className={styles['description']}>
                <Typography variant="body2">{typeObj.description}</Typography>
                <Typography variant="body2" className={styles['type']}>
                  {typeObj.kind} {typeObj.name}
                </Typography>
              </div>
            )}
            {(typeObj.fields || typeObj.inputFields) && (
              <div>
                <Typography variant="body2" className={styles['first-text']}>
                  type {typeObj.name} {`{`}
                </Typography>
                <ul>
                  {typeObj.fields?.map((field, idx) => (
                    <SchemaListItem
                      key={idx}
                      text={`${field.name}: ${schemaGetType(field.type)[0]}`}
                      newClassName={styles['nested-item']}
                      onClickHandler={() =>
                        onClickHandlerLi(
                          field.name,
                          field.description,
                          schemaGetType(field.type),
                          field.args
                        )
                      }
                    />
                  ))}
                  {typeObj.inputFields?.map((field, idx) => (
                    <SchemaListItem
                      key={idx}
                      text={`${field.name}: ${schemaGetType(field.type)[0]}`}
                      newClassName={styles['nested-item']}
                      onClickHandler={() =>
                        onClickHandlerLi(field.name, field.description, schemaGetType(field.type))
                      }
                    />
                  ))}
                </ul>
                <Typography variant="body2" className={styles['first-text']}>{`}`}</Typography>
              </div>
            )}
          </div>
        </>
      )}
      {currentElem.args.length > 0 && (
        <>
          <Divider className={styles['divider']} />
          <div>
            <Typography variant="h6" className={styles['title']}>
              Arguments
            </Typography>
            <ul>
              {currentElem.args.map((arg, idx) => (
                <SchemaListItem
                  key={idx}
                  text={`${arg.name}: ${schemaGetType(arg.type)[0]}`}
                  onClickHandler={() =>
                    onClickHandlerLi(arg.name, arg.description, schemaGetType(arg.type))
                  }
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default SchemaWindow;
