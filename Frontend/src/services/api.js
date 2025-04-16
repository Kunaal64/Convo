import axios from 'axios';

// Use environment variables to dynamically set the API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const convertFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/convertFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress?.(percentCompleted);
      },
    });

    return response.data;
  } catch (error) {
    if (error.response?.data) {
      const reader = new FileReader();
      reader.onload = () => {
        const errorMessage = JSON.parse(reader.result);
        throw new Error(errorMessage.message || 'Error converting file');
      };
      reader.readAsText(error.response.data);
    }
    throw error;
  }
};

export default api;
