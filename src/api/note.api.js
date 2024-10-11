import axiosInstance from './api';

export async function getNotes() {
  const response = await axiosInstance.get('/api/note');
  return response.data;
}

export async function deleteNote(id) {
  const response = await axiosInstance.delete('/api/note/' + id);
  return response.data;
}

export async function createNote(data) {
  const response = await axiosInstance.post('/api/note', data);
  return response.data;
}

export async function updateNote(id, data) {
  const response = await axiosInstance.put('/api/note/' + id, data);
  return response.data;
}
