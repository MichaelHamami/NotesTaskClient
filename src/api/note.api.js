import axiosinstance from './api';

export async function getNotes() {
  const response = await axiosinstance.get('/api/note');
  return response.data;
}

export async function deleteNote(id) {
  const response = await axiosinstance.delete('/api/note/' + id);
  return response.data;
}

export async function createNote(data) {
  const response = await axiosinstance.post('/api/note', data);
  return response.data;
}

export async function updateNote(id, data) {
  const response = await axiosinstance.put('/api/note/' + id, data);
  return response.data;
}
