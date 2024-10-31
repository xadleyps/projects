import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import ProjectFormModal from './ProjectFormModal';
import projectService from '../../../services/projectService';
import store from '../../../store/store';

jest.mock('../../../services/projectService', () => ({
getProjectById: jest.fn(),
  createProject: jest.fn(),
  updateProject: jest.fn(),
}));

describe('ProjectFormModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('submits new project correctly', async () => {
    const mockAddProject = jest.fn().mockResolvedValue({ name: 'New Project', description: 'New Description' });
    (projectService.createProject as jest.Mock).mockImplementation(mockAddProject);
  
    const onClose = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <ProjectFormModal visible={true} onClose={onClose} />
      </Provider>
    );
  
    fireEvent.changeText(getByPlaceholderText('Project Name'), 'New Project');
    fireEvent.changeText(getByPlaceholderText('Project Description'), 'New Description');
  
    const addButton = getByTestId('add-project-button');
    fireEvent.press(addButton);
  
    await expect(mockAddProject).toHaveBeenCalled();
  });

  it('renders modal correctly for editing a project', async () => {
    const mockEditProject = jest.fn().mockResolvedValue({ name: 'Test Project', description: 'Test Description' });
    (projectService.updateProject as jest.Mock).mockImplementation(mockEditProject);
    (projectService.getProjectById as jest.Mock).mockResolvedValue({
      name: 'Test Project',
      description: 'Test Description',
    });

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Provider store={store}>
        <ProjectFormModal visible={true} onClose={jest.fn()} projectId={1} />
      </Provider>
    );

    expect(await getByText('Edit Project')).toBeTruthy();
    expect(getByPlaceholderText('Project Name').props.value).toBe('Test Project');
    expect(getByPlaceholderText('Project Description').props.value).toBe('Test Description');
    const editButton = getByTestId('edit-project-button');
    fireEvent.press(editButton);
  
    await expect(mockEditProject).toHaveBeenCalled();
  });
});
