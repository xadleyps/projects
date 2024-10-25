import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Project } from '../../../types/project';
import Button from '../../../components/Button';

interface ProjectItemProps {
  project: Project;
  handleEdit: () => void;
  handleDelete: () => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, handleEdit, handleDelete }) => {
  return (
    <View style={styles.projectItem}>
      <Text style={styles.projectName}>{project.name}</Text>
      <Text style={styles.projectDescription}>{project.description}</Text>
      <View style={styles.buttonContainer}>
        <Button style={styles.editButton} title="Edit" onPress={handleEdit} />
        <Button variant='secondary' title="Delete" onPress={handleDelete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  projectItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  projectDescription: {
    fontSize: 14,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    marginRight: 8,
  }
});

export default React.memo(ProjectItem);
