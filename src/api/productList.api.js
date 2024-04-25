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
