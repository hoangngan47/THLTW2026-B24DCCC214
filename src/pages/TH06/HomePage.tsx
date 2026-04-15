import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Space,
  Select,
  InputNumber,
  Input,
  Rate,
  Tag,
  Empty,
  Spin,
} from 'antd';
import {
  SearchOutlined,
  ClearOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Destination, DestinationType, FilterOptions } from './types';
import { mockDestinations } from './data';

const HomePage: React.FC = () => {
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(mockDestinations);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  const getTypeColor = (type: DestinationType) => {
    const colors: { [key in DestinationType]: string } = {
      [DestinationType.BEACH]: 'blue',
      [DestinationType.MOUNTAIN]: 'green',
      [DestinationType.CITY]: 'purple',
      [DestinationType.HISTORICAL]: 'orange',
      [DestinationType.NATURE]: 'cyan',
    };
    return colors[type];
  };

  const handleFilter = () => {
    setLoading(true);
    setTimeout(() => {
      let filtered = mockDestinations;

      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase();
        filtered = filtered.filter(
          (d) =>
            d.name.toLowerCase().includes(searchLower) ||
            d.description.toLowerCase().includes(searchLower),
        );
      }

      if (filters.type) {
        filtered = filtered.filter((d) => d.type === filters.type);
      }

      if (filters.minPrice !== undefined) {
        filtered = filtered.filter((d) => d.price >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter((d) => d.price <= filters.maxPrice!);
      }

      if (filters.minRating !== undefined) {
        filtered = filtered.filter((d) => d.rating >= filters.minRating!);
      }

      setFilteredDestinations(filtered);
      setLoading(false);
    }, 300);
  };

  const handleReset = () => {
    setFilters({});
    setFilteredDestinations(mockDestinations);
  };

  return (
    <div style={{ padding: '16px', paddingLeft: '24px' }}>
      {/* Filter Section */}
      <Card style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '12px' }}>
          <h3 style={{ margin: 0 }}>Tìm kiếm điểm đến</h3>
        </div>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12} md={4}>
            <Input
              placeholder="Tìm kiếm tên..."
              value={filters.searchText || ''}
              onChange={(e) => setFilters({ ...filters, searchText: e.target.value })}
              allowClear
              size="middle"
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Loại địa điểm"
              value={filters.type}
              onChange={(value) => setFilters({ ...filters, type: value })}
              allowClear
              style={{ width: '100%' }}
            >
              {Object.values(DestinationType).map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <InputNumber
              placeholder="Giá min"
              value={filters.minPrice}
              onChange={(value) => setFilters({ ...filters, minPrice: value || undefined })}
              style={{ width: '100%' }}
              size="middle"
            />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <InputNumber
              placeholder="Giá max"
              value={filters.maxPrice}
              onChange={(value) => setFilters({ ...filters, maxPrice: value || undefined })}
              style={{ width: '100%' }}
              size="middle"
            />
          </Col>
          <Col xs={12} sm={6} md={2}>
            <InputNumber
              min={0}
              max={5}
              placeholder="Rating"
              value={filters.minRating}
              onChange={(value) => setFilters({ ...filters, minRating: value || undefined })}
              style={{ width: '100%' }}
              size="middle"
            />
          </Col>
          <Col xs={12} sm={6} md={8}>
            <Space size="small" style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button
                type="primary"
                size="middle"
                icon={<SearchOutlined />}
                onClick={handleFilter}
              >
                Tìm kiếm
              </Button>
              <Button
                size="middle"
                icon={<ClearOutlined />}
                onClick={handleReset}
              >
                Làm mới
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Destinations Grid */}
      <Spin spinning={loading}>
        {filteredDestinations.length > 0 ? (
          <Row gutter={[16, 16]}>
            {filteredDestinations.map((destination) => (
              <Col xs={24} sm={24} md={12} lg={8} key={destination.id}>
                <Card
                  hoverable
                  cover={
                    <div
                      style={{
                        width: '100%',
                        height: '200px',
                        overflow: 'hidden',
                        backgroundColor: '#f0f0f0',
                      }}
                    >
                      <img
                        alt={destination.name}
                        src={destination.image || 'https://via.placeholder.com/300x200'}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  }
                >
                  <div>
                    <div style={{ marginBottom: '8px' }}>
                      <h3 style={{ margin: '0 0 8px 0' }}>{destination.name}</h3>
                      <Tag color={getTypeColor(destination.type)}>
                        {destination.type}
                      </Tag>
                    </div>

                    <p style={{ color: '#666', fontSize: '12px', marginBottom: '10px' }}>
                      {destination.description}
                    </p>

                    <div style={{ marginBottom: '10px' }}>
                      <Rate
                        value={destination.rating}
                        allowHalf
                        disabled
                      />
                      <span style={{ marginLeft: '8px', fontSize: '12px' }}>
                        ({destination.reviewCount})
                      </span>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ margin: '5px 0', fontSize: '13px' }}>
                        <strong>Thời gian tham quan:</strong> {destination.viewingTime}h
                      </p>
                      <p style={{ margin: '5px 0', fontSize: '13px' }}>
                        <strong>Chi phí:</strong> {destination.price.toLocaleString('vi-VN')} ₫
                      </p>
                    </div>

                    <div style={{ fontSize: '12px', marginBottom: '10px', color: '#666' }}>
                      <p style={{ margin: '3px 0' }}>
                        Ăn: {destination.foodPrice.toLocaleString('vi-VN')} ₫
                      </p>
                      <p style={{ margin: '3px 0' }}>
                         Lưu trú: {destination.accommodationPrice.toLocaleString('vi-VN')} ₫
                      </p>
                      <p style={{ margin: '3px 0' }}>
                         Di chuyển: {destination.transportPrice.toLocaleString('vi-VN')} ₫
                      </p>
                    </div>

                    <Button
                      type="primary"
                      block
                      icon={<ShoppingCartOutlined />}
                    >
                      Thêm vào lịch trình
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="Không tìm thấy điểm đến phù hợp" />
        )}
      </Spin>
    </div>
  );
};

export default HomePage;
