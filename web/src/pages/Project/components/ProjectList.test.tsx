import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../store/store';
import ProjectList from './ProjectList';
import { FETCH_PROJECTS_SUCCESS } from '../../../store/actions/actionTypes';

const projects = [
    { id: 1, name: 'Project 1', description: 'Description 1' },
    { id: 2, name: 'Project 2', description: 'Description 2' },
];

describe('ProjectList Component', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation((message) => {
            if (typeof message === 'string' && message.includes('ReactDOMTestUtils.act')) {
                return;
            }
            console.error(message);
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('renders the ProjectList component with projects', () => {
        const initialState = {
            projects: projects,
            currentPage: 1,
            totalPages: 1,
        };
        store.dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: initialState });
        render(
            <Provider store={store}>
                <ProjectList />
            </Provider>
        );

        expect(screen.getByText(/Project 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Project 2/i)).toBeInTheDocument();
    });
});
