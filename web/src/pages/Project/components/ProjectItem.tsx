import React, { useMemo } from 'react';
import { Typography, List, Card, Space } from 'antd';
import { Project } from '../../../types/project';
import Paragraph from 'antd/es/typography/Paragraph';
import Button from '../../../components/Button';

const { Title } = Typography;

interface ProjectItemProps {
    project: Project;
    handleEdit?: (projectId?: number) => void;
    handleDelete?: (projectId?: number) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = React.memo(({ project, handleEdit, handleDelete }) => {
    const { id, name, description } = project;

    const onEditClick = useMemo(() => (handleEdit ? () => handleEdit(id) : undefined), [id, handleEdit]);
    const onDeleteClick = useMemo(() => (handleDelete ? () => handleDelete(id) : undefined), [id, handleDelete]);

    return (
        <List.Item>
            <Card
                hoverable
                title={<Title level={4}>{name}</Title>}
                style={{ cursor: 'pointer' }}
            >
                <Paragraph>{description}</Paragraph>
                <Space style={{ marginTop: '16px' }}>
                    {handleEdit && (
                        <Button
                            type="primary"
                            onClick={onEditClick}
                        >
                            Edit
                        </Button>
                    )}
                    {handleDelete && (
                        <Button
                            danger
                            onClick={onDeleteClick}
                        >
                            Delete
                        </Button>
                    )}
                </Space>
            </Card>
        </List.Item>
    );
}, (prevProps, nextProps) =>
    prevProps.project.id === nextProps.project.id &&
    prevProps.project.name === nextProps.project.name &&
    prevProps.project.description === nextProps.project.description &&
    prevProps.handleEdit === nextProps.handleEdit &&
    prevProps.handleDelete === nextProps.handleDelete
);

export default ProjectItem;
