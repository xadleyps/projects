import React, { useEffect, useState } from 'react';
import { Modal, Form, Input } from 'antd';
import projectService from '../../../services/projectService';
import { addProject, editProject } from '../../../store/actions/projectActions';
import { useAppDispatch } from '../../../store/store';
import Button from '../../../components/Button';

interface ProjectFormModalProps {
    visible: boolean;
    onClose: () => void;
    projectId?: number;
}

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
    visible,
    onClose,
    projectId,
}) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (projectId) {
            const getProjectDetails = async () => {
                setLoading(true);
                try {
                    const project = await projectService.getProjectById(projectId);
                    if (project) {
                        form.setFieldsValue({
                            name: project.name,
                            description: project.description,
                        });
                    }
                } catch (error) {
                    console.error('Error fetching project details:', error);
                } finally {
                    setLoading(false);
                }
            };
            getProjectDetails();
        } else {
            form.resetFields();
        }
    }, [projectId, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            let project;
            setLoading(true);
            if (projectId) {
                project = await dispatch(editProject(projectId, values));
            } else {
                project = await dispatch(addProject(values));
            }
            onClose();
        } catch (error) {
            console.error('Error saving project:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={projectId ? 'Edit Project' : 'Add Project'}
            open={visible}
            onCancel={onClose}
            footer={null}
            confirmLoading={loading}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Project Name"
                    rules={[{ required: true, message: 'Please enter a project name' }]}
                >
                    <Input placeholder="Enter project name" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea rows={4} placeholder="Enter project description" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleSubmit} loading={loading} data-testid={projectId ? 'edit-project-button' : 'add-project-button'}>
                        {projectId ? 'Save Changes' : 'Add'}
                    </Button>
                    <Button onClick={onClose} style={{ marginLeft: '8px' }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProjectFormModal;
