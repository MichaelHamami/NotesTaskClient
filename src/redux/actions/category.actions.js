export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const GET_CATEGORIES = 'SET_CATEGORIES';

export const addCategory = data => ({
  type: ADD_CATEGORY,
  payload: data,
});

export const deleteCategory = categoryId => ({
  type: DELETE_CATEGORY,
  payload: {
    categoryId,
  },
});

export const getCategories = categories => ({type: GET_CATEGORIES, payload: categories});
