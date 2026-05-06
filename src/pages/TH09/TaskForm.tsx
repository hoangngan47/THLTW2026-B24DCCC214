import React, { useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  message,
} from 'antd';
import moment from 'moment';
import { Task } from './types';
import styles from './styles.module.less';

interface TaskFormProps {
  visible: boolean;
  task?: Task;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  visible,
  task,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const isEdit = !!task;

  useEffect(() => {
    if (visible) {
      if (isEdit && task) {
        form.setFieldsValue({
          title: task.title,
          description: task.description,
          priority: task.priority,
          deadline: moment(task.deadline),
          tags: task.tags,
          status: task.status,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ status: 'todo', priority: 'medium' });
      }
    }
  }, [visible, task, form, isEdit]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      try {
        const taskData = {
          ...values,
          deadline: values.deadline.format('YYYY-MM-DD'),
          tags: values.tags || [],
        };
        onSubmit(taskData);
        message.success(isEdit ? 'Cập nhật công việc thành công!' : 'Thêm công việc thành công!');
        form.resetFields();
        onCancel();
      } catch (error) {
        message.error('Có lỗi xảy ra!');
      }
    });
  };

  return (
    <Modal
      title={isEdit ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}
      visible={visible}
      onCancel={onCancel}
      width={600}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          className={styles.submitBtn}
        >
          {isEdit ? 'Cập nhật' : 'Thêm mới'}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Tên công việc"
          rules={[{ required: true, message: 'Vui lòng nhập tên công việc!' }]}
        >
          <Input placeholder="VD: Hoàn thành dự án React" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input.TextArea rows={3} placeholder="Chi tiết công việc..." />
        </Form.Item>

        <Form.Item
          name="deadline"
          label="Deadline"
          rules={[{ required: true, message: 'Vui lòng chọn deadline!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Độ ưu tiên"
          rules={[{ required: true }]}
        >
          <Select placeholder="Chọn độ ưu tiên">
            <Select.Option value="low">Thấp</Select.Option>
            <Select.Option value="medium">Trung bình</Select.Option>
            <Select.Option value="high">Cao</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true }]}
        >
          <Select placeholder="Chọn trạng thái">
            <Select.Option value="todo">Cần làm</Select.Option>
            <Select.Option value="inProgress">Đang làm</Select.Option>
            <Select.Option value="done">Hoàn thành</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <Select
            mode="tags"
            placeholder="Nhập tags, cách bằng Enter"
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
