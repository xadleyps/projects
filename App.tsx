import React from 'react';
import ProjectPage from './src/pages/Project';
import { Provider } from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <ProjectPage />
    </Provider>
  );
};

export default App;
