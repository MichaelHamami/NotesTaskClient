import axiosInstance from './api';

export async function signUp(data) {
  const body = {
    username: data.username,
    password: data.password,
  };

  const response = await axiosInstance.post('/api/auth/signup', body);
  return response.data;
}

export async function login(data) {
  const body = {
    username: data.username,
    password: data.password,
  };

  const response = await axiosInstance.post('/api/auth/login', body);
  return response.data;
}
