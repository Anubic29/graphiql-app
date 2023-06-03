import { EditorView } from '@codemirror/view';
import { tags } from '@lezer/highlight';
import { HighlightStyle } from '@codemirror/language';
import Colors from '../../../../../theme/colors';

export const lightEditorTheme = EditorView.theme(
  {
    '&': {
      'min-width': '100%',
      'min-height': '100%',
    },
    '.cm-editor': {
      'min-width': '100%',
      'min-height': '100%',
    },
    '.cm-scroller': {
      background: `${Colors.LIGHT_GREY}`,
    },
    '.cm-gutters': {
      backgroundColor: '#b4b4b4',
      color: Colors.SECONDARY_DARK,
      border: 'none',
    },
    '.cm-gutter': {},
    '.cm-gutterElement': {
      color: Colors.ACTIVE_TAB,
    },
    '.cm-activeLineGutter': {
      color: Colors.SECONDARY_DARK,
      backgroundColor: Colors.SECONDARY_MAIN,
    },
    '.cm-content': {
      caretColor: '#b4b4b4',
    },
    '.cm-line': {},
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#0e9',
    },
    '.cm-selectionLayer': {},
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: 'white',
    },
    '.cm-cursorLayer': {},
    '.cm-cursor': {},
  },
  { dark: false }
);

export const myHighlightStyleL = HighlightStyle.define([
  { tag: tags.brace, color: Colors.SECONDARY_DARK },
  { tag: tags.bracket, color: Colors.SECONDARY_DARK },
]);
