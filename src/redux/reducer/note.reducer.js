import { ADD_NOTE, DELETE_NOTE, GET_NOTES, UPDATE_NOTE } from '../actions/note.actions';

const initialState = {
  notes: [],
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note._id != action.payload.noteId),
      };

    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };

    case UPDATE_NOTE:
      const indexToUpdate = state.notes.findIndex(note => note._id == action.payload.id);
      if (indexToUpdate === -1) {
        return state;
      }

      const updatedNote = action.payload.data;

      const updatedNotes = [
        ...state.notes.slice(0, indexToUpdate),
        { ...state.notes[indexToUpdate], ...updatedNote }, // updated item
        ...state.notes.slice(indexToUpdate + 1),
      ];

      return {
        ...state,
        notes: updatedNotes,
      };
    default:
      return state;
  }
};

export default noteReducer;
