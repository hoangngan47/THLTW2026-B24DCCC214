import React, { useState } from 'react';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './page/HomePage';
import PostDetail from './page/PostDetail';
import AboutPage from './page/AboutPage';
import PostManager from './page/PostManager';
import CreatePost from './page/CreatePost';
import EditPost from './page/EditPost';
import TagManager from './page/TagManager';
import DashBoard from './page/DashBoard';
import { Post } from './types';
import styles from './index.module.less';

type PageType =
  | 'home'
  | 'about'
  | 'manage'
  | 'create'
  | 'edit'
  | 'detail'
  | 'tags'
  | 'dashboard';

const TH07Page: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleNavigate = (page: PageType | string) => {
    setCurrentPage(page as PageType);
    setSelectedPost(null);
  };

  const handleViewPost = (post: Post) => {
    setSelectedPost(post);
    setCurrentPage('detail');
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setCurrentPage('edit');
  };

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage key={refreshTrigger} onViewPost={handleViewPost} />;

      case 'detail':
        return selectedPost ? (
          <PostDetail
            key={selectedPost.id}
            postId={selectedPost.id}
            onBack={() => handleNavigate('home')}
            onViewPost={handleViewPost}
          />
        ) : null;

      case 'about':
        return <AboutPage />;

      case 'manage':
        return (
          <PostManager
            key={refreshTrigger}
            onCreatePost={() => handleNavigate('create')}
            onEditPost={handleEditPost}
            onRefresh={handleRefresh}
          />
        );

      case 'create':
        return (
          <CreatePost
            onBack={() => handleNavigate('manage')}
            onSave={() => {
              handleRefresh();
              handleNavigate('manage');
            }}
          />
        );

      case 'edit':
        return selectedPost ? (
          <EditPost
            key={selectedPost.id}
            post={selectedPost}
            onBack={() => handleNavigate('manage')}
            onSave={() => {
              handleRefresh();
              handleNavigate('manage');
            }}
          />
        ) : null;

      case 'tags':
        return (
          <TagManager
            key={refreshTrigger}
            onRefresh={handleRefresh}
          />
        );

      case 'dashboard':
        return <DashBoard key={refreshTrigger} />;

      default:
        return <HomePage onViewPost={handleViewPost} />;
    }
  };

  return (
    <Layout className={styles.layout}>
      <Navbar activeTab={currentPage} onNavigate={handleNavigate} />
      <Layout.Content className={styles.content}>
        {renderPage()}
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default TH07Page;
