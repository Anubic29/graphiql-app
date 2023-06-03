import React, { useCallback, useEffect, useState, Suspense } from 'react';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setVariables, setHeaders, setResponse, setQuery } from '../../redux/graphQLSlice';
import { useSchemaDocumentation, useThemeSwitcher } from '../../contexts';
import { useTranslation } from 'react-i18next';
import { Editor, Tab } from './components';

import {
  IconButton,
  Container,
  CircularProgress,
  Divider,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { PlayArrow, ArrowDropDown, CleaningServices } from '@mui/icons-material';

import styles from './GraphiQL.module.scss';
import COLORS from '../../theme/colors';

const Schema = React.lazy(() => import('./components/Schema/Schema'));

const url = 'https://rickandmortyapi.com/graphql';

function toParseJSON(str: string, title: string) {
  try {
    const obj = JSON.parse(str);
    return { type: 'success', data: obj };
  } catch (error) {
    return { type: 'error', data: `${title} are invalid JSON: ${(error as Error).message}` };
  }
}

function GraphiQL() {
  const { schema, loadSchemaFromServer } = useSchemaDocumentation();
  const query = useSelector((state: RootState) => state.graphQL.query);
  const variables = useSelector((state: RootState) => state.graphQL.variables);
  const headers = useSelector((state: RootState) => state.graphQL.headers);
  const response = useSelector((state: RootState) => state.graphQL.response);
  const dispatch = useDispatch();
  const [isLoaderGoing, setIsLoaderGoing] = useState(false);
  const [tabValue, setTabValue] = useState('');
  const [isError, setIsError] = useState(false);
  const { t } = useTranslation();
  const { isDark } = useThemeSwitcher();
  const [firstOpened, setFirstOpened] = useState(true);

  useEffect(() => {
    loadSchemaFromServer(url);
  }, []);

  const onClickHandler = useCallback(async () => {
    if (query) {
      setIsLoaderGoing(true);
      setIsError(false);
      try {
        const objHeader =
          headers.length > 0 ? toParseJSON(headers, 'Headers') : { type: 'success', data: {} };
        const objVariables =
          variables.length > 0
            ? toParseJSON(variables, 'Variables')
            : { type: 'success', data: {} };

        if (objHeader.type === 'error') throw new Error(objHeader.data);
        if (objVariables.type === 'error') throw new Error(objVariables.data);

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            ...objHeader.data,
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ query: query, variables: objVariables.data }),
        });
        const data = await response.json();
        dispatch(setResponse(JSON.stringify(data, null, 2)));
        if (data['errors']) setIsError(true);
      } catch (error) {
        dispatch(setResponse((error as Error).message));
        setIsError(true);
      } finally {
        setIsLoaderGoing(false);
      }
    }
  }, [dispatch, query, variables, headers]);
  const theme = useTheme();

  const [lastClicked, setLastClecked] = useState('');
  const lastClickedHandler = (valeu: string) => {
    setFirstOpened(lastClicked ? false : true);
    setLastClecked(valeu);
  };

  return (
    <Container className={styles['graph-main-block']}>
      <div className={styles['editor-block']}>
        <div className={styles['query-block']}>
          <Editor query={query} onChangeHandler={(event) => dispatch(setQuery(event))}></Editor>
          <Box className={styles['command-panel']} color="primary">
            <IconButton className={styles['btn-start']} color="primary" onClick={onClickHandler}>
              <PlayArrow sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton
              className={styles['btn-start']}
              color="primary"
              onClick={() => {
                dispatch(setQuery(''));
              }}
            >
              <CleaningServices />
            </IconButton>
          </Box>
        </div>
        <Divider />
        <div
          className={
            tabValue && !firstOpened
              ? `${styles['tab-block']} ${styles['opened']}`
              : `${styles['tab-block']}`
          }
        >
          <div className={styles['tab-panel']}>
            <Tab
              value={lastClicked === 'vars'}
              fn={() => {
                lastClickedHandler('vars');
                setTabValue('variables');
              }}
            >
              {t('Variables')}
            </Tab>
            <Tab
              value={lastClicked === 'headers'}
              fn={() => {
                lastClickedHandler('headers');
                setTabValue('headers');
              }}
            >
              {t('Headers')}
            </Tab>
            {tabValue !== '' && (
              <div
                className={styles['btn-close']}
                onClick={() => {
                  setTabValue('');
                  lastClickedHandler('');
                }}
              >
                <ArrowDropDown />
              </div>
            )}
          </div>
          {tabValue === 'variables' && (
            <div className={firstOpened ? styles['textarea-block'] : ''}>
              <Editor
                query={variables}
                onChangeHandler={(event) => dispatch(setVariables(event))}
              ></Editor>
            </div>
          )}
          {tabValue === 'headers' && (
            <div className={firstOpened ? styles['textarea-block'] : ''}>
              <Editor
                query={headers}
                onChangeHandler={(event) => dispatch(setHeaders(event))}
              ></Editor>
            </div>
          )}
        </div>
      </div>
      <div
        className={styles['response-block']}
        style={{ backgroundColor: `${isDark ? COLORS.PRIMARY_DARK : COLORS.LIGHT_GREY}` }}
      >
        {isLoaderGoing ? (
          <div className={styles['loader-block']}>
            <CircularProgress />
          </div>
        ) : (
          <div className={styles['pre-block']}>
            <Typography
              className={styles['response']}
              component={'pre'}
              sx={{
                whiteSpace: 'pre-wrap',
                color: `${isError ? theme.palette.error.dark : theme.palette.secondary.dark}`,
              }}
            >
              {response}
            </Typography>
          </div>
        )}
      </div>
      {schema && (
        <Suspense>
          <Schema schema={schema} />
        </Suspense>
      )}
    </Container>
  );
}

export default GraphiQL;
