import { API_BASE_URL as DEV_API_BASE_URL } from '@env';
import { API_BASE_URL as PROD_API_BASE_URL } from '@env';

const getApiBaseUrl = () => {
  if (__DEV__) {
    return DEV_API_BASE_URL;
  } else {
    return PROD_API_BASE_URL;
  }
};
export const API_BASE_URL = getApiBaseUrl();
