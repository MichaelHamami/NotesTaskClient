import React, { useContext, useState } from 'react';

const NoteEditorContext = React.createContext();

const NoteEditorContextProvider = ({ children }) => {
  const [noteTitle, setNoteTitle] = useState('');

  return (
    <NoteEditorContext.Provider
      value={{
        noteTitle,
        setNoteTitle,
      }}>
      {children}
    </NoteEditorContext.Provider>
  );
};

const useNoteEditorContext = () => {
  const context = useContext(NoteEditorContext);

  if (context === undefined) {
    throw new Error('useNoteEditorContext Error');
  }

  return context;
};

export { NoteEditorContextProvider, useNoteEditorContext };
