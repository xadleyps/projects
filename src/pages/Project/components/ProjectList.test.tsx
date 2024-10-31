import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import store from '../../../store/store';
import ProjectList from './ProjectList';
import { Project } from '../../../types/project';
import { FETCH_PROJECTS_SUCCESS } from '../../../store/actions/actionTypes';

const projects: Project[] = [
  { id: 1, name: 'Project 1', description: 'Description of Project 1' },
  { id: 2, name: 'Project 2', description: 'Description of Project 2' },
];

describe('ProjectList', () => {
  it('renders a list of projects', () => {
    const initialState = {
      projects: projects,
      currentPage: 1,
      totalPages: 1,
    }
    store.dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: initialState });
    const { getByText } = render(
      <Provider store={store}>
        <ProjectList />
      </Provider>
    );

    expect(getByText('Project 1')).toBeTruthy();
    expect(getByText('Description of Project 1')).toBeTruthy();
    expect(getByText('Project 2')).toBeTruthy();
    expect(getByText('Description of Project 2')).toBeTruthy();
  });

  it('renders empty state when no projects are provided', () => {
    const initialState = {
      projects: [],
      currentPage: 1,
      totalPages: 1,
    }
    store.dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: initialState });

    const { queryByText } = render(
      <Provider store={store}>
        <ProjectList />
      </Provider>
    );

    expect(queryByText('Project 1')).toBeNull();
    expect(queryByText('Project 2')).toBeNull();
  });
});
