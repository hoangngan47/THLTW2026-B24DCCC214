import React from 'react';
import { Card, Row, Col, Statistic, Table } from 'antd';
import {
  FileTextOutlined,
} from '@ant-design/icons';
import { mockStatistics } from './data';

const DashBoard: React.FC = () => {
  const stats = mockStatistics;

  // Format data for charts
  const monthlyData = stats.monthlyRevenue.map((item) => ({
    month: item.month,
    money: item.revenue,
  }));

  const budgetData = stats.budgetByCategory.map((item) => ({
    name: item.category,
    value: item.value,
  }));

  const popularDestinationsColumns = [
    {
      title: 'Địa điểm',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Số lượt lịch trình',
      dataIndex: 'count',
      key: 'count',
      width: 150,
      sorter: (a: any, b: any) => b.count - a.count,
      render: (count: number) => <strong>{count}</strong>,
    },
  ];

  return (
    <div style={{ padding: '16px', paddingLeft: '24px' }}>
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng lịch trình"
              value={stats.totalPlans}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={stats.totalRevenue}
              prefix="₫"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Lịch trình tháng này"
              value={stats.plansThisMonth}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Trung bình /lịch trình"
              value={stats.totalRevenue / stats.totalPlans}
              prefix="₫"
              precision={0}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Doanh thu theo tháng">
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #d9d9d9' }}>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Tháng</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((item) => (
                    <tr key={item.month} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '8px' }}>{item.month}</td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        {item.money.toLocaleString('vi-VN')} ₫
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Phân bổ ngân sách theo hạng mục">
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #d9d9d9' }}>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Hạng mục</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>Chi phí</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetData.map((item) => (
                    <tr key={item.name} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '8px' }}>{item.name}</td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        {item.value.toLocaleString('vi-VN')} ₫
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Popular Destinations Table */}
      <Card title="Địa điểm phổ biến" style={{ marginTop: '20px' }}>
        <Table
          columns={popularDestinationsColumns}
          dataSource={stats.popularDestinations.map((item, index) => ({
            ...item,
            key: index,
          }))}
          pagination={false}
          bordered
          size="small"
        />
      </Card>
    </div>
  );
};

export default DashBoard;
