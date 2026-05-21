/**
 * CodeDNA
 * api.ts — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 * agent: gemini-3-1-pro | google | 2026-04-30 | init | Initialized CodeDNA semi mode
 */

import axios from 'axios';

const API_ROOT = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
const API_BASE_URL = `${API_ROOT.replace(/\/$/, '')}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('minds_books_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('minds_books_token');
      localStorage.removeItem('minds_books_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const uploadFile = async (file: File, onProgress?: (pct: number) => void) => {
  const formData = new FormData();
  formData.append('media', file);
  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: onProgress
      ? (e) => {
          if (e.total) onProgress(Math.round((e.loaded * 100) / e.total));
        }
      : undefined,
  });
  return response.data;
};

/** Video uploads use dedicated route — up to 500MB */
export const uploadVideoFile = async (file: File, onProgress?: (pct: number) => void) => {
  const formData = new FormData();
  formData.append('video', file);
  const response = await api.post('/upload/video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 600000,
    onUploadProgress: onProgress
      ? (e) => {
          if (e.total) onProgress(Math.round((e.loaded * 100) / e.total));
        }
      : undefined,
  });
  return response.data;
};

export default api;
