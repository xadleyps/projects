import React, { act, useEffect, useState } from 'react';
import { Modal, View, TextInput, Text, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import projectService from '../../../services/projectService';
import { Project } from '../../../types/project';
import { addProject, editProject } from '../../../store/actions/projectActions';
import Button from '../../../components/Button';

interface ProjectFormModalProps {
  visible: boolean;
  onClose: () => void;
  projectId?: number;
  onProjectUpdated?: (project: Project) => void;
}

const ProjectFormModal : React.FC<ProjectFormModalProps> = ({  visible,
  onClose,
  projectId,
  onProjectUpdated }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

  useEffect(() => {
    if (projectId) {
      const getProjectDetails = async () => {
        const project = await projectService.getProjectById(projectId);
        if (project) {
          act(() => {
            setName(project.name);
            setDescription(project.description);
          });
          
        }
      };
      getProjectDetails();
    } else {
      setName('');
      setDescription('');
    }
  }, [projectId]);

  const handleSubmit = async () => {
    if (name && description) {
      try {
        let project;
        if (projectId) {
          project = await dispatch(editProject(projectId, { name, description }));
        } else {
          project = await dispatch(addProject({ name, description }));
        }
        if (onProjectUpdated) { onProjectUpdated(project) };
        onClose();
      } catch (error) {
        console.log('error', error);
        Alert.alert('Error', 'Failed to save project. Please try again.');
      }
    } else {
      Alert.alert('Validation Error', 'Please fill in all fields.');
    }
  };

  const isInvalid = !name || !description;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>{projectId ? 'Edit Project' : 'Add Project'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Project Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Project Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <Button style={[styles.submit, isInvalid ? styles.disabled : {}]} title={projectId ? 'Save Changes' : 'Add Project'} onPress={handleSubmit}  testID={projectId ? 'edit-project-button' : 'add-project-button'} />
            <Button title="Cancel" onPress={onClose} variant='secondary' />
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  submit: {
    marginBottom: 8
  },
  disabled: {
    opacity: 0.5
  }
});

export default ProjectFormModal;
