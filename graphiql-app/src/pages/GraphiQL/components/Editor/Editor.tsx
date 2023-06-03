import React, { useEffect, useState } from 'react';
import { useThemeSwitcher } from '../../../../contexts';

import CodeMirror from '@uiw/react-codemirror';
import { lineNumbers } from '@codemirror/view';
import { history } from '@codemirror/commands';
import { autocompletion, closeBrackets } from '@codemirror/autocomplete';
import { bracketMatching, syntaxHighlighting } from '@codemirror/language';
import { json } from '@codemirror/lang-json';

import styles from './Editor.module.scss';

import { lightEditorTheme, myHighlightStyle, baseTheme } from './components';

const Editor = (props: { query: string; onChangeHandler: (value: string) => void }) => {
  const { isDark } = useThemeSwitcher();
  const [isEditorDark, setEditorTheme] = useState(isDark);

  useEffect(() => {
    setEditorTheme(isDark);
  }, [isDark]);

  const currentTheme = isEditorDark ? baseTheme : lightEditorTheme;

  return (
    <CodeMirror
      autoFocus={true}
      value={props.query ? props.query : ``}
      height="200px"
      basicSetup={{
        foldGutter: false,
        dropCursor: false,
        allowMultipleSelections: false,
        indentOnInput: false,
      }}
      extensions={[
        currentTheme,
        bracketMatching(),
        closeBrackets(),
        history(),
        autocompletion(),
        lineNumbers(),
        syntaxHighlighting(myHighlightStyle),
        json(),
      ]}
      className={styles.mirror}
      onChange={(event) => {
        props.onChangeHandler(event);
      }}
    />
  );
};

export default Editor;
