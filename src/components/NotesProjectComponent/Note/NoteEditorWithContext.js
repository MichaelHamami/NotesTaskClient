import React from 'react';
import { NoteEditorContextProvider } from 'context';
import NoteEditor from './NoteEditor';

const NoteEditorWithContext = ({ route }) => {
  return (
    <NoteEditorContextProvider>
      <NoteEditor noteId={route.params.noteId} />
    </NoteEditorContextProvider>
  );
};

export default NoteEditorWithContext;
