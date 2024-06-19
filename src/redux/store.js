import {configureStore} from '@reduxjs/toolkit';
import rootReducer from 'redux/reducer/reducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
