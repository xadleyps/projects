import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './reducers/projectsReducer';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
