import React from 'react';
import './App.css';
import ProjectPage from './pages/Project/index';
import PageWrapper from './components/PageWrapper';
import { Provider } from 'react-redux';
import store from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PageWrapper>
        <ProjectPage />
      </PageWrapper>
    </Provider>
  );
}

export default App;
