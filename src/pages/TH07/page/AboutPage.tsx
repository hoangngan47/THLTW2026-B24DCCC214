import React from 'react';
import { Card, Avatar, Space, Tag, Button } from 'antd';
import {
  UserOutlined,
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { mockAuthor } from '../data';
import styles from './AboutPage.module.less';

const AboutPage: React.FC = () => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1>Giới thiệu về tác giả</h1>
        </div>

        {/* Author Card */}
        <Card className={styles.card}>
          <div className={styles.authorSection}>
            <Avatar
              size={128}
              src={mockAuthor.avatar}
              icon={<UserOutlined />}
            />
            <div className={styles.authorInfo}>
              <h2>{mockAuthor.name}</h2>
              <p className={styles.bio}>{mockAuthor.bio}</p>

              {/* Social Links */}
              <Space>
                {mockAuthor.socialLinks.github && (
                  <a
                    href={mockAuthor.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      icon={<GithubOutlined />}
                      shape="circle"
                      size="large"
                    />
                  </a>
                )}
                {mockAuthor.socialLinks.twitter && (
                  <a
                    href={mockAuthor.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      icon={<TwitterOutlined />}
                      shape="circle"
                      size="large"
                    />
                  </a>
                )}
                {mockAuthor.socialLinks.linkedin && (
                  <a
                    href={mockAuthor.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      icon={<LinkedinOutlined />}
                      shape="circle"
                      size="large"
                    />
                  </a>
                )}
                {mockAuthor.socialLinks.email && (
                  <a href={`mailto:${mockAuthor.socialLinks.email}`}>
                    <Button
                      icon={<MailOutlined />}
                      shape="circle"
                      size="large"
                    />
                  </a>
                )}
              </Space>
            </div>
          </div>
        </Card>

        {/* Skills Section */}
        <Card className={styles.card} title="Kỹ năng" style={{ marginTop: 24 }}>
          <Space wrap>
            {mockAuthor.skills.map((skill) => (
              <Tag key={skill} color="blue" style={{ padding: '4px 12px' }}>
                {skill}
              </Tag>
            ))}
          </Space>
        </Card>

        {/* About Section */}
        <Card className={styles.card} title="Về blog này" style={{ marginTop: 24 }}>
          <p>
            Blog này là nơi tôi chia sẻ các kiến thức về lập trình, phát triển web
            và sự nghiệp trong ngành công nghệ thông tin.
          </p>
          <p>
            Mỗi bài viết được viết một cách kỹ lưỡng và dựa trên kinh nghiệm thực
            tế. Tôi hy vọng các bài viết này sẽ giúp ích cho bạn trong hành trình
            học tập và phát triển sự nghiệp của mình.
          </p>
          <p>
            Nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào, vui lòng liên hệ với tôi
            qua email hoặc các mạng xã hội ở trên.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
