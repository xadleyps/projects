import { Project } from "../../types/project";
import { ADD_PROJECT_FAILURE, ADD_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, EDIT_PROJECT_FAILURE, EDIT_PROJECT_REQUEST, EDIT_PROJECT_SUCCESS, FETCH_PROJECTS_FAILURE, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS } from "../actions/actionTypes";

  const initialState = {
    projects: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
  };
  
  const projectsReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_PROJECTS_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case FETCH_PROJECTS_SUCCESS:
        return {
          ...state,
          projects: action.payload.currentPage === 1
            ? action.payload.projects
            : [...state.projects, ...action.payload.projects],
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          isLoading: false,
        };
      case FETCH_PROJECTS_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      case ADD_PROJECT_SUCCESS:
        return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
      case ADD_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
      case EDIT_PROJECT_REQUEST:
        return {
          ...state,
          error: null,
        };
      case EDIT_PROJECT_SUCCESS:
        return {
          ...state,
          projects: state.projects.map((proj:Project) =>
            proj.id === action.payload.id ? action.payload : proj
          ),
        };
      case EDIT_PROJECT_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
        case DELETE_PROJECT_REQUEST:
        return {
          ...state,
          error: null,
        };
      case DELETE_PROJECT_SUCCESS:
        return {
          ...state,
          projects: state.projects.filter((project:Project) => project.id !== action.payload)
        };
      case DELETE_PROJECT_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default projectsReducer;
  