import {ADD_PRODUCT_LIST, DELETE_PRODUCT_LIST, GET_PRODUCT_LISTS} from '../../redux/actions/productList.actions';

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

    default:
      return state;
  }
};

export default productListReducer;
