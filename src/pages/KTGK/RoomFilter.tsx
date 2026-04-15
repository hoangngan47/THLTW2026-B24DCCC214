import React from 'react';
import { Row, Col, Input, Select, Button, Space } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { RoomType, FilterOptions } from './types';
import { managersList } from './data';

interface RoomFilterProps {
  onFilter: (filters: FilterOptions) => void;
  onReset: () => void;
}

const RoomFilter: React.FC<RoomFilterProps> = ({ onFilter, onReset }) => {
  const [searchText, setSearchText] = React.useState('');
  const [selectedRoomType, setSelectedRoomType] = React.useState<RoomType | undefined>();
  const [selectedManager, setSelectedManager] = React.useState<string | undefined>();

  const handleSearch = () => {
    onFilter({
      searchText: searchText || undefined,
      roomType: selectedRoomType,
      manager: selectedManager,
    });
  };

  const handleReset = () => {
    setSearchText('');
    setSelectedRoomType(undefined);
    setSelectedManager(undefined);
    onReset();
  };

  return (
    <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={6}>
          <Input
            placeholder="Tìm theo mã/tên phòng"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            allowClear
          />
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Select
            placeholder="Loại phòng"
            value={selectedRoomType}
            onChange={setSelectedRoomType}
            allowClear
          >
            <Select.Option value={RoomType.THEORY}>{RoomType.THEORY}</Select.Option>
            <Select.Option value={RoomType.PRACTICAL}>
              {RoomType.PRACTICAL}
            </Select.Option>
            <Select.Option value={RoomType.AUDITORIUM}>
              {RoomType.AUDITORIUM}
            </Select.Option>
          </Select>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Select
            placeholder="Người phụ trách"
            value={selectedManager}
            onChange={setSelectedManager}
            allowClear
          >
            {managersList.map((manager) => (
              <Select.Option key={manager} value={manager}>
                {manager}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Space>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              Tìm kiếm
            </Button>
            <Button
              icon={<ClearOutlined />}
              onClick={handleReset}
            >
              Làm mới
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default RoomFilter;
