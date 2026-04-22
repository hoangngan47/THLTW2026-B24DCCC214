import React, { useMemo } from 'react';
import {
  Card,
  Button,
  Tag,
  Space,
  Row,
  Col,
  Avatar,
  Divider,
  Empty,
} from 'antd';
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  UserOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import MarkdownViewer from '../components/MarkdownViewer';
import PostCard from '../components/PostCard';
import { postsService } from '../data';
import { Post } from '../types';
import styles from './PostDetail.module.less';

interface PostDetailProps {
  postId: string;
  onBack: () => void;
  onViewPost: (post: Post) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({
  postId,
  onBack,
  onViewPost,
}) => {
  const post = useMemo(() => postsService.getPostById(postId), [postId]);
  const relatedPosts = useMemo(
    () => postsService.getRelatedPosts(postId),
    [postId]
  );

  if (!post) {
    return (
      <div className={styles.container}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          style={{ marginBottom: 16 }}
        >
          Quay lại
        </Button>
        <Empty description="Bài viết không tồn tại" />
      </div>
    );
  }

  return (
    <div className={styles.postDetail}>
      <div className={styles.container}>
        {/* Back Button */}
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          className={styles.backButton}
        >
          Quay lại
        </Button>

        {/* Post Header */}
        <Card className={styles.card}>
          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.metadata}>
            <Space split="|" size="large">
              <span>
                <CalendarOutlined /> {post.createdAt}
              </span>
              <span>
                <EyeOutlined /> {post.viewCount} lượt xem
              </span>
            </Space>
          </div>

          {/* Featured Image */}
          <img src={post.image} alt={post.title} className={styles.image} />

          {/* Author Info */}
          <div className={styles.author}>
            <Avatar size={48} src={post.author.avatar} icon={<UserOutlined />} />
            <div className={styles.authorInfo}>
              <h4>{post.author.name}</h4>
              <p>{post.author.bio}</p>
            </div>
          </div>

          <Divider />

          {/* Tags */}
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <Tag key={tag.id} color="blue">
                {tag.name}
              </Tag>
            ))}
          </div>

          {/* Content */}
          <MarkdownViewer content={post.content} />
        </Card>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className={styles.relatedSection}>
            <h3>Bài viết liên quan</h3>
            <Row gutter={[24, 24]}>
              {relatedPosts.map((relatedPost) => (
                <Col key={relatedPost.id} xs={24} sm={12} lg={8}>
                  <PostCard
                    post={relatedPost}
                    onViewPost={onViewPost}
                  />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
