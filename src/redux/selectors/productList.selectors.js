import {createSelector} from 'reselect';

export const selectProductLists = state => state.productLists.productLists;

export const getProductListByType = createSelector([selectProductLists, (_, productType) => productType], (productLists, type) => {
  return productLists.filter(productList => productList.type === type);
});
