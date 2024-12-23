import axios from 'axios';
import { API_BASE_URL } from '../../config';

export default axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
