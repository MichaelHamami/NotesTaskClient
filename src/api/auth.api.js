import axiosInstance from './api';

export async function signUp(fingerprint) {
  console.log('signUp called in api', fingerprint);

  const data = {
    fingerPrint: fingerprint,
  };

  const response = await axiosInstance.post('/api/auth/signup', data);
  return response.data;
}

export async function login(fingerprint) {
  console.log('logIn called in api', fingerprint);
  const data = {
    fingerPrint: fingerprint,
  };

  const response = await axiosInstance.post('/api/auth/login', data);
  return response.data;
}
