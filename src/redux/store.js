import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer/reducer'; // your root reducer

const store = configureStore({
  reducer: rootReducer,
});

export default store;
