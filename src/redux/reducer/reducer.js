import {combineReducers} from 'redux';
import noteReducer from './note.reducer';
import productListReducer from './productList.reducer';

const rootReducer = combineReducers({
  notes: noteReducer,
  productLists: productListReducer,
});

export default rootReducer;
