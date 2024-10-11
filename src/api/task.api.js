import axiosInstance from './api';

export async function createTask(data) {
  const response = await axiosInstance.post('/api/task', data);
  return response.data;
}

export async function updatedTask(id, data) {
  const response = await axiosInstance.put('/api/task/' + id, data);
  return response.data;
}
