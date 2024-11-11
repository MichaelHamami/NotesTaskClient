import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as NoteActions from 'redux/actions/note.actions';
import { getNote } from 'api/note.api';

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isAppLoading, setIsAppLoading] = useState(false);

  const setAppToLoading = () => {
    setIsAppLoading(true);
  };

  const setAppToFinishedLoad = () => {
    setIsAppLoading(false);
  };

  const fetchNote = async noteId => {
    try {
      console.log('Fetching data called', new Date(), noteId);
      if (!noteId) return;
      const noteData = await getNote(noteId);
      dispatch(NoteActions.updateNote(noteId, noteData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isAppLoading,
        setAppToFinishedLoad,
        setAppToLoading,
        fetchNote,
      }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext Error');
  }

  return context;
};

export { AppContextProvider, useAppContext };
