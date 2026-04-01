import React, { useState } from 'react';
import { Tabs, Card } from 'antd';
import {
  TeamOutlined,
  FileTextOutlined,
  UserOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import DanhSach from './DanhSach';
import DangKy from './DangKy';
import ThanhVien from './ThanhVien';
import BaoCao from './BaoCao';

const TH05Page: React.FC = () => {
  const [activeTab, setActiveTab] = useState('club');

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
            key="club"
            tab={
              <span>
                <TeamOutlined />
                Danh sách câu lạc bộ
              </span>
            }
          >
            <DanhSach />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="application"
            tab={
              <span>
                <FileTextOutlined />
                Quản lý đơn đăng ký
              </span>
            }
          >
            <DangKy />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="member"
            tab={
              <span>
                <UserOutlined />
                Quản lý thành viên
              </span>
            }
          >
            <ThanhVien />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="report"
            tab={
              <span>
                <BarChartOutlined />
                Báo cáo và thống kê
              </span>
            }
          >
            <BaoCao />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default TH05Page;
