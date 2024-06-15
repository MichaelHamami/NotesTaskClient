import {combineReducers} from 'redux';
import noteReducer from './note.reducer';
import productListReducer from './productList.reducer';
import categoryReducer from './category.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  notes: noteReducer,
  productLists: productListReducer,
  categories: categoryReducer,
  user: userReducer,
});

export default rootReducer;
