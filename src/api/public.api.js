import axiosInstance from './api';

export async function handleTasks() {
  const response = await axiosInstance.post('/api/public/handle-tasks');
  return response.data;
}
