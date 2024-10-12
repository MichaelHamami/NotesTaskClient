import axiosInstance from './api';

export async function createTask(data) {
  const response = await axiosInstance.post('/api/task', data);
  return response.data;
}

export async function updatedTask(id, data) {
  const response = await axiosInstance.put('/api/task/' + id, data);
  return response.data;
}

export async function deleteTask(id) {
  const response = await axiosInstance.delete('/api/task/' + id);
  return response.data;
}
