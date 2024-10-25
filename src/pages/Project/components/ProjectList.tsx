import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../../components/Button';
import { deleteProject, fetchProjects } from '../../../store/actions/projectActions';
import { RootState } from '../../../store/store';
import ProjectFormModal from '../components/ProjectFormModal';
import ProjectItem from './ProjectItem';
import { Project } from '../../../types/project';

const ProjectList = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | undefined>(undefined);

  const { projects, currentPage, totalPages, isLoading } = useSelector(
    (state: RootState) => state.projects
  );

  const loadMoreProjects = () => {
    if (!isLoading && currentPage < totalPages) {
      dispatch(fetchProjects(currentPage + 1));
    }
  };

  const handleRefresh = () => {
    dispatch(fetchProjects(1));
  };

  const openModalForAdd = () => {
    setSelectedProjectId(undefined);
    setModalVisible(true);
  };

  const openModalForEdit = (projectId: number) => {
    setSelectedProjectId(projectId);
    setModalVisible(true);
  };

  const handleDelete = (projectId: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this project?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => dispatch(deleteProject(projectId)),
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => 
  <ProjectItem project={item} handleEdit={() => openModalForEdit(item.id)} handleDelete={() => handleDelete(item.id)} />

  const keyExtractor = item => item.id.toString();

  useEffect(() => {
    dispatch(fetchProjects(1));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Button style={styles.button} title="Add Project" onPress={openModalForAdd} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={projects}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreProjects}
        ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
        refreshing={!!(isLoading && currentPage === 1)}
        onRefresh={handleRefresh}
        maxToRenderPerBatch={5}
        windowSize={21}
      />
      <ProjectFormModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        projectId={selectedProjectId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
   marginBottom: 12,
  },
  projectItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
  },
  projectStatus: {
    fontSize: 14,
    color: '#999',
  },
});

export default ProjectList;
