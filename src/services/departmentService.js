import api from './api';
import { API_ENDPOINTS } from '../constants/apiConstants';

export const departmentService = {
  // Get all departments
  getAllDepartments: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.DEPARTMENTS.GET_ALL);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch departments' };
    }
  },

  // Get department by ID
  getDepartmentById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.DEPARTMENTS.GET_BY_ID(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch department details' };
    }
  }
};

export default departmentService;