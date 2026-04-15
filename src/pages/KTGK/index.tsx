import React from 'react';
import { Card } from 'antd';
import RoomManagement from './RoomManagement';

const KTGKPage: React.FC = () => {
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
        <RoomManagement />
      </Card>
    </div>
  );
};

export default KTGKPage;
