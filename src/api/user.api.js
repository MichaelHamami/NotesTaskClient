import api from './api';

export async function getUserInfo() {
  const response = await api.get('/api/user');
  return response.data;
}

export async function updateUserInfo(data) {
  const response = await api.put('/api/user/', data);
  return response.data;
}
