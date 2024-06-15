import {ADD_USER, DELETE_USER} from '../actions/user.actions';

const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        user: {...action.payload},
      };

    case DELETE_USER:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
