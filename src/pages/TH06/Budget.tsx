import React, { useMemo } from 'react';
import { Card, Row, Col, Statistic, Progress, Alert, Descriptions, Table } from 'antd';
import {
  DollarOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { mockTravelPlans } from './data';

const Budget: React.FC = () => {
  const currentPlan = mockTravelPlans[0];

  const budgetData = useMemo(() => {
    if (!currentPlan) return [];
    return [
      { name: 'Ăn uống', value: currentPlan.budgetBreakdown.food },
      { name: 'Lưu trú', value: currentPlan.budgetBreakdown.accommodation },
      { name: 'Di chuyển', value: currentPlan.budgetBreakdown.transport },
      { name: 'Hoạt động', value: currentPlan.budgetBreakdown.activities },
      { name: 'Khác', value: currentPlan.budgetBreakdown.other },
    ].filter((item) => item.value > 0);
  }, [currentPlan]);

  const budgetPercentages = useMemo(() => {
    if (!currentPlan || currentPlan.totalBudget === 0) {
      return {
        food: 0,
        accommodation: 0,
        transport: 0,
        activities: 0,
        other: 0,
      };
    }

    return {
      food: (currentPlan.budgetBreakdown.food / currentPlan.totalBudget) * 100,
      accommodation:
        (currentPlan.budgetBreakdown.accommodation / currentPlan.totalBudget) * 100,
      transport: (currentPlan.budgetBreakdown.transport / currentPlan.totalBudget) * 100,
      activities: (currentPlan.budgetBreakdown.activities / currentPlan.totalBudget) * 100,
      other: (currentPlan.budgetBreakdown.other / currentPlan.totalBudget) * 100,
    };
  }, [currentPlan]);

  const budgetTableData = [
    {
      key: '1',
      category: 'Ăn uống',
      budget: currentPlan.budgetBreakdown.food,
      percentage: budgetPercentages.food,
      icon: '🍽️',
    },
    {
      key: '2',
      category: 'Lưu trú',
      budget: currentPlan.budgetBreakdown.accommodation,
      percentage: budgetPercentages.accommodation,
      icon: '🏨',
    },
    {
      key: '3',
      category: 'Di chuyển',
      budget: currentPlan.budgetBreakdown.transport,
      percentage: budgetPercentages.transport,
      icon: '🚗',
    },
    {
      key: '4',
      category: 'Hoạt động',
      budget: currentPlan.budgetBreakdown.activities,
      percentage: budgetPercentages.activities,
      icon: '🎉',
    },
    {
      key: '5',
      category: 'Khác',
      budget: currentPlan.budgetBreakdown.other,
      percentage: budgetPercentages.other,
      icon: '📦',
    },
  ];

  const columns = [
    {
      title: 'Hạng mục',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (text: string, record: any) => `${record.icon} ${text}`,
    },
    {
      title: 'Ngân sách',
      dataIndex: 'budget',
      key: 'budget',
      width: 150,
      render: (budget: number) => (
        <strong>{budget.toLocaleString('vi-VN')} ₫</strong>
      ),
    },
    {
      title: 'Tỷ lệ',
      dataIndex: 'percentage',
      key: 'percentage',
      width: 200,
      render: (percentage: number) => (
        <div>
          <Progress
            percent={Math.round(percentage)}
            size="small"
            status={percentage > 40 ? 'exception' : 'normal'}
          />
          <span style={{ fontSize: '12px' }}>{Math.round(percentage)}%</span>
        </div>
      ),
    },
  ];

  const isOverBudget = currentPlan.totalBudget > 5000000; // 5 triệu

  return (
    <div style={{ padding: '16px', paddingLeft: '24px' }}>
      {/* Alert Section */}
      {isOverBudget && (
        <Alert
          message="Cảnh báo vượt ngân sách!"
          description={`Tổng ngân sách của bạn (${currentPlan.totalBudget.toLocaleString(
            'vi-VN',
          )} ₫) đã vượt quá mức dự kiến. Vui lòng điều chỉnh lại kế hoạch.`}
          type="warning"
          showIcon
          icon={<WarningOutlined />}
          style={{ marginBottom: '20px' }}
        />
      )}

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng ngân sách"
              value={currentPlan.totalBudget}
              prefix="₫"
              valueStyle={{ color: '#1890ff', fontSize: '16px' }}
              suffix={
                <DollarOutlined style={{ marginLeft: '8px' }} />
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Ăn uống"
              value={currentPlan.budgetBreakdown.food}
              prefix="₫"
              valueStyle={{ color: '#52c41a', fontSize: '16px' }}
              
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Lưu trú"
              value={currentPlan.budgetBreakdown.accommodation}
              prefix="₫"
              valueStyle={{ color: '#faad14', fontSize: '16px' }}
              
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Di chuyển"
              value={currentPlan.budgetBreakdown.transport}
              prefix="₫"
              valueStyle={{ color: '#f5222d', fontSize: '16px' }}
              
            />
          </Card>
        </Col>
      </Row>

      {/* Charts and Table */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Phân bổ ngân sách">
            {budgetData.length > 0 ? (
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
            ) : (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                Chưa có dữ liệu ngân sách
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Chi tiết ngân sách">
            <Table
              columns={columns}
              dataSource={budgetTableData}
              pagination={false}
              bordered
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Detailed Info */}
      <Card title="Thông tin chi tiết" style={{ marginTop: '20px' }}>
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Lịch trình">
            {currentPlan.title}
          </Descriptions.Item>
          <Descriptions.Item label="Thời gian">
            Từ ngày {currentPlan.startDate} đến ngày {currentPlan.endDate} (
            {currentPlan.numberOfDays} ngày)
          </Descriptions.Item>
          <Descriptions.Item label="Ngân sách tái định">
            <strong>{currentPlan.totalBudget.toLocaleString('vi-VN')} ₫</strong>
          </Descriptions.Item>
          <Descriptions.Item label="Ngân sách quanh năm">
            <strong>
              {(currentPlan.totalBudget / currentPlan.numberOfDays).toLocaleString(
                'vi-VN',
              )}{' '}
              ₫/ngày
            </strong>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Budget;
