import { Dispatch } from 'redux';
import projectService from '../../services/projectService';
import { ADD_PROJECT_FAILURE, ADD_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, EDIT_PROJECT_FAILURE, EDIT_PROJECT_REQUEST, EDIT_PROJECT_SUCCESS, FETCH_PROJECTS_FAILURE, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS } from './actionTypes';
import { Project } from '../../types/project';

export const fetchProjectsRequest = () => ({
  type: FETCH_PROJECTS_REQUEST,
});

export const fetchProjectsSuccess = (data: any) => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: data,
});

export const fetchProjectsFailure = (error: any) => ({
  type: FETCH_PROJECTS_FAILURE,
  payload: error,
});

export const fetchProjects = (page: number = 1, perPage: number = 10) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchProjectsRequest());

    try {
      const response = await projectService.getAllProjects(page, perPage);
      dispatch(fetchProjectsSuccess({
        projects: response.projects,
        totalPages: response.total_pages,
        currentPage: response.current_page,
      }));
    } catch (error: any) {
      dispatch(fetchProjectsFailure(error.message));
    }
  };
};

export const addProject = (projectData: { name: string; description: string }) => {
    return async (dispatch: Dispatch) => {
      try {
        const response = await projectService.createProject(projectData);
        dispatch({
          type: ADD_PROJECT_SUCCESS,
          payload: response,
        });
      } catch (error: any) {
        dispatch({
          type: ADD_PROJECT_FAILURE,
          payload: error.message,
        });
      }
    };
  };

  export const editProject = (projectId: number, project: Project) => {
    return async (dispatch: any) => {
      dispatch({ type: EDIT_PROJECT_REQUEST });
  
      try {
        const updatedProject = await projectService.updateProject(projectId, project);
        dispatch({
          type: EDIT_PROJECT_SUCCESS,
          payload: updatedProject,
        });
      } catch (error: any) {
        dispatch({
          type: EDIT_PROJECT_FAILURE,
          payload: error.message,
        });
      }
    };
  };

  export const deleteProject = (id: number) => async (dispatch: any) => {
    dispatch({ type: DELETE_PROJECT_REQUEST });
    try {
      await projectService.deleteProject(id);
      dispatch({
        type: DELETE_PROJECT_SUCCESS,
        payload: id,
      });
    } catch (error: any) {
        dispatch({
            type: DELETE_PROJECT_FAILURE,
            payload: error.message,
          });
    }
  };
