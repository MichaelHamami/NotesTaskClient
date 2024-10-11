import {createSelector} from 'reselect';

export const selectNotes = state => state.notes.notes;

export const getNoteById = createSelector([selectNotes, (_, id) => id], (notes, id) => {
  return notes.find(note => note._id === id);
});
