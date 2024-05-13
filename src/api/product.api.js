import api from './api';

export async function deleteProduct(id) {
  const response = await api.delete('/api/product/' + id);
  return response.data;
}

export async function updateProduct(id, data) {
  const response = await api.put('/api/product/' + id, data);
  return response.data;
}
