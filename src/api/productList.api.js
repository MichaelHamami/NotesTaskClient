import api from './api';

export async function getProductLists() {
  const response = await api.get('/api/product-list');
  return response.data;
}

export async function deleteProductList(id) {
  const response = await api.delete('/api/product-list/' + id);
  return response.data;
}

export async function createProductList(data) {
  const response = await api.post('/api/product-list', data);
  return response.data;
}

export async function updateProductList(id, data) {
  const response = await api.put('/api/product-list/' + id, data);
  return response.data;
}

export async function addProductToProductList(id, data) {
  const response = await api.post(`/api/product-list/${id}/add-product`, data);
  return response.data;
}

export async function duplicateProductList(id, name) {
  const response = await api.post(`/api/product-list/${id}/duplicate`, {name});
  return response.data;
}

export async function updateProductListItems(id, itemIds, data) {
  const body = {itemIds: itemIds, itemData: data};
  const response = await api.patch(`/api/product-list/${id}/batch-update`, body);
  return response.data;
}

export async function deleteProductListItems(id, itemIds) {
  const response = await api.patch(`/api/product-list/${id}/batch-delete`, {itemIds});
  return response.data;
}

export async function generateRelativeProductList(id, name) {
  const response = await api.post(`/api/product-list/${id}/relative-shopping-list`, {name});
  return response.data;
}
