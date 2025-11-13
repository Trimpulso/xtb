// Configuración del API base URL
// Si estamos en producción (GitHub Pages), usa el backend en Render
// Si estamos en desarrollo, usa localhost

const isDevelopment = !window.location.hostname.includes('github.io');

export const API_BASE_URL = isDevelopment
  ? 'http://localhost:8000/api'
  : process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const APP_NAME = 'Trading IA Bot Generator';
export const APP_VERSION = '1.0.0';
