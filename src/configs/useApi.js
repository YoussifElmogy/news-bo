import { useCallback, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = useCallback(
    async (method, endpoint, data = null, options = {}) => {
      setLoading(true);
      setError(null);

      const idToken = Cookies.get('idToken');
      const isFormData = data instanceof FormData;

      const headers = {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        ...(options.headers || {}),
      };

      if (isFormData && headers['Content-Type']) {
        delete headers['Content-Type'];
      }

      try {
        const axiosConfig = {
          method,
          url: `${API_BASE_URL}${endpoint}`,
          headers,
          data,
          ...options,
        };
        // Only attach onUploadProgress for POST/PUT with FormData
        if (
          (method === 'POST' || method === 'PUT') &&
          isFormData &&
          options.onUploadProgress
        ) {
          axiosConfig.onUploadProgress = options.onUploadProgress;
        }
        // Remove onUploadProgress from axiosConfig if not needed
        if (axiosConfig.onUploadProgress === undefined) {
          delete axiosConfig.onUploadProgress;
        }
        const res = await axios(axiosConfig);
        return res.data;
      } catch (err) {
        // Handle 401 Unauthorized - logout and redirect to login
        if (err.response?.status === 401) {
          // Clear all auth-related cookies
          Cookies.remove('idToken');
          Cookies.remove('refreshToken');
          Cookies.remove('user');

          // Redirect to login page
        //   window.location.href = '/login';
          return;
        }

        setError(err.response?.data || err);
        throw err.response?.data || err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    get: (endpoint, options) => makeRequest('GET', endpoint, null, options),
    post: (endpoint, data, options) =>
      makeRequest('POST', endpoint, data, options),
    put: (endpoint, data, options) =>
      makeRequest('PUT', endpoint, data, options),
    patch: (endpoint, data, options) =>
      makeRequest('PATCH', endpoint, data, options),
    del: (endpoint, options) => makeRequest('DELETE', endpoint, null, options),
    loading,
    error,
    setLoading,
  };
};

export default useApi;
