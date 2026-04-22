import React, { useState, useMemo } from 'react';
import {
  Table,
  Button,
  Space,
  Input,
  Select,
  Tag,
  Popconfirm,
  Card,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { postsService } from '../data';
import { Post, PostStatus } from '../types';
import styles from './PostManager.module.less';

interface PostManagerProps {
  onCreatePost: () => void;
  onEditPost: (post: Post) => void;
  onRefresh: () => void;
}

const PostManager: React.FC<PostManagerProps> = ({
  onCreatePost,
  onEditPost,
  onRefresh,
}) => {
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<PostStatus | 'all'>(
    'all'
  );

  const allPosts = useMemo(() => postsService.getAllPosts(), []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchTitle = post.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase());
      const matchStatus =
        selectedStatus === 'all' || post.status === selectedStatus;
      return matchTitle && matchStatus;
    });
  }, [searchTitle, selectedStatus, allPosts]);

  const handleDelete = (postId: string) => {
    postsService.deletePost(postId);
    onRefresh();
  };

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: PostStatus) => (
        <Tag color={status === PostStatus.PUBLISHED ? 'green' : 'orange'}>
          {status === PostStatus.PUBLISHED ? 'Đã đăng' : 'Nháp'}
        </Tag>
      ),
    },
    {
      title: 'Thẻ',
      dataIndex: 'tags',
      key: 'tags',
      width: 180,
      render: (tags: any[]) => (
        <Space wrap>
          {tags.map((tag) => (
            <Tag key={tag.id} color="blue">
              {tag.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Lượt xem',
      dataIndex: 'viewCount',
      key: 'viewCount',
      width: 100,
      align: 'center' as const,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 180,
      render: (_: any, record: Post) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onEditPost(record)}
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
    <div className={styles.postManager}>
      <Card className={styles.card}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {/* Header */}
          <div className={styles.header}>
            <h2>Quản lý bài viết</h2>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={onCreatePost}
              style={{ backgroundColor: '#1890ff' }}
            >
              Thêm bài viết
            </Button>
          </div>

          {/* Filters */}
          <Space wrap style={{ marginBottom: 16 }}>
            <Input
              placeholder="Tìm kiếm theo tiêu đề"
              style={{ width: 300 }}
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              allowClear
            />
            <Select
              style={{ width: 200 }}
              value={selectedStatus}
              onChange={setSelectedStatus}
            >
              <Select.Option value="all">Tất cả trạng thái</Select.Option>
              <Select.Option value={PostStatus.PUBLISHED}>
                Đã đăng
              </Select.Option>
              <Select.Option value={PostStatus.DRAFT}>Nháp</Select.Option>
            </Select>
          </Space>

          {/* Table */}
          <Table
            columns={columns}
            dataSource={filteredPosts}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Tổng ${total} bài viết`,
            }}
            scroll={{ x: 1200 }}
          />
        </Space>
      </Card>
    </div>
  );
};

export default PostManager;
