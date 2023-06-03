import { EditorView } from '@codemirror/view';
import { tags } from '@lezer/highlight';
import { HighlightStyle } from '@codemirror/language';
import Colors from '../../../../../theme/colors';

export const baseTheme = EditorView.theme(
  {
    '&': {
      color: Colors.PRIMARY_CONTR_TEXT,
      'min-width': '100%',
      'min-height': '100%',
    },
    '.cm-editor': {
      'min-width': '100%',
      'min-height': '100%',
    },
    '.cm-scroller': {
      background: `${Colors.PRIMARY_DARK}`,
    },
    '.cm-gutters': {
      backgroundColor: '#000',
      color: '#000',
      border: 'none',
    },
    '.cm-gutter': {},
    '.cm-gutterElement': {
      color: Colors.DARK_GREY,
    },
    '.cm-activeLineGutter': {
      color: Colors.SECONDARY_DARK,
    },
    '.cm-content': {
      caretColor: '#0e9',
    },
    '.cm-line': {},
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#0e9',
    },
    '.cm-selectionLayer': {},
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: '#074',
    },
    '.cm-cursorLayer': {},
    '.cm-cursor': {},
  },
  { dark: true }
);

export const myHighlightStyle = HighlightStyle.define([
  { tag: tags.brace, color: Colors.SECONDARY_DARK },
  { tag: tags.bracket, color: Colors.SECONDARY_DARK },
]);
