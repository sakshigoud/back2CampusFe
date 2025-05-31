// API base URL
export const BASE_URL = 'http://localhost:3000';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: `${BASE_URL}/api/auth/register`,
    LOGIN: `${BASE_URL}/api/auth/login`,
    PROFILE: `${BASE_URL}/api/auth/profile`,
  },
  
  // Departments endpoints
  DEPARTMENTS: {
    GET_ALL: `${BASE_URL}/api/departments`,
    GET_BY_ID: (id) => `${BASE_URL}/api/departments/${id}`,
  },
  
  // Announcements endpoints
  ANNOUNCEMENTS: {
    GET_ALL: `${BASE_URL}/api/announcements`,
    GET_PAGINATED: (page = 1, limit = 5) => 
      `${BASE_URL}/api/announcements?page=${page}&limit=${limit}`,
    GET_BY_ID: (id) => `${BASE_URL}/api/announcements/${id}`,
    CREATE: `${BASE_URL}/api/announcements`,
  },
  
  // Health check
  HEALTH: `${BASE_URL}/health`,
};