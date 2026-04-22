import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  TagOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import styles from './Navbar.module.less';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate }) => {
  return (
    <Layout.Header className={styles.navbar}>
      <div className={styles.container}>
        <h2 className={styles.logo}>My Blog</h2>
        <Menu
          mode="horizontal"
          selectedKeys={[activeTab]}
          className={styles.menu}
          style={{ background: 'transparent', borderBottom: 'none' }}
        >
          <Menu.Item
            key="home"
            icon={<HomeOutlined />}
            onClick={() => onNavigate('home')}
          >
            Trang chủ
          </Menu.Item>
          <Menu.Item
            key="about"
            icon={<UserOutlined />}
            onClick={() => onNavigate('about')}
          >
            Giới thiệu
          </Menu.Item>
          <Menu.Item
            key="manage"
            icon={<FileTextOutlined />}
            onClick={() => onNavigate('manage')}
          >
            Quản lý bài viết
          </Menu.Item>
          <Menu.Item
            key="tags"
            icon={<TagOutlined />}
            onClick={() => onNavigate('tags')}
          >
            Quản lý thẻ
          </Menu.Item>
          <Menu.Item
            key="dashboard"
            icon={<BarChartOutlined />}
            onClick={() => onNavigate('dashboard')}
          >
            Thống kê
          </Menu.Item>
        </Menu>
      </div>
    </Layout.Header>
  );
};

export default Navbar;
