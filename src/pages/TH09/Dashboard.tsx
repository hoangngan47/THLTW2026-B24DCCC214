import React, { useMemo } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import {
  CheckCircleOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Task } from './types';
import styles from './styles.module.less';

interface DashboardProps {
  tasks: Task[];
}

const Dashboard: React.FC<DashboardProps> = ({ tasks }) => {
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'done').length;
    const overdue = tasks.filter(
      (t) => t.status !== 'done' && t.deadline < today
    ).length;
    return { total, completed, overdue };
  }, [tasks]);

  return (
    <div className={styles.dashboard}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className={styles.statCard}>
            <Statistic
              title="Tổng Công Việc"
              value={stats.total}
              prefix={<FileTextOutlined className={styles.iconTotal} />}
              valueStyle={{ color: '#FFD700', fontSize: '28px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className={styles.statCard}>
            <Statistic
              title="Hoàn Thành"
              value={stats.completed}
              prefix={<CheckCircleOutlined className={styles.iconCompleted} />}
              valueStyle={{ color: '#52C41A', fontSize: '28px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className={styles.statCard}>
            <Statistic
              title="Quá Hạn"
              value={stats.overdue}
              prefix={<ClockCircleOutlined className={styles.iconOverdue} />}
              valueStyle={{ color: '#FF4D4F', fontSize: '28px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
