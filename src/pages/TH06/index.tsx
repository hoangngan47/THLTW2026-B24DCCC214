import React, { useState } from 'react';
import { Tabs, Card } from 'antd';
import {
  HomeOutlined,
  CalendarOutlined,
  DollarOutlined,
  SettingOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import HomePage from './HomePage';
import PlannerPage from './PlannerPage';
import Budget from './Budget';
import Admin from './Admin';
import DashBoard from './DashBoard';

const TH06Page: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div style={{ paddingTop: '16px' }}>
      <Card
        style={{
          margin: '0',
          padding: '0',
          borderRadius: '0',
        }}
        bodyStyle={{ padding: '0' }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          size="large"
          style={{
            backgroundColor: '#fff',
          }}
        >
          <Tabs.TabPane
            key="home"
            tab={
              <span>
                <HomeOutlined />
                Khám phá
              </span>
            }
          >
            <HomePage />
          </Tabs.TabPane>

          <Tabs.TabPane
            key="planner"
            tab={
              <span>
                <CalendarOutlined />
                Lập kế hoạch
              </span>
            }
          >
            <PlannerPage />
          </Tabs.TabPane>

          <Tabs.TabPane
            key="budget"
            tab={
              <span>
                <DollarOutlined />
                Ngân sách
              </span>
            }
          >
            <Budget />
          </Tabs.TabPane>

          <Tabs.TabPane
            key="admin"
            tab={
              <span>
                <SettingOutlined />
                Quản lý
              </span>
            }
          >
            <Admin />
          </Tabs.TabPane>

          <Tabs.TabPane
            key="dashboard"
            tab={
              <span>
                <BarChartOutlined />
                Thống kê
              </span>
            }
          >
            <DashBoard />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default TH06Page;
