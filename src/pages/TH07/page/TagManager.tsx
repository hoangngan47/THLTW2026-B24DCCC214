import React, { useState, useMemo } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Popconfirm,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { tagsService, postsService } from '../data';
import { Tag } from '../types';
import styles from './TagManager.module.less';

interface TagManagerProps {
  onRefresh: () => void;
}

const TagManager: React.FC<TagManagerProps> = ({ onRefresh }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const allTags = useMemo(() => tagsService.getAllTags(), []);

  const tagsWithCount = useMemo(
    () =>
      allTags.map((tag) => ({
        ...tag,
        postCount: postsService.getPostsByTag(tag.id).length,
      })),
    [allTags]
  );

  const handleOpenModal = (tag?: Tag) => {
    if (tag) {
      setEditingTag(tag);
      form.setFieldsValue(tag);
    } else {
      setEditingTag(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingTag(null);
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (editingTag) {
        tagsService.updateTag(editingTag.id, values);
      } else {
        tagsService.createTag(values);
      }
      handleCloseModal();
      onRefresh();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (tagId: string) => {
    tagsService.deleteTag(tagId);
    onRefresh();
  };

  const columns = [
    {
      title: 'Tên thẻ',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      width: 200,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Số bài viết',
      dataIndex: 'postCount',
      key: 'postCount',
      width: 120,
      align: 'center' as const,
      render: (count: number) => <strong>{count}</strong>,
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_: any, record: Tag & { postCount: number }) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenModal(record)}
            style={{ backgroundColor: '#1890ff' }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xác nhận xóa"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="primary" size="small" icon={<DeleteOutlined />} style={{ backgroundColor: '#1890ff' }}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.tagManager}>
      <Card className={styles.card}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {/* Header */}
          <div className={styles.header}>
            <h2>Quản lý thẻ</h2>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => handleOpenModal()}
              style={{ backgroundColor: '#1890ff' }}
            >
              Thêm thẻ
            </Button>
          </div>

          {/* Table */}
          <Table
            columns={columns}
            dataSource={tagsWithCount}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Tổng ${total} thẻ`,
            }}
            scroll={{ x: 900 }}
          />
        </Space>
      </Card>

      {/* Modal */}
      <Modal
        title={editingTag ? 'Chỉnh sửa thẻ' : 'Thêm thẻ mới'}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Tên thẻ"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên thẻ' }]}
          >
            <Input placeholder="Nhập tên thẻ" />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: 'Vui lòng nhập slug' }]}
          >
            <Input placeholder="slug-the" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
          >
            <Input.TextArea
              rows={3}
              placeholder="Nhập mô tả thẻ"
            />
          </Form.Item>

          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ backgroundColor: '#1890ff' }}
            >
              {editingTag ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};

export default TagManager;
