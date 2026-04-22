import React, { useMemo } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  FileTextOutlined,
  CheckCircleOutlined,
  EditOutlined,
  EyeOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { dashboardService } from '../data';
import styles from './DashBoard.module.less';

const DashBoard: React.FC = () => {
  const stats = useMemo(() => dashboardService.getStats(), []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <h1>Thống kê</h1>

        <Row gutter={[24, 24]}>
          {/* Total Posts */}
          <Col xs={24} sm={12} lg={6}>
            <Card className={styles.statCard}>
              <Statistic
                title="Tổng bài viết"
                value={stats.totalPosts}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>

          {/* Published Posts */}
          <Col xs={24} sm={12} lg={6}>
            <Card className={styles.statCard}>
              <Statistic
                title="Đã đăng"
                value={stats.publishedPosts}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>

          {/* Draft Posts */}
          <Col xs={24} sm={12} lg={6}>
            <Card className={styles.statCard}>
              <Statistic
                title="Nháp"
                value={stats.draftPosts}
                prefix={<EditOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>

          {/* Total Views */}
          <Col xs={24} sm={12} lg={6}>
            <Card className={styles.statCard}>
              <Statistic
                title="Tổng lượt xem"
                value={stats.totalViews}
                prefix={<EyeOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Tags Count */}
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card className={styles.statCard}>
              <Statistic
                title="Tổng thẻ"
                value={stats.totalTags}
                prefix={<TagOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Summary */}
        <Card className={styles.summaryCard} style={{ marginTop: 24 }}>
          <h3>Tóm tắt</h3>
          <ul>
            <li>
              Blog của bạn có <strong>{stats.totalPosts}</strong> bài viết tổng
              cộng
            </li>
            <li>
              Trong đó <strong>{stats.publishedPosts}</strong> bài đã được công
              khai
            </li>
            <li>
              Còn <strong>{stats.draftPosts}</strong> bài đang ở trạng thái nháp
            </li>
            <li>
              Tổng cộng bài viết đã được xem
              <strong>{stats.totalViews}</strong> lần
            </li>
            <li>
              Bạn đang sử dụng <strong>{stats.totalTags}</strong> thẻ khác nhau
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default DashBoard;
