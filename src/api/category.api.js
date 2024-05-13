import api from './api';

export async function getCategories() {
  const response = await api.get('/api/category');
  return response.data;
}

export async function deleteCategory(id) {
  const response = await api.delete('/api/category/' + id);
  return response.data;
}

export async function createCategory(data) {
  const response = await api.post('/api/category', data);
  return response.data;
}

export async function updateCategory(id, data) {
  const response = await api.put('/api/category/' + id, data);
  return response.data;
}

export async function addProductToCategory(id, data) {
  const response = await api.post(`/api/category/${id}/add-product`, data);
  return response.data;
}
