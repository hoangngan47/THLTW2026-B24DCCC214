import React, { useState } from 'react';
import {
  Card,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Table,
  Tag,
  message,
  Popconfirm,
  Drawer,
  Descriptions,
  Divider,
  Rate,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Destination, DestinationType } from './types';
import { mockDestinations } from './data';

interface DestinationFormData {
  name: string;
  description: string;
  type: DestinationType;
  rating: number;
  viewingTime: number;
  price: number;
  foodPrice: number;
  accommodationPrice: number;
  transportPrice: number;
}

const Admin: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>(mockDestinations);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [form] = Form.useForm<DestinationFormData>();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerDestination, setDrawerDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleAdd = () => {
    setModalMode('create');
    setSelectedDestination(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (destination: Destination) => {
    setModalMode('edit');
    setSelectedDestination(destination);
    form.setFieldsValue({
      name: destination.name,
      description: destination.description,
      type: destination.type,
      rating: destination.rating,
      viewingTime: destination.viewingTime,
      price: destination.price,
      foodPrice: destination.foodPrice,
      accommodationPrice: destination.accommodationPrice,
      transportPrice: destination.transportPrice,
    });
    setIsModalVisible(true);
  };

  const handleView = (destination: Destination) => {
    setDrawerDestination(destination);
    setIsDrawerVisible(true);
  };

  const handleDelete = (id: string) => {
    setDestinations(destinations.filter((d) => d.id !== id));
    message.success('Xóa điểm đến thành công!');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      setTimeout(() => {
        if (modalMode === 'create') {
          const newDestination: Destination = {
            id: Date.now().toString(),
            ...values,
            reviewCount: 0,
            createdAt: new Date().toISOString().split('T')[0],
          };
          setDestinations([...destinations, newDestination]);
          message.success('Thêm điểm đến thành công!');
        } else if (selectedDestination) {
          setDestinations(
            destinations.map((d) =>
              d.id === selectedDestination.id
                ? {
                    ...selectedDestination,
                    ...values,
                    updatedAt: new Date().toISOString().split('T')[0],
                  }
                : d,
            ),
          );
          message.success('Cập nhật điểm đến thành công!');
        }

        setLoading(false);
        setIsModalVisible(false);
        form.resetFields();
        setSelectedDestination(null);
      }, 500);
    } catch (error) {
      message.error('Vui lòng điền đầy đủ thông tin hợp lệ!');
    }
  };

  const columns = [
    {
      title: 'Tên điểm đến',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      sorter: (a: Destination, b: Destination) => a.name.localeCompare(b.name),
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      filters: Object.values(DestinationType).map((type) => ({
        text: type,
        value: type,
      })),
      onFilter: (value: any, record: Destination) => record.type === value,
      render: (type: DestinationType) => (
        <Tag color={getTypeColor(type)}>{type}</Tag>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      width: 100,
      sorter: (a: Destination, b: Destination) => a.rating - b.rating,
      render: (rating: number, record: Destination) => (
        <div>
          <Rate value={rating} disabled allowHalf />
          <span style={{ marginLeft: '8px', fontSize: '12px' }}>
            ({record.reviewCount})
          </span>
        </div>
      ),
    },
    {
      title: 'Chi phí',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      sorter: (a: Destination, b: Destination) => a.price - b.price,
      render: (price: number) => (
        <span>{price.toLocaleString('vi-VN')} ₫</span>
      ),
    },
    {
      title: 'Thời gian',
      dataIndex: 'viewingTime',
      key: 'viewingTime',
      width: 80,
      sorter: (a: Destination, b: Destination) => a.viewingTime - b.viewingTime,
      render: (time: number) => <span>{time}h</span>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 180,
      render: (_: any, record: Destination) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            Xem
          </Button>
          <Button
            type="default"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa điểm đến? Bạn có chắc chắn muốn xóa điểm đến này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" danger size="small" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '16px', paddingLeft: '24px' }}>
      <Card
        title="Quản lý điểm đến"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm điểm đến
          </Button>
        }
        bodyStyle={{ padding: '0' }}
      >
        <div style={{ padding: '16px' }}>
          <Table
            columns={columns}
            dataSource={destinations.map((d) => ({ ...d, key: d.id }))}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} điểm đến`,
            }}
            bordered
            size="small"
          />
        </div>
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        title={
          modalMode === 'create'
            ? 'Thêm điểm đến mới'
            : 'Chỉnh sửa điểm đến'
        }
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedDestination(null);
        }}
        confirmLoading={loading}
        okText="Lưu"
        cancelText="Hủy"
        width={700}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item
            name="name"
            label="Tên điểm đến"
            rules={[{ required: true, message: 'Vui lòng nhập tên điểm đến!' }]}
          >
            <Input placeholder="Ví dụ: Phú Quốc" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <Input.TextArea
              placeholder="Mô tả về địa điểm"
              rows={3}
            />
          </Form.Item>

          <Form.Item
            name="type"
            label="Loại địa điểm"
            rules={[{ required: true, message: 'Vui lòng chọn loại!' }]}
          >
            <Select placeholder="Chọn loại địa điểm">
              {Object.values(DestinationType).map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="rating"
            label="Đánh giá"
            rules={[{ required: true, message: 'Vui lòng nhập đánh giá!' }]}
          >
            <InputNumber min={0} max={5} step={0.1} placeholder="0 - 5" />
          </Form.Item>

          <Form.Item
            name="viewingTime"
            label="Thời gian tham quan (giờ)"
            rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
          >
            <InputNumber min={0.5} step={0.5} placeholder="Ví dụ: 2" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Tổng chi phí (VNĐ)"
            rules={[{ required: true, message: 'Vui lòng nhập tổng chi phí!' }]}
          >
            <InputNumber min={0} placeholder="Ví dụ: 1200000" />
          </Form.Item>

          <Form.Item
            name="foodPrice"
            label="Chi phí ăn uống (VNĐ)"
            rules={[{ required: true, message: 'Vui lòng nhập chi phí ăn uống!' }]}
          >
            <InputNumber min={0} placeholder="Ví dụ: 400000" />
          </Form.Item>

          <Form.Item
            name="accommodationPrice"
            label="Chi phí lưu trú (VNĐ)"
            rules={[{ required: true, message: 'Vui lòng nhập chi phí lưu trú!' }]}
          >
            <InputNumber min={0} placeholder="Ví dụ: 600000" />
          </Form.Item>

          <Form.Item
            name="transportPrice"
            label="Chi phí di chuyển (VNĐ)"
            rules={[{ required: true, message: 'Vui lòng nhập chi phí di chuyển!' }]}
          >
            <InputNumber min={0} placeholder="Ví dụ: 200000" />
          </Form.Item>
        </Form>
      </Modal>

      {/* View Drawer */}
      <Drawer
        title={`Điểm đến: ${drawerDestination?.name}`}
        placement="right"
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
        width={400}
      >
        {drawerDestination && (
          <div>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Mô tả">
                {drawerDestination.description}
              </Descriptions.Item>
              <Descriptions.Item label="Loại">
                <Tag color={getTypeColor(drawerDestination.type)}>
                  {drawerDestination.type}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Đánh giá">
                <Rate value={drawerDestination.rating} allowHalf disabled />
                <span style={{ marginLeft: '8px' }}>
                  ({drawerDestination.reviewCount} đánh giá)
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Thời gian tham quan">
                {drawerDestination.viewingTime} giờ
              </Descriptions.Item>
              <Descriptions.Item label="Tổng chi phí">
                <strong>
                  {drawerDestination.price.toLocaleString('vi-VN')} ₫
                </strong>
              </Descriptions.Item>
              <Descriptions.Item label="Chi tiết chi phí">
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  <li>🍽️ Ăn: {drawerDestination.foodPrice.toLocaleString('vi-VN')} ₫</li>
                  <li>🏨 Lưu trú: {drawerDestination.accommodationPrice.toLocaleString('vi-VN')} ₫</li>
                  <li>🚗 Di chuyển: {drawerDestination.transportPrice.toLocaleString('vi-VN')} ₫</li>
                </ul>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div style={{ textAlign: 'center' }}>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    handleEdit(drawerDestination);
                    setIsDrawerVisible(false);
                  }}
                >
                  Chỉnh sửa
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    handleDelete(drawerDestination.id);
                    setIsDrawerVisible(false);
                  }}
                >
                  Xóa
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Admin;
