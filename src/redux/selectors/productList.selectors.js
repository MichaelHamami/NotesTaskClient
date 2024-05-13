import {createSelector} from 'reselect';

export const selectProductLists = state => state.productLists.productLists;

export const getProductListByType = createSelector([selectProductLists, (_, productType) => productType], (productLists, type) => {
  return productLists.filter(productList => productList.type === type);
});

export const getProductListById = createSelector([selectProductLists, (_, id) => id], (productLists, id) => {
  return productLists.find(productList => productList._id === id);
});

export const getAllItemsFilterByProductId = createSelector([selectProductLists, (_, id) => id], (productLists, id) => {
  let items = [];
  productLists.filter(productList => productList._id !== id).map(productList => items.push(...productList.items));
  return items;
});

export const getProductItem = createSelector(
  [selectProductLists, (_, productListId) => productListId, (_, _productListId, productId) => productId],
  (productLists, productListId, productId) => {
    const productList = productLists.find(productList => productList._id === productListId);
    return productList ? productList.items.find(product => product._id === productId) : null;
  },
);
