import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Modal, Form, Input } from 'antd';
import projectService from '../../../services/projectService';
import { addProject, editProject } from '../../../store/actions/projectActions';
import { useAppDispatch } from '../../../store/store';
import Button from '../../../components/Button';
import debounce from 'lodash.debounce';

interface ProjectFormModalProps {
    visible: boolean;
    onClose: () => void;
    projectId?: number;
}

const ProjectFormModal: React.FC<ProjectFormModalProps> = React.memo(({
    visible,
    onClose,
    projectId,
}) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const title = useMemo(() => (projectId ? 'Edit Project' : 'Add Project'), [projectId]);
    const buttonLabel = useMemo(() => (projectId ? 'Save Changes' : 'Add'), [projectId]);

    const getProjectDetails = useCallback(async () => {
        if (!projectId) {
            return;
        }
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
    }, [projectId, form]);

    useEffect(() => {
        if (projectId) {
            getProjectDetails();
        } else {
            form.resetFields();
        }
    }, [projectId, getProjectDetails, form]);

    const handleSubmit = useCallback(
        debounce(async () => {
            try {
                const values = await form.validateFields();
                setLoading(true);
                if (projectId) {
                    await dispatch(editProject(projectId, values));
                } else {
                    await dispatch(addProject(values));
                }
                onClose();
            } catch (error) {
                console.error('Error saving project:', error);
            } finally {
                setLoading(false);
            }
        }, 300),
        [form, dispatch, projectId, onClose]
    );

    return (
        <Modal
            title={title}
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
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        loading={loading}
                        data-testid={projectId ? 'edit-project-button' : 'add-project-button'}
                    >
                        {buttonLabel}
                    </Button>
                    <Button onClick={onClose} style={{ marginLeft: '8px' }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default ProjectFormModal;
