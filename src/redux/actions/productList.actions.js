export const ADD_PRODUCT_LIST = 'ADD_PRODUCT_LIST';
export const DELETE_PRODUCT_LIST = 'DELETE_PRODUCT_LIST';
export const GET_PRODUCT_LISTS = 'SET_PRODUCT_LISTS';

export const addProductList = data => ({
  type: ADD_PRODUCT_LIST,
  payload: data,
});

export const deleteProductList = productListId => ({
  type: DELETE_PRODUCT_LIST,
  payload: {
    productListId,
  },
});

export const getProductLists = productLists => ({type: GET_PRODUCT_LISTS, payload: productLists});
