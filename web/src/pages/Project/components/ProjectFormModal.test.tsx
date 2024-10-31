import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import ProjectFormModal from './ProjectFormModal';
import projectService from '../../../services/projectService';
import { addProject, editProject } from '../../../store/actions/projectActions';
import store from '../../../store/store';

jest.mock('../../../services/projectService', () => ({
    getProjectById: jest.fn(),
}));

jest.mock('../../../store/actions/projectActions', () => ({
    addProject: jest.fn(),
    editProject: jest.fn(),
}));

const renderComponent = (visible: boolean, onClose: () => void, projectId?: number) => {
    render(
        <Provider store={store}>
            <ProjectFormModal visible={visible} onClose={onClose} projectId={projectId} />
        </Provider>
    );
};

describe('ProjectFormModal Component', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation((message) => {
            if (typeof message === 'string' && message.includes('ReactDOMTestUtils.act')) {
                return;
            }
            console.error(message);
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the modal for adding a project', () => {
        const onClose = jest.fn();
        renderComponent(true, onClose);

        expect(screen.getByText(/Add Project/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter project name/i)).toBeInTheDocument();
    });

    test('renders the modal for editing a project', async () => {
        const onClose = jest.fn();
        (projectService.getProjectById as jest.Mock).mockResolvedValue({
            name: 'Existing Project',
            description: 'Existing description',
        });

        renderComponent(true, onClose, 1);

        expect(screen.getByText(/Edit Project/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByDisplayValue('Existing Project')).toBeInTheDocument();
            expect(screen.getByDisplayValue('Existing description')).toBeInTheDocument();
        });
    });

    test('submits the form for adding a new project', async () => {
        const onClose = jest.fn();
        const mockAddProject = jest.fn().mockResolvedValue({ name: 'New Project', description: 'New Description' });
        (addProject as jest.Mock).mockImplementation(mockAddProject);
        
        renderComponent(true, onClose);

        fireEvent.change(screen.getByPlaceholderText(/Enter project name/i), { target: { value: 'New Project' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter project description/i), { target: { value: 'New description' } });

        fireEvent.click(screen.getByTestId('add-project-button'));

        await waitFor(() => {
            expect(mockAddProject).toHaveBeenCalled();
        });
    });

    test('submits the form for editing an existing project', async () => {
        const onClose = jest.fn();
        const mockEditProject = jest.fn().mockResolvedValue({ name: 'Test Project', description: 'Test Description' });
        (editProject as jest.Mock).mockImplementation(mockEditProject);
        (projectService.getProjectById as jest.Mock).mockResolvedValue({
            name: 'Existing Project',
            description: 'Existing description',
        });

        renderComponent(true, onClose, 1);

        await waitFor(() => {
            expect(screen.getByDisplayValue('Existing Project')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText(/Enter project name/i), { target: { value: 'Updated Project' } });

        fireEvent.click(screen.getByTestId('edit-project-button'));

        await waitFor(() => {
            expect(mockEditProject).toHaveBeenCalled();
        });
    });
});
