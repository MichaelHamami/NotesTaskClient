import axios from 'axios';

const baseURL = 'http://10.0.0.17:5005';
const axiosInstance = axios.create({
  baseURL,
});

// Function to handle signup
async function signUp(fingerprint) {
  console.log('signUp called in api', fingerprint);

  const data = {
    fingerPrint: fingerprint,
  };

  const response = await axiosInstance.post('/api/auth/signup', data);
  return response.data;
}

// Function to handle login
async function logincall(fingerprint) {
  console.log('logIn called in api', fingerprint);
  const data = {
    fingerPrint: fingerprint,
  };

  const response = await axiosInstance.post('/api/auth/login', data);
  return response.data;
}

module.exports = {
  signUp,
  logincall,
};
