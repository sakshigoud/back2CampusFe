import api from './api';
import { API_ENDPOINTS } from '../constants/apiConstants';

export const announcementService = {
  // Get all announcements
  getAllAnnouncements: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ANNOUNCEMENTS.GET_ALL);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch announcements' };
    }
  },

  // Get paginated announcements
  getPaginatedAnnouncements: async (page = 1, limit = 5) => {
    try {
      const response = await api.get(API_ENDPOINTS.ANNOUNCEMENTS.GET_PAGINATED(page, limit));
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch announcements' };
    }
  },

  // Get announcement by ID
  getAnnouncementById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.ANNOUNCEMENTS.GET_BY_ID(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to fetch announcement details' };
    }
  },

  // Create new announcement
  createAnnouncement: async (announcementData) => {
    try {
      const response = await api.post(API_ENDPOINTS.ANNOUNCEMENTS.CREATE, announcementData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Failed to create announcement' };
    }
  }
};

export default announcementService;