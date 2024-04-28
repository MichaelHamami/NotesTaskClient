import {ADD_PRODUCT_LIST, DELETE_PRODUCT_LIST, GET_PRODUCT_LISTS, UPDATE_PRODUCT_LIST} from '../../redux/actions/productList.actions';

const initialState = {
  productLists: [],
};

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_LIST:
      return {
        ...state,
        productLists: [...state.productLists, action.payload],
      };

    case DELETE_PRODUCT_LIST:
      return {
        ...state,
        productLists: state.productLists.filter(productList => productList._id != action.payload.productListId),
      };

    case GET_PRODUCT_LISTS:
      return {
        ...state,
        productLists: action.payload,
      };

    case UPDATE_PRODUCT_LIST:
      const indexToUpdate = state.productLists.findIndex(product => product._id == action.payload.id);
      if (indexToUpdate === -1) {
        return state;
      }

      const updatedProduct = action.payload.data;

      const updatedProductLists = [
        ...state.productLists.slice(0, indexToUpdate),
        {...state.productLists[indexToUpdate], ...updatedProduct}, // updated item
        ...state.productLists.slice(indexToUpdate + 1),
      ];

      return {
        ...state,
        productLists: updatedProductLists,
      };

    default:
      return state;
  }
};

export default productListReducer;
