import React, { useState, useMemo } from 'react';
import {
  Table,
  Button,
  Space,
  Input,
  Select,
  Row,
  Col,
  Card,
  Popconfirm,
  Tag,
} from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Task } from './types';
import styles from './styles.module.less';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onAdd: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('deadline');

  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter((t) => t.status === statusFilter);
    }

    // Filter by search text
    if (searchText) {
      result = result.filter((t) =>
        t.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return (
          priorityOrder[a.priority as keyof typeof priorityOrder] -
          priorityOrder[b.priority as keyof typeof priorityOrder]
        );
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [tasks, searchText, statusFilter, sortBy]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'todo':
        return 'Cần làm';
      case 'inProgress':
        return 'Đang làm';
      case 'done':
        return 'Hoàn thành';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'orange';
      case 'inProgress':
        return 'blue';
      case 'done':
        return 'green';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'blue';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Cao';
      case 'medium':
        return 'Trung bình';
      case 'low':
        return 'Thấp';
      default:
        return priority;
    }
  };

  const isOverdue = (task: Task) => {
    if (task.status === 'done') return false;
    const today = new Date().toISOString().split('T')[0];
    return task.deadline < today;
  };

  const columns = [
    {
      title: 'Tên Công Việc',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Task) => (
        <span className={isOverdue(record) ? styles.overdue : ''}>
          {text}
        </span>
      ),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 120,
      render: (deadline: string, record: Task) => (
        <span className={isOverdue(record) ? styles.overdueText : ''}>
          {deadline}
        </span>
      ),
    },
    {
      title: 'Độ Ưu Tiên',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority: string) => (
        <Tag color={getPriorityColor(priority)}>
          {getPriorityLabel(priority)}
        </Tag>
      ),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{getStatusLabel(status)}</Tag>
      ),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag key={tag} className={styles.tableTag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Hành Động',
      key: 'action',
      width: 100,
      render: (_: any, record: Task) => (
        <Space>
          <EditOutlined
            onClick={() => onEdit(record)}
            className={styles.actionIcon}
          />
          <Popconfirm
            title="Xóa công việc này?"
            onConfirm={() => onDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <DeleteOutlined className={styles.actionIconDelete} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card className={styles.taskListCard}>
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <Col xs={24} sm={24} md={8}>
          <Input
            placeholder="Tìm kiếm công việc..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={styles.searchInput}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            style={{ width: '100%' }}
            placeholder="Lọc theo trạng thái"
            value={statusFilter}
            onChange={setStatusFilter}
          >
            <Select.Option value="all">Tất cả</Select.Option>
            <Select.Option value="todo">Cần làm</Select.Option>
            <Select.Option value="inProgress">Đang làm</Select.Option>
            <Select.Option value="done">Hoàn thành</Select.Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            style={{ width: '100%' }}
            placeholder="Sắp xếp theo"
            value={sortBy}
            onChange={setSortBy}
          >
            <Select.Option value="deadline">Deadline</Select.Option>
            <Select.Option value="priority">Độ ưu tiên</Select.Option>
            <Select.Option value="title">Tên công việc</Select.Option>
          </Select>
        </Col>
        <Col xs={24} sm={24} md={4}>
          <Button
            type="primary"
            block
            onClick={onAdd}
            className={styles.addBtn}
          >
            + Thêm Công Việc
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredTasks}
        rowKey="id"
        pagination={{ pageSize: 10, total: filteredTasks.length }}
        scroll={{ x: 1000 }}
        className={styles.table}
      />
    </Card>
  );
};

export default TaskList;
