import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './reducers/projectsReducer';
import { useDispatch } from 'react-redux';

export const rootReducer = {
  reducer: {
    projects: projectsReducer,
  },
}

const store = configureStore(rootReducer);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
