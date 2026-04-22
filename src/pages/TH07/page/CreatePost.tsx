import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Space,
  Select,
  Row,
  Col,
} from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import MarkdownViewer from '../components/MarkdownViewer';
import { postsService, tagsService, mockAuthor } from '../data';
import { PostStatus, Post } from '../types';
import styles from './CreatePost.module.less';

interface CreatePostProps {
  onBack: () => void;
  onSave: (post: Post) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onBack, onSave }) => {
  const [form] = Form.useForm();
  const [previewContent, setPreviewContent] = useState('');
  const [loading, setLoading] = useState(false);

  const allTags = tagsService.getAllTags();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const newPost = postsService.createPost({
        title: values.title,
        slug: values.slug,
        content: values.content,
        excerpt: values.excerpt,
        image: values.image,
        author: mockAuthor,
        tags: values.tags
          ? allTags.filter((tag) => values.tags.includes(tag.id))
          : [],
        status: values.status || PostStatus.PUBLISHED,
      });

      onSave(newPost);
      form.resetFields();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createPost}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
        style={{ marginBottom: 16 }}
      >
        Quay lại
      </Button>

      <Card className={styles.card} title="Viết bài viết mới">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col xs={24} lg={12}>
              {/* Title */}
              <Form.Item
                label="Tiêu đề"
                name="title"
                rules={[
                  { required: true, message: 'Vui lòng nhập tiêu đề' },
                ]}
              >
                <Input placeholder="Nhập tiêu đề bài viết" />
              </Form.Item>

              {/* Slug */}
              <Form.Item
                label="Slug"
                name="slug"
                rules={[
                  { required: true, message: 'Vui lòng nhập slug' },
                ]}
              >
                <Input placeholder="slug-bai-viet" />
              </Form.Item>

              {/* Excerpt */}
              <Form.Item
                label="Tóm tắt"
                name="excerpt"
                rules={[
                  { required: true, message: 'Vui lòng nhập tóm tắt' },
                ]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Nhập tóm tắt bài viết"
                />
              </Form.Item>

              {/* Image */}
              <Form.Item
                label="Ảnh đại diện (URL)"
                name="image"
                rules={[
                  { required: true, message: 'Vui lòng nhập URL ảnh' },
                ]}
              >
                <Input placeholder="https://example.com/image.jpg" />
              </Form.Item>

              {/* Tags */}
              <Form.Item
                label="Thẻ"
                name="tags"
              >
                <Select
                  mode="multiple"
                  placeholder="Chọn thẻ"
                  options={allTags.map((tag) => ({
                    label: tag.name,
                    value: tag.id,
                  }))}
                />
              </Form.Item>

              {/* Status */}
              <Form.Item
                label="Trạng thái"
                name="status"
                initialValue={PostStatus.PUBLISHED}
              >
                <Select>
                  <Select.Option value={PostStatus.PUBLISHED}>
                    Đã đăng
                  </Select.Option>
                  <Select.Option value={PostStatus.DRAFT}>
                    Nháp
                  </Select.Option>
                </Select>
              </Form.Item>

              {/* Buttons */}
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                  style={{ backgroundColor: '#1890ff' }}
                >
                  Lưu bài viết
                </Button>
                <Button onClick={onBack}>Hủy</Button>
              </Space>
            </Col>

            {/* Content Editor */}
            <Col xs={24} lg={12}>
              <Form.Item
                label="Nội dung (Markdown)"
                name="content"
                rules={[
                  { required: true, message: 'Vui lòng nhập nội dung' },
                ]}
              >
                <Input.TextArea
                  rows={20}
                  placeholder="Nhập nội dung bài viết (hỗ trợ Markdown)"
                  onChange={(e) => setPreviewContent(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Preview */}
      {previewContent && (
        <Card
          title="Xem trước"
          style={{ marginTop: 24 }}
          className={styles.card}
        >
          <MarkdownViewer content={previewContent} />
        </Card>
      )}
    </div>
  );
};

export default CreatePost;
