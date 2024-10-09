import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API URL
  timeout: 10000, // Optional: request timeout
});

// Optional: Add request/response interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    // Add headers or perform other actions
    config.headers['Authorization'] = 'Bearer YOUR_TOKEN'; // If needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle the response data
    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);

export default axiosInstance;