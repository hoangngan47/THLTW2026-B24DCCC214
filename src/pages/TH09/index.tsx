import React, { useState, useEffect } from 'react';
import { Tabs, Card, Button, message } from 'antd';
import {
  DashboardOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { DropResult } from 'react-beautiful-dnd';
import Dashboard from './Dashboard';
import KanbanBoard from './KanbanBoard';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { tasksService } from './data';
import { Task } from './types';
import styles from './styles.module.less';

const TH09Page: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [formVisible, setFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const data = tasksService.getTasks();
    setTasks(data);
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask = tasksService.addTask(taskData);
    setTasks([...tasks, newTask]);
    setEditingTask(undefined);
    setFormVisible(false);
  };

  const handleUpdateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      const updated = tasksService.updateTask(editingTask.id, taskData);
      if (updated) {
        setTasks(tasks.map((t) => (t.id === editingTask.id ? updated : t)));
        setEditingTask(undefined);
        setFormVisible(false);
      }
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (tasksService.deleteTask(taskId)) {
      setTasks(tasks.filter((t) => t.id !== taskId));
      message.success('Xóa công việc thành công!');
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const task = tasks.find((t) => t.id === draggableId);
    if (task) {
      const updated = tasksService.moveTask(
        draggableId,
        destination.droppableId
      );
      if (updated) {
        setTasks(tasks.map((t) => (t.id === draggableId ? updated : t)));
      }
    }
  };

  const handleOpenForm = (task?: Task) => {
    setEditingTask(task);
    setFormVisible(true);
  };

  const handleSubmitForm = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      handleUpdateTask(taskData);
    } else {
      handleAddTask(taskData);
    }
  };

  return (
    <div className={styles.th09Container}>
      <Card
        style={{
          margin: '0',
          padding: '0',
          borderRadius: '0',
          border: 'none',
        }}
        bodyStyle={{ padding: '16px' }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          size="large"
          style={{ backgroundColor: '#fff', marginLeft: '8px' }}
          tabBarExtraContent={
            activeTab !== 'dashboard' && (
              <Button
                type="primary"
                onClick={() => handleOpenForm()}
                className={styles.headerAddBtn}
              >
                + Thêm Công Việc
              </Button>
            )
          }
        >
          <Tabs.TabPane
            key="dashboard"
            tab={
              <span>
                <DashboardOutlined />
                Dashboard
              </span>
            }
          >
            <div className={styles.tabContent}>
              <Dashboard tasks={tasks} />
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane
            key="kanban"
            tab={
              <span>
                <AppstoreOutlined />
                Kanban Board
              </span>
            }
          >
            <div className={styles.tabContent}>
              <KanbanBoard
                tasks={tasks}
                onDragEnd={handleDragEnd}
                onEdit={handleOpenForm}
                onDelete={handleDeleteTask}
              />
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane
            key="list"
            tab={
              <span>
                <UnorderedListOutlined />
                Danh Sách Công Việc
              </span>
            }
          >
            <div className={styles.tabContent}>
              <TaskList
                tasks={tasks}
                onEdit={handleOpenForm}
                onDelete={handleDeleteTask}
                onAdd={() => handleOpenForm()}
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Card>

      <TaskForm
        visible={formVisible}
        task={editingTask}
        onSubmit={handleSubmitForm}
        onCancel={() => {
          setFormVisible(false);
          setEditingTask(undefined);
        }}
      />
    </div>
  );
};

export default TH09Page;
