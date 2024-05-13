import {ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES} from '../actions/category.actions';

const initialState = {
  categories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => category._id != action.payload.categoryId),
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
};

export default categoryReducer;
