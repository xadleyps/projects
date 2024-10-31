import React from 'react';
import { Typography, List, Card, Space } from 'antd';
import { Project } from '../../../types/project';
import Paragraph from 'antd/es/typography/Paragraph';
import Button from '../../../components/Button';

const { Title } = Typography;

interface ProjectItemProps {
    project: Project;
    handleEdit: (projectId?: number) => void;
    handleDelete: (projectId?: number) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = React.memo(({ project, handleEdit, handleDelete }) => {
    return (
        <List.Item>
            <Card
                hoverable
                title={<Title level={4}>{project.name}</Title>}
                style={{ cursor: 'pointer' }}
            >
                <Paragraph>{project.description}</Paragraph>
                <Space style={{ marginTop: '16px' }}>
                    <Button
                        type="primary"
                        onClick={() => handleEdit(project.id)}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        onClick={() => handleDelete(project.id)}
                    >
                        Delete
                    </Button>
                </Space>
            </Card>
        </List.Item>
    );
});

export default React.memo(ProjectItem, (prevProps, nextProps) =>
    prevProps.project.id === nextProps.project.id &&
    prevProps.project.name === nextProps.project.name &&
    prevProps.project.description === nextProps.project.description
);
