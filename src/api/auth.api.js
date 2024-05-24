import axiosInstance from './api';

export async function signUp(fingerprint) {
  const data = {
    fingerPrint: fingerprint,
  };

  const response = await axiosInstance.post('/api/auth/signup', data);
  return response.data;
}

export async function login(fingerprint) {
  const data = {
    fingerPrint: fingerprint,
  };

  const response = await axiosInstance.post('/api/auth/login', data);
  return response.data;
}
