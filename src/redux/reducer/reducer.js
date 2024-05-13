import {combineReducers} from 'redux';
import noteReducer from './note.reducer';
import productListReducer from './productList.reducer';
import categoryReducer from './category.reducer';

const rootReducer = combineReducers({
  notes: noteReducer,
  productLists: productListReducer,
  categories: categoryReducer,
});

export default rootReducer;
