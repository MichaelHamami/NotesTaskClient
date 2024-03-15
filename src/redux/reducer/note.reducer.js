import {ADD_NOTE, DELETE_NOTE, GET_NOTES} from '../actions/note.actions';

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

    default:
      return state;
  }
};

export default noteReducer;
