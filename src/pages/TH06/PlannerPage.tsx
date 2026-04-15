import React, { useState } from 'react';
import {
  Card,
  Button,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  Table,
  Tag,
  message,
  Popconfirm,
  Drawer,
  Descriptions,
  Divider,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { TravelPlan, PlanStatus } from './types';
import { mockTravelPlans } from './data';

interface PlanFormData {
  title: string;
  description?: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}

const PlannerPage: React.FC = () => {
  const [plans, setPlans] = useState<TravelPlan[]>(mockTravelPlans);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedPlan, setSelectedPlan] = useState<TravelPlan | null>(null);
  const [form] = Form.useForm<PlanFormData>();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerPlan, setDrawerPlan] = useState<TravelPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const getStatusColor = (status: PlanStatus) => {
    const colors: { [key in PlanStatus]: string } = {
      draft: 'default',
      planned: 'blue',
      ongoing: 'green',
      completed: 'purple',
    };
    return colors[status];
  };

  const getStatusLabel = (status: PlanStatus) => {
    const labels: { [key in PlanStatus]: string } = {
      draft: 'Nháp',
      planned: 'Đã lên kế hoạch',
      ongoing: 'Đang diễn ra',
      completed: 'Hoàn thành',
    };
    return labels[status];
  };

  const calculateDays = (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) => {
    return endDate.diff(startDate, 'day') + 1;
  };

  const handleAdd = () => {
    setModalMode('create');
    setSelectedPlan(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (plan: TravelPlan) => {
    setModalMode('edit');
    setSelectedPlan(plan);
    form.setFieldsValue({
      title: plan.title,
      description: plan.description,
      startDate: dayjs(plan.startDate),
      endDate: dayjs(plan.endDate),
    });
    setIsModalVisible(true);
  };

  const handleView = (plan: TravelPlan) => {
    setDrawerPlan(plan);
    setIsDrawerVisible(true);
  };

  const handleDelete = (id: string) => {
    setPlans(plans.filter((p) => p.id !== id));
    message.success('Xóa lịch trình du lịch thành công!');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      setTimeout(() => {
        if (modalMode === 'create') {
          const numberOfDays = calculateDays(values.startDate, values.endDate);
          const newPlan: TravelPlan = {
            id: Date.now().toString(),
            title: values.title,
            description: values.description,
            startDate: values.startDate.format('YYYY-MM-DD'),
            endDate: values.endDate.format('YYYY-MM-DD'),
            numberOfDays,
            destinations: [],
            itinerary: Array.from({ length: numberOfDays }, (_, i) => ({
              day: i + 1,
              date: values.startDate.add(i, 'day').format('YYYY-MM-DD'),
              destinations: [],
              totalBudget: 0,
            })),
            totalBudget: 0,
            budgetBreakdown: {
              food: 0,
              accommodation: 0,
              transport: 0,
              activities: 0,
              other: 0,
            },
            status: 'draft',
            createdAt: new Date().toISOString().split('T')[0],
          };
          setPlans([...plans, newPlan]);
          message.success('Tạo lịch trình du lịch thành công!');
        } else if (selectedPlan) {
          const numberOfDays = calculateDays(values.startDate, values.endDate);
          setPlans(
            plans.map((p) =>
              p.id === selectedPlan.id
                ? {
                    ...p,
                    title: values.title,
                    description: values.description,
                    startDate: values.startDate.format('YYYY-MM-DD'),
                    endDate: values.endDate.format('YYYY-MM-DD'),
                    numberOfDays,
                    updatedAt: new Date().toISOString().split('T')[0],
                  }
                : p,
            ),
          );
          message.success('Cập nhật lịch trình du lịch thành công!');
        }

        setLoading(false);
        setIsModalVisible(false);
        form.resetFields();
        setSelectedPlan(null);
      }, 500);
    } catch (error) {
      message.error('Vui lòng điền đầy đủ thông tin!');
    }
  };

  const columns = [
    {
      title: 'Tên lịch trình',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      sorter: (a: TravelPlan, b: TravelPlan) => a.title.localeCompare(b.title),
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      sorter: (a: TravelPlan, b: TravelPlan) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 120,
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Số ngày',
      dataIndex: 'numberOfDays',
      key: 'numberOfDays',
      width: 80,
      sorter: (a: TravelPlan, b: TravelPlan) => a.numberOfDays - b.numberOfDays,
      render: (days: number) => <span>{days} ngày</span>,
    },
    {
      title: 'Ngân sách',
      dataIndex: 'totalBudget',
      key: 'totalBudget',
      width: 150,
      sorter: (a: TravelPlan, b: TravelPlan) => a.totalBudget - b.totalBudget,
      render: (budget: number) => (
        <span>{budget.toLocaleString('vi-VN')} ₫</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      filters: [
        { text: 'Nháp', value: 'draft' },
        { text: 'Đã lên kế hoạch', value: 'planned' },
        { text: 'Đang diễn ra', value: 'ongoing' },
        { text: 'Hoàn thành', value: 'completed' },
      ],
      onFilter: (value: any, record: TravelPlan) => record.status === value,
      render: (status: PlanStatus) => (
        <Tag color={getStatusColor(status)}>{getStatusLabel(status)}</Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      render: (_: any, record: TravelPlan) => (
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
            title="Xóa lịch trình? Bạn có chắc chắn muốn xóa lịch trình này?"
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
        title="Lập kế hoạch du lịch"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Tạo lịch trình mới
          </Button>
        }
        bodyStyle={{ padding: '0' }}
      >
        <div style={{ padding: '16px' }}>
          <Table
            columns={columns}
            dataSource={plans.map((p) => ({ ...p, key: p.id }))}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} lịch trình`,
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
            ? 'Tạo lịch trình du lịch mới'
            : 'Chỉnh sửa lịch trình du lịch'
        }
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedPlan(null);
        }}
        confirmLoading={loading}
        okText="Lưu"
        cancelText="Hủy"
        width={600}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item
            name="title"
            label="Tên lịch trình"
            rules={[{ required: true, message: 'Vui lòng nhập tên lịch trình!' }]}
          >
            <Input placeholder="Ví dụ: Chuyến đi Phú Quốc 3 ngày" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
          >
            <Input.TextArea
              placeholder="Mô tả về lịch trình du lịch"
              rows={3}
            />
          </Form.Item>

          <Form.Item
            name="startDate"
            label="Ngày bắt đầu"
            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="Ngày kết thúc"
            rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* View Drawer */}
      <Drawer
        title={`Lịch trình: ${drawerPlan?.title}`}
        placement="right"
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
        width={400}
      >
        {drawerPlan && (
          <div>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Mô tả">
                {drawerPlan.description || 'Không có'}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày bắt đầu">
                {dayjs(drawerPlan.startDate).format('DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày kết thúc">
                {dayjs(drawerPlan.endDate).format('DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Số ngày">
                {drawerPlan.numberOfDays} ngày
              </Descriptions.Item>
              <Descriptions.Item label="Số điểm đến">
                {drawerPlan.destinations.length}
              </Descriptions.Item>
              <Descriptions.Item label="Tổng ngân sách">
                <strong>{drawerPlan.totalBudget.toLocaleString('vi-VN')} ₫</strong>
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={getStatusColor(drawerPlan.status)}>
                  {getStatusLabel(drawerPlan.status)}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div style={{ textAlign: 'center' }}>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    handleEdit(drawerPlan);
                    setIsDrawerVisible(false);
                  }}
                >
                  Chỉnh sửa
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    handleDelete(drawerPlan.id);
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

export default PlannerPage;
