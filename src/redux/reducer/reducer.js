import {combineReducers} from 'redux';
import noteReducer from './note.reducer';

const rootReducer = combineReducers({
  notes: noteReducer,
});

export default rootReducer;
