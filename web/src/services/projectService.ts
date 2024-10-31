import axios from 'axios';
import API_BASE_URL from '../config/api';
import { Project } from '../types/project';

const projectService = {
  getAllProjects: async (page = 1, perPage = 10) => {
    const response = await axios.get(`${API_BASE_URL}/projects`, {
      params: {
        page,
        per_page: perPage,
      },
    });
    return response.data;
  },

  getProjectById: async (id: number): Promise<Project | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project by ID:', error);
      return null;
    }
  },

  createProject: async (projectData: Project) => {
    const response = await axios.post(`${API_BASE_URL}/projects`, { project: projectData });
    return response.data;
  },

  updateProject: async (id: number, projectData: Project) => {
    const response = await axios.put(`${API_BASE_URL}/projects/${id}`, { project: projectData });
    return response.data;
  },

  deleteProject: async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/projects/${id}`);
    return response.data;
  },
};

export default projectService;
