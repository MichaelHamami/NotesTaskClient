export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const GET_NOTES = 'SET_NOTES';
export const UPDATE_NOTE = 'UPDATE_NOTE';

export const addNote = data => ({
  type: ADD_NOTE,
  payload: data,
});

export const deleteNote = noteId => ({
  type: DELETE_NOTE,
  payload: {
    noteId,
  },
});

export const getNotes = notes => ({ type: GET_NOTES, payload: notes });

export const updateNote = (id, data) => ({ type: UPDATE_NOTE, payload: { id, data } });
