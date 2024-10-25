import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import ProjectList from './components/ProjectList';

const ProjectPage = () => {
  return (
    <View style={styles.container}>
     <Header title='Project' />
     <ProjectList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProjectPage;
