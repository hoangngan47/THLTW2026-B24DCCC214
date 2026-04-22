import React from 'react';
import { Card, Tag, Space, Button } from 'antd';
import { EyeOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Post } from '../types';
import styles from './PostCard.module.less';

interface PostCardProps {
  post: Post;
  onViewPost: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onViewPost }) => {
  return (
    <Card
      hoverable
      className={styles.card}
      cover={
        <div className={styles.imageWrapper}>
          <img alt={post.title} src={post.image} />
        </div>
      }
    >
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.excerpt}>{post.excerpt}</p>

      <Space direction="vertical" style={{ width: '100%' }}>
        <div className={styles.metadata}>
          <Space split="|" size="small">
            <span>
              <CalendarOutlined /> {post.createdAt}
            </span>
            <span>
              <UserOutlined /> {post.author.name}
            </span>
            <span>
              <EyeOutlined /> {post.viewCount} lượt xem
            </span>
          </Space>
        </div>

        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <Tag key={tag.id} color="blue">
              {tag.name}
            </Tag>
          ))}
        </div>

        <Button
          type="primary"
          block
          onClick={() => onViewPost(post)}
          style={{ backgroundColor: '#1890ff' }}
        >
          Đọc bài viết
        </Button>
      </Space>
    </Card>
  );
};

export default PostCard;
