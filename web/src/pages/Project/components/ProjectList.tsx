import React, { useCallback, useEffect, useRef, useState } from 'react';
import { List, Spin, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store/store';
import { fetchProjects, deleteProject } from '../../../store/actions/projectActions';
import ProjectItem from './ProjectItem';
import ProjectFormModal from './ProjectFormModal';
import Button from '../../../components/Button';

interface Project {
    id: number;
    name: string;
    description: string;
}

const ProjectList: React.FC = () => {
    const dispatch = useAppDispatch();
    const observerRef = useRef<HTMLDivElement | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<number | undefined>();

    const { projects, currentPage, totalPages, isLoading } = useSelector(
        (state: RootState) => state.projects
    );

    const loadMoreProjects = useCallback(() => {
        if (!isLoading && currentPage < totalPages) {
            dispatch(fetchProjects(currentPage + 1));
            setIsFetching(false);
        }
    }, [dispatch, isLoading, currentPage, totalPages]);

    const openModalForAdd = useCallback(() => {
        setSelectedProjectId(undefined);
        setModalVisible(true);
    }, []);

    const openModalForEdit = useCallback((projectId?: number) => {
        if (projectId !== undefined) {
            setSelectedProjectId(projectId);
            setModalVisible(true);
        }
    }, []);

    const handleDelete = useCallback((projectId?: number) => {
        if (projectId !== undefined) {
            Modal.confirm({
                title: 'Confirm Delete',
                content: 'Are you sure you want to delete this project?',
                okText: 'Yes',
                cancelText: 'No',
                onOk: () => dispatch(deleteProject(projectId)),
            });
        }
    }, [dispatch]);

    const renderItem = useCallback(
        (item: Project) => (
            <ProjectItem
                key={item.id}
                project={item}
                handleDelete={handleDelete}
                handleEdit={openModalForEdit}
            />
        ),
        [handleDelete, openModalForEdit]
    );

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && !isFetching) {
                setIsFetching(true);
                loadMoreProjects();
            }
        },
        [isFetching, loadMoreProjects]
    );

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };
        const observer = new IntersectionObserver(handleObserver, observerOptions);
        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [handleObserver]);

    useEffect(() => {
        dispatch(fetchProjects(1));
    }, [dispatch]);

    return (
        <>
            <Button containerStyle={{ marginBottom: 20 }} type="primary" onClick={openModalForAdd}>
                Add Project
            </Button>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={projects}
                renderItem={renderItem}
                loading={isLoading && currentPage === 1}
            />
            <div ref={observerRef} style={{ display: isFetching ? 'block' : 'none' }}>
                {isFetching && <Spin size="large" />}
            </div>
            <ProjectFormModal
                visible={isModalVisible}
                projectId={selectedProjectId}
                onClose={() => setModalVisible(false)}
            />
        </>
    );
};

export default ProjectList;
