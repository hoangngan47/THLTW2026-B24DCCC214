import React, { useState, useMemo, useEffect } from 'react';
import { Row, Col, Empty } from 'antd';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';
import PostCard from '../components/PostCard';
import PaginationBar from '../components/PaginationBar';
import { postsService, tagsService } from '../data';
import { Post } from '../types';
import styles from './HomePage.module.less';

interface HomePageProps {
  onViewPost: (post: Post) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onViewPost }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // Get all tags
  const allTags = tagsService.getAllTags();

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let posts = postsService.getPublishedPosts();

    // Filter by tag
    if (selectedTagId) {
      posts = posts.filter((post) =>
        post.tags.some((tag) => tag.id === selectedTagId)
      );
    }

    // Search by keyword
    if (searchKeyword) {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    return posts;
  }, [searchKeyword, selectedTagId]);

  // Paginate posts
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredPosts.slice(startIndex, startIndex + pageSize);
  }, [filteredPosts, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, selectedTagId]);

  return (
    <div className={styles.homePage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1>Chào mừng đến với Blog của tôi</h1>
          <p>
            Khám phá các bài viết về lập trình, phát triển web và sự nghiệp IT
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={setSearchKeyword} />

        {/* Tag Filter */}
        <TagFilter
          tags={allTags}
          selectedTagId={selectedTagId}
          onSelectTag={setSelectedTagId}
        />

        {/* Posts Grid */}
        {paginatedPosts.length > 0 ? (
          <>
            <Row gutter={[24, 24]}>
              {paginatedPosts.map((post) => (
                <Col key={post.id} xs={24} sm={12} lg={8}>
                  <PostCard post={post} onViewPost={onViewPost} />
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            <PaginationBar
              current={currentPage}
              total={filteredPosts.length}
              pageSize={pageSize}
              onChange={setCurrentPage}
            />
          </>
        ) : (
          <Empty
            description="Không có bài viết nào"
            style={{ marginTop: 48 }}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
