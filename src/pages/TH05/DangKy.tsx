import React, { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Drawer,
  Divider,
  Row,
  Col,
  Tag,
  Timeline,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { RegistrationApplication, OperationHistory, Club, RegistrationStatus } from './data';
import dayjs from 'dayjs';

interface RegistrationFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  specialty: string;
  clubId: string;
  reason: string;
}

const DangKy: React.FC = () => {
  // Mock clubs data
  const mockClubs: Club[] = [
    {
      id: '1',
      name: 'Câu lạc bộ Tin học',
      avatar: '',
      establishmentDate: '2020-01-15',
      description: '',
      leader: 'Nguyễn Văn A',
      isActive: true,
    },
    {
      id: '2',
      name: 'Câu lạc bộ Thể thao',
      avatar: '',
      establishmentDate: '2019-06-20',
      description: '',
      leader: 'Trần Thị B',
      isActive: true,
    },
    {
      id: '3',
      name: 'Câu lạc bộ Văn nghệ',
      avatar: '',
      establishmentDate: '2021-03-10',
      description: '',
      leader: 'Lê Văn C',
      isActive: true,
    },
  ];

  // State management
  const [applications, setApplications] = useState<RegistrationApplication[]>([
    {
      id: '1',
      fullName: 'Nguyễn Hoàng Duy',
      email: 'duy@example.com',
      phoneNumber: '0912345678',
      gender: 'male',
      address: 'Hà Nội',
      specialty: 'Lập trình Web',
      clubId: '1',
      reason: 'Thích lập trình',
      status: 'pending',
      createdAt: '2025-04-01T10:00:00Z',
      updatedAt: '2025-04-01T10:00:00Z',
    },
    {
      id: '2',
      fullName: 'Trần Thị Hương',
      email: 'huong@example.com',
      phoneNumber: '0987654321',
      gender: 'female',
      address: 'TP HCM',
      specialty: 'Thiết kế đồ họa',
      clubId: '2',
      reason: 'Muốn rèn luyện kỹ năng',
      status: 'approved',
      notes: 'Đã duyệt',
      createdAt: '2025-03-25T14:30:00Z',
      updatedAt: '2025-03-26T09:00:00Z',
    },
  ]);

  const [operationHistories, setOperationHistories] = useState<
    OperationHistory[]
  >([
    {
      id: '1',
      applicationId: '2',
      action: 'approved',
      reason: '',
      performedBy: 'Admin User',
      performedAt: '2025-03-26T09:00:00Z',
      notes: 'Ứng viên phù hợp',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedApp, setSelectedApp] = useState<RegistrationApplication | null>(
    null,
  );
  const [form] = Form.useForm<RegistrationFormData>();
  const [isDetailDrawerVisible, setIsDetailDrawerVisible] = useState(false);
  const [detailApp, setDetailApp] = useState<RegistrationApplication | null>(
    null,
  );
  const [isHistoryDrawerVisible, setIsHistoryDrawerVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'pending' | 'approved' | 'rejected'
  >('all');
  const [loading, setLoading] = useState(false);

  // Approval/Rejection Modal
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>(
    'approve',
  );
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionForm] = Form.useForm();

  // Columns definition
  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a: RegistrationApplication, b: RegistrationApplication) =>
        a.fullName.localeCompare(b.fullName),
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'SĐT',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => {
        const genderMap: Record<string, string> = {
          male: 'Nam',
          female: 'Nữ',
          other: 'Khác',
        };
        return genderMap[gender] || gender;
      },
    },
    {
      title: 'Câu lạc bộ',
      dataIndex: 'clubId',
      key: 'clubId',
      render: (clubId: string) => {
        const club = mockClubs.find((c) => c.id === clubId);
        return club?.name || 'N/A';
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Chờ duyệt', value: 'pending' },
        { text: 'Đã duyệt', value: 'approved' },
        { text: 'Từ chối', value: 'rejected' },
      ],
      onFilter: (value: any, record: RegistrationApplication) => record.status === value,
      render: (status: string) => {
        const statusMap: Record<string, [string, string]> = {
          pending: ['Chờ duyệt', 'orange'],
          approved: ['Đã duyệt', 'green'],
          rejected: ['Từ chối', 'red'],
        };
        const [label, color] = statusMap[status] || ['N/A', 'default'];
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 250,
      render: (_: any, record: RegistrationApplication) => (
        <Space size="small" wrap>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            Xem
          </Button>
          <Button
            type="default"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            disabled={record.status !== 'pending'}
          >
            Sửa
          </Button>
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={() => handleSingleApprove(record.id)}
              >
                Duyệt
              </Button>
              <Button
                type="primary"
                danger
                size="small"
                icon={<CloseOutlined />}
                onClick={() => handleSingleReject(record.id)}
              >
                Từ chối
              </Button>
            </>
          )}
          <Popconfirm
            title="Xóa đơn đăng ký? Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
            placement="topRight"
          >
            <Button type="primary" danger size="small" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
          <Button
            size="small"
            icon={<HistoryOutlined />}
            onClick={() => handleViewHistory(record.id)}
          >
            Lịch sử
          </Button>
        </Space>
      ),
    },
  ];

  // Handlers
  const handleAdd = () => {
    setModalMode('create');
    setSelectedApp(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: RegistrationApplication) => {
    setModalMode('edit');
    setSelectedApp(record);
    form.setFieldsValue({
      fullName: record.fullName,
      email: record.email,
      phoneNumber: record.phoneNumber,
      gender: record.gender,
      address: record.address,
      specialty: record.specialty,
      clubId: record.clubId,
      reason: record.reason,
    });
    setIsModalVisible(true);
  };

  const handleViewDetail = (record: RegistrationApplication) => {
    setDetailApp(record);
    setIsDetailDrawerVisible(true);
  };

  const handleViewHistory = (appId: string) => {
    setDetailApp(applications.find((app) => app.id === appId) || null);
    setIsHistoryDrawerVisible(true);
  };

  const handleDelete = (id: string) => {
    setApplications(applications.filter((app) => app.id !== id));
    message.success('Xóa đơn đăng ký thành công!');
  };

  const handleSingleApprove = (id: string) => {
    setSelectedApp(applications.find((app) => app.id === id) || null);
    setActionType('approve');
    setRejectionReason('');
    setActionModalVisible(true);
  };

  const handleSingleReject = (id: string) => {
    setSelectedApp(applications.find((app) => app.id === id) || null);
    setActionType('reject');
    setRejectionReason('');
    setActionModalVisible(true);
  };

  const handleBulkApprove = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất 1 đơn đăng ký!');
      return;
    }
    setActionType('approve');
    setRejectionReason('');
    setActionModalVisible(true);
  };

  const handleBulkReject = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất 1 đơn đăng ký!');
      return;
    }
    setActionType('reject');
    setRejectionReason('');
    setActionModalVisible(true);
  };

  const handleActionConfirm = () => {
    if (actionType === 'reject' && !rejectionReason.trim()) {
      message.error('Vui lòng nhập lý do từ chối!');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const idsToUpdate = selectedApp ? [selectedApp.id] : selectedRowKeys;

      const updatedApplications = applications.map((app) => {
        if (idsToUpdate.includes(app.id) && app.status === 'pending') {
          return {
            ...app,
            status: (actionType === 'approve' ? 'approved' : 'rejected') as RegistrationStatus,
            notes:
              actionType === 'reject' ? rejectionReason : app.notes || '',
            updatedAt: new Date().toISOString(),
          };
        }
        return app;
      });

      setApplications(updatedApplications);

      // Add operation history
      const newHistories = idsToUpdate.map((id) => ({
        id: Date.now().toString() + Math.random(),
        applicationId: id as string,
        action: (actionType === 'approve' ? 'approved' : 'rejected') as 'approved' | 'rejected',
        reason: actionType === 'reject' ? rejectionReason : '',
        performedBy: 'Admin User',
        performedAt: new Date().toISOString(),
        notes:
          actionType === 'approve'
            ? 'Đã duyệt đơn đăng ký'
            : rejectionReason,
      }));

      setOperationHistories([...operationHistories, ...newHistories]);

      message.success(
        `${actionType === 'approve' ? 'Duyệt' : 'Từ chối'} ${idsToUpdate.length} đơn đăng ký thành công!`,
      );

      setLoading(false);
      setActionModalVisible(false);
      setSelectedRowKeys([]);
      setSelectedApp(null);
      setRejectionReason('');
    }, 500);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      setTimeout(() => {
        if (modalMode === 'create') {
          const newApp: RegistrationApplication = {
            id: Date.now().toString(),
            ...values,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setApplications([...applications, newApp]);
          message.success('Thêm đơn đăng ký thành công!');
        } else if (selectedApp) {
          setApplications(
            applications.map((app) =>
              app.id === selectedApp.id
                ? {
                    ...app,
                    ...values,
                    updatedAt: new Date().toISOString(),
                  }
                : app,
            ),
          );
          message.success('Cập nhật đơn đăng ký thành công!');
        }

        setLoading(false);
        setIsModalVisible(false);
        form.resetFields();
        setSelectedApp(null);
      }, 500);
    } catch (error) {
      message.error('Vui lòng điền đầy đủ thông tin!');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedApp(null);
  };

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchSearch =
      app.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      app.email.toLowerCase().includes(searchText.toLowerCase()) ||
      app.phoneNumber.includes(searchText);

    const matchStatus =
      statusFilter === 'all' || app.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    getCheckboxProps: (record: RegistrationApplication) => ({
      disabled: record.status !== 'pending',
    }),
  };

  // Get operation history for selected app
  const appHistories = selectedApp
    ? operationHistories.filter((h) => h.applicationId === selectedApp.id)
    : detailApp
      ? operationHistories.filter((h) => h.applicationId === detailApp.id)
      : [];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Row gutter={16} align="middle" style={{ marginBottom: '16px' }}>
          <Col flex="auto">
            <Input.Search
              placeholder="Tìm kiếm theo tên, email hoặc SĐT..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%', maxWidth: '400px' }}
            />
          </Col>
          <Col>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: '150px' }}
            >
              <Select.Option value="all">Tất cả trạng thái</Select.Option>
              <Select.Option value="pending">Chờ duyệt</Select.Option>
              <Select.Option value="approved">Đã duyệt</Select.Option>
              <Select.Option value="rejected">Từ chối</Select.Option>
            </Select>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              size="large"
            >
              Thêm mới
            </Button>
          </Col>
        </Row>

        {selectedRowKeys.length > 0 && (
          <Row gutter={16}>
            <Col>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={handleBulkApprove}
              >
                Duyệt {selectedRowKeys.length} đơn
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                danger
                icon={<CloseOutlined />}
                onClick={handleBulkReject}
              >
                Từ chối {selectedRowKeys.length} đơn
              </Button>
            </Col>
            <Col>
              <Button onClick={() => setSelectedRowKeys([])}>
                Bỏ chọn tất cả
              </Button>
            </Col>
          </Row>
        )}
      </div>

      <Table
        columns={columns}
        dataSource={filteredApplications}
        rowKey="id"
        rowSelection={rowSelection}
        pagination={{
          pageSize: 10,
          total: filteredApplications.length,
          showSizeChanger: true,
          showTotal: (total) => `Tổng cộng ${total} đơn đăng ký`,
        }}
        scroll={{ x: 1400 }}
        bordered
      />

      {/* Thêm/Sửa Modal */}
      <Modal
        title={
          modalMode === 'create'
            ? 'Thêm đơn đăng ký mới'
            : 'Chỉnh sửa đơn đăng ký'
        }
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        confirmLoading={loading}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Họ tên"
                name="fullName"
                rules={[
                  { required: true, message: 'Vui lòng nhập họ tên!' },
                ]}
              >
                <Input placeholder="Nhập họ tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' },
                ]}
              >
                <Input placeholder="Nhập email" type="email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="SĐT"
                name="phoneNumber"
                rules={[
                  { required: true, message: 'Vui lòng nhập SĐT!' },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[
                  { required: true, message: 'Vui lòng chọn giới tính!' },
                ]}
              >
                <Select>
                  <Select.Option value="male">Nam</Select.Option>
                  <Select.Option value="female">Nữ</Select.Option>
                  <Select.Option value="other">Khác</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[
                  { required: true, message: 'Vui lòng nhập địa chỉ!' },
                ]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Sở trường"
                name="specialty"
                rules={[
                  { required: true, message: 'Vui lòng nhập sở trường!' },
                ]}
              >
                <Input placeholder="Nhập sở trường" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Câu lạc bộ"
            name="clubId"
            rules={[
              { required: true, message: 'Vui lòng chọn câu lạc bộ!' },
            ]}
          >
            <Select placeholder="Chọn câu lạc bộ">
              {mockClubs.map((club) => (
                <Select.Option key={club.id} value={club.id}>
                  {club.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Lý do đăng ký"
            name="reason"
            rules={[
              { required: true, message: 'Vui lòng nhập lý do!' },
            ]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Nhập lý do đăng ký"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Xem chi tiết Drawer */}
      <Drawer
        title="Chi tiết đơn đăng ký"
        placement="right"
        onClose={() => setIsDetailDrawerVisible(false)}
        visible={isDetailDrawerVisible}
        width={600}
      >
        {detailApp && (
          <div>
            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col span={12}>
                <p>
                  <strong>Họ tên:</strong>
                </p>
                <p>{detailApp.fullName}</p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Email:</strong>
                </p>
                <p>{detailApp.email}</p>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col span={12}>
                <p>
                  <strong>SĐT:</strong>
                </p>
                <p>{detailApp.phoneNumber}</p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Giới tính:</strong>
                </p>
                <p>
                  {detailApp.gender === 'male'
                    ? 'Nam'
                    : detailApp.gender === 'female'
                      ? 'Nữ'
                      : 'Khác'}
                </p>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col span={12}>
                <p>
                  <strong>Địa chỉ:</strong>
                </p>
                <p>{detailApp.address}</p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Sở trường:</strong>
                </p>
                <p>{detailApp.specialty}</p>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col span={12}>
                <p>
                  <strong>Câu lạc bộ:</strong>
                </p>
                <p>
                  {mockClubs.find((c) => c.id === detailApp.clubId)?.name ||
                    'N/A'}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Trạng thái:</strong>
                </p>
                <p>
                  <Tag
                    color={
                      detailApp.status === 'pending'
                        ? 'orange'
                        : detailApp.status === 'approved'
                          ? 'green'
                          : 'red'
                    }
                  >
                    {detailApp.status === 'pending'
                      ? 'Chờ duyệt'
                      : detailApp.status === 'approved'
                        ? 'Đã duyệt'
                        : 'Từ chối'}
                  </Tag>
                </p>
              </Col>
            </Row>

            <Divider />

            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col span={24}>
                <p>
                  <strong>Lý do đăng ký:</strong>
                </p>
                <p>{detailApp.reason}</p>
              </Col>
            </Row>

            {detailApp.notes && (
              <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col span={24}>
                  <p>
                    <strong>Ghi chú:</strong>
                  </p>
                  <p>{detailApp.notes}</p>
                </Col>
              </Row>
            )}

            <Row gutter={16}>
              <Col span={12}>
                <p>
                  <strong>Ngày tạo:</strong>
                </p>
                <p>{dayjs(detailApp.createdAt).format('DD/MM/YYYY HH:mm')}</p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Cập nhật lần cuối:</strong>
                </p>
                <p>{dayjs(detailApp.updatedAt).format('DD/MM/YYYY HH:mm')}</p>
              </Col>
            </Row>
          </div>
        )}
      </Drawer>

      {/* Lịch sử thao tác Drawer */}
      <Drawer
        title="Lịch sử thao tác"
        placement="right"
        onClose={() => setIsHistoryDrawerVisible(false)}
        visible={isHistoryDrawerVisible}
        width={600}
      >
        {appHistories.length > 0 ? (
          <Timeline>
            {appHistories.map((history) => (
              <Timeline.Item
                key={history.id}
                label={dayjs(history.performedAt).format('DD/MM/YYYY HH:mm')}
              >
                <div>
                  <p>
                    <strong>Hành động:</strong>{' '}
                    <Tag
                      color={history.action === 'approved' ? 'green' : 'red'}
                    >
                      {history.action === 'approved' ? 'Duyệt' : 'Từ chối'}
                    </Tag>
                  </p>
                  <p>
                    <strong>Thực hiện bởi:</strong> {history.performedBy}
                  </p>
                  {history.reason && (
                    <p>
                      <strong>Lý do:</strong> {history.reason}
                    </p>
                  )}
                  {history.notes && (
                    <p>
                      <strong>Ghi chú:</strong> {history.notes}
                    </p>
                  )}
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        ) : (
          <p style={{ textAlign: 'center', color: '#999' }}>
            Không có lịch sử thao tác
          </p>
        )}
      </Drawer>

      {/* Duyệt/Từ chối Modal */}
      <Modal
        title={
          actionType === 'approve'
            ? `Duyệt ${selectedRowKeys.length > 0 ? selectedRowKeys.length + ' đơn' : '1 đơn'} đăng ký`
            : `Từ chối ${selectedRowKeys.length > 0 ? selectedRowKeys.length + ' đơn' : '1 đơn'} đăng ký`
        }
        visible={actionModalVisible}
        onOk={handleActionConfirm}
        onCancel={() => {
          setActionModalVisible(false);
          setRejectionReason('');
          setSelectedApp(null);
        }}
        confirmLoading={loading}
        okText={actionType === 'approve' ? 'Duyệt' : 'Từ chối'}
        cancelText="Hủy"
      >
        <Form form={actionForm} layout="vertical">
          {actionType === 'reject' && (
            <Form.Item label="Lý do từ chối">
              <Input.TextArea
                rows={4}
                placeholder="Nhập lý do từ chối (bắt buộc)"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </Form.Item>
          )}
          {actionType === 'approve' && (
            <p style={{ color: '#666' }}>
              Bạn có chắc chắn muốn duyệt{' '}
              {selectedRowKeys.length > 0 ? selectedRowKeys.length + ' đơn' : '1 đơn'}{' '}
              đăng ký này không?
            </p>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default DangKy;
