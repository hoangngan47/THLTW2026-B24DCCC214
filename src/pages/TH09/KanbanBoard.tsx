import React from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { Row, Col, Tag, Empty, Popconfirm, Space, Card } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Task, TaskStatus } from './types';
import styles from './styles.module.less';

interface KanbanBoardProps {
  tasks: Task[];
  onDragEnd: (result: DropResult) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  onDragEnd,
  onEdit,
  onDelete,
}) => {
  const columns: { id: TaskStatus; title: string }[] = [
    { id: 'todo', title: 'Cần làm' },
    { id: 'inProgress', title: 'Đang làm' },
    { id: 'done', title: 'Hoàn thành' },
  ];

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row gutter={[16, 16]} className={styles.kanban}>
        {columns.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.id);
          return (
            <Col key={column.id} xs={24} sm={24} lg={8}>
              <div className={styles.kanbanColumn}>
                <h3 className={styles.columnTitle}>
                  {column.title}
                  <span className={styles.columnCount}>{columnTasks.length}</span>
                </h3>
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`${styles.kanbanContent} ${
                        snapshot.isDraggingOver
                          ? styles.kanbanContentDragOver
                          : ''
                      }`}
                      style={{ minHeight: '400px' }}
                    >
                      {columnTasks.length === 0 ? (
                        <Empty
                          description="Không có công việc"
                          style={{ marginTop: '40px' }}
                        />
                      ) : (
                        columnTasks.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${styles.taskCard} ${
                                  snapshot.isDragging
                                    ? styles.taskCardDragging
                                    : ''
                                } ${
                                  isOverdue(task)
                                    ? styles.taskCardOverdue
                                    : ''
                                }`}
                                size="small"
                                style={{
                                  ...provided.draggableProps.style,
                                  marginBottom: '12px',
                                }}
                              >
                                <div className={styles.taskHeader}>
                                  <h4 className={styles.taskTitle}>
                                    {task.title}
                                  </h4>
                                  <Space>
                                    <EditOutlined
                                      onClick={() => onEdit(task)}
                                      className={styles.taskAction}
                                    />
                                    <Popconfirm
                                      title="Xóa công việc này?"
                                      onConfirm={() => onDelete(task.id)}
                                      okText="Xóa"
                                      cancelText="Hủy"
                                    >
                                      <DeleteOutlined
                                        className={styles.taskActionDelete}
                                      />
                                    </Popconfirm>
                                  </Space>
                                </div>

                                <p className={styles.taskDescription}>
                                  {task.description}
                                </p>

                                <div className={styles.taskMeta}>
                                  <Tag
                                    color={getPriorityColor(task.priority)}
                                  >
                                    {getPriorityLabel(task.priority)}
                                  </Tag>
                                  {isOverdue(task) && (
                                    <Tag color="red">Quá hạn</Tag>
                                  )}
                                </div>

                                <div className={styles.taskDeadline}>
                                  {task.deadline}
                                </div>

                                {task.tags.length > 0 && (
                                  <div className={styles.taskTags}>
                                    {task.tags.map((tag) => (
                                      <Tag
                                        key={tag}
                                        className={styles.tagItem}
                                      >
                                        {tag}
                                      </Tag>
                                    ))}
                                  </div>
                                )}
                              </Card>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </Col>
          );
        })}
      </Row>
    </DragDropContext>
  );
};

export default KanbanBoard;
