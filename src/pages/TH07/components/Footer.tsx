import React from 'react';
import { Layout, Space, Divider } from 'antd';
import {
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  MailOutlined,
} from '@ant-design/icons';
import styles from './Footer.module.less';

const Footer: React.FC = () => {
  return (
    <Layout.Footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h4>Theo dõi tôi</h4>
          <Space>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <GithubOutlined />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined />
            </a>
            <a href="mailto:author@example.com">
              <MailOutlined />
            </a>
          </Space>
        </div>

        <Divider />

        <p className={styles.copyright}>
          © 2024 My Blog. All rights reserved.
        </p>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
