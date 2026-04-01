import React, { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  Switch,
  Upload,
  message,
  Popconfirm,
  Image,
  Drawer,
  Divider,
  Row,
  Col,
  Tag,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import RichTextEditor from '@/components/TinyEditor';
import { Club } from './data';
import dayjs from 'dayjs';

interface ClubFormData {
  name: string;
  avatar?: string;
  establishmentDate: dayjs.Dayjs | null;
  description: string;
  leader: string;
  isActive: boolean;
}

const DanhSach: React.FC = () => {
  // State management
  const [clubs, setClubs] = useState<Club[]>([
    {
      id: '1',
      name: 'Câu lạc bộ Tin học',
      avatar: 'https://via.placeholder.com/100',
      establishmentDate: '2020-01-15',
      description: '<p>Câu lạc bộ dành cho những người yêu thích tin học</p>',
      leader: 'Nguyễn Văn A',
      isActive: true,
      createdAt: '2020-01-15',
    },
    {
      id: '2',
      name: 'Câu lạc bộ Thể thao',
      avatar: 'https://via.placeholder.com/100',
      establishmentDate: '2019-06-20',
      description: '<p>Các hoạt động thể thao đa dạng</p>',
      leader: 'Trần Thị B',
      isActive: true,
      createdAt: '2019-06-20',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [form] = Form.useForm<ClubFormData>();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerClub, setDrawerClub] = useState<Club | null>(null);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  // Columns definition
  const columns = [
    {
      title: 'Ảnh đại diện',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      render: (avatar: string) => (
        <Image
          src={avatar || 'https://via.placeholder.com/50'}
          width={50}
          height={50}
          style={{ borderRadius: '4px' }}
        />
      ),
    },
    {
      title: 'Tên câu lạc bộ',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Club, b: Club) => a.name.localeCompare(b.name),
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Ngày thành lập',
      dataIndex: 'establishmentDate',
      key: 'establishmentDate',
      sorter: (a: Club, b: Club) =>
        new Date(a.establishmentDate).getTime() -
        new Date(b.establishmentDate).getTime(),
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Chủ nhiệm CLB',
      dataIndex: 'leader',
      key: 'leader',
      sorter: (a: Club, b: Club) => a.leader.localeCompare(b.leader),
    },
    {
      title: 'Hoạt động',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Có' : 'Không'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      render: (_: any, record: Club) => (
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
            title="Xóa câu lạc bộ? Bạn có chắc chắn muốn xóa câu lạc bộ này?"
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
            type="default"
            size="small"
            icon={<UserOutlined />}
            onClick={() => {
              message.info(`Xem danh sách thành viên của: ${record.name}`);
            }}
          >
            Thành viên
          </Button>
        </Space>
      ),
    },
  ];

  // Handlers
  const handleAdd = () => {
    setModalMode('create');
    setSelectedClub(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Club) => {
    setModalMode('edit');
    setSelectedClub(record);
    form.setFieldsValue({
      name: record.name,
      establishmentDate: dayjs(record.establishmentDate),
      description: record.description,
      leader: record.leader,
      isActive: record.isActive,
    });
    setIsModalVisible(true);
  };

  const handleView = (record: Club) => {
    setDrawerClub(record);
    setIsDrawerVisible(true);
  };

  const handleDelete = (id: string) => {
    setClubs(clubs.filter((club) => club.id !== id));
    message.success('Xóa câu lạc bộ thành công!');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      setTimeout(() => {
        if (modalMode === 'create') {
          const newClub: Club = {
            id: Date.now().toString(),
            name: values.name,
            establishmentDate: values.establishmentDate?.format('YYYY-MM-DD') || new Date().toISOString().split('T')[0],
            description: values.description,
            leader: values.leader,
            isActive: values.isActive,
            createdAt: new Date().toISOString(),
          };
          setClubs([...clubs, newClub]);
          message.success('Thêm câu lạc bộ thành công!');
        } else if (selectedClub) {
          setClubs(
            clubs.map((club) =>
              club.id === selectedClub.id
                ? {
                    ...club,
                    name: values.name,
                    establishmentDate: values.establishmentDate?.format(
                      'YYYY-MM-DD',
                    ) || new Date().toISOString().split('T')[0],
                    description: values.description,
                    leader: values.leader,
                    isActive: values.isActive,
                    updatedAt: new Date().toISOString(),
                  }
                : club,
            ),
          );
          message.success('Cập nhật câu lạc bộ thành công!');
        }

        setLoading(false);
        setIsModalVisible(false);
        form.resetFields();
        setSelectedClub(null);
      }, 500);
    } catch (error) {
      message.error('Vui lòng điền đầy đủ thông tin!');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedClub(null);
  };

  // Filter clubs based on search
  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchText.toLowerCase()) ||
      club.leader.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Input.Search
              placeholder="Tìm kiếm câu lạc bộ theo tên hoặc chủ nhiệm..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '300px' }}
            />
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
      </div>

      <Table
        columns={columns}
        dataSource={filteredClubs}
        rowKey="id"
        pagination={{
          pageSize: 10,
          total: filteredClubs.length,
          showSizeChanger: true,
          showTotal: (total) => `Tổng cộng ${total} câu lạc bộ`,
        }}
        scroll={{ x: 1200 }}
        bordered
      />

      {/* Thêm/Sửa Modal */}
      <Modal
        title={modalMode === 'create' ? 'Thêm câu lạc bộ mới' : 'Chỉnh sửa câu lạc bộ'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        confirmLoading={loading}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Ảnh đại diện">
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Tên câu lạc bộ"
            name="name"
            rules={[
              { required: true, message: 'Vui lòng nhập tên câu lạc bộ!' },
            ]}
          >
            <Input placeholder="Nhập tên câu lạc bộ" />
          </Form.Item>

          <Form.Item
            label="Ngày thành lập"
            name="establishmentDate"
            rules={[
              { required: true, message: 'Vui lòng chọn ngày thành lập!' },
            ]}
          >
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            label="Mô tả (HTML)"
            name="description"
            rules={[
              { required: true, message: 'Vui lòng nhập mô tả!' },
            ]}
          >
            <RichTextEditor
              onChange={(content) => {
                form.setFieldsValue({ description: content });
              }}
              value={selectedClub?.description || ''}
            />
          </Form.Item>

          <Form.Item
            label="Chủ nhiệm CLB"
            name="leader"
            rules={[
              { required: true, message: 'Vui lòng nhập tên chủ nhiệm!' },
            ]}
          >
            <Input placeholder="Nhập tên chủ nhiệm CLB" />
          </Form.Item>

          <Form.Item label="Hoạt động" name="isActive" valuePropName="checked">
            <Switch checkedChildren="Có" unCheckedChildren="Không" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Xem chi tiết Drawer */}
      <Drawer
        title={`Chi tiết - ${drawerClub?.name}`}
        placement="right"
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
        width={600}
      >
        {drawerClub && (
          <div>
            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col span={24}>
                <Image
                  src={drawerClub.avatar || 'https://via.placeholder.com/200'}
                  width={200}
                  height={200}
                  style={{ borderRadius: '4px' }}
                />
              </Col>
            </Row>

            <Divider />

            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col span={12}>
                <p>
                  <strong>Tên câu lạc bộ:</strong>
                </p>
                <p>{drawerClub.name}</p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Chủ nhiệm CLB:</strong>
                </p>
                <p>{drawerClub.leader}</p>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col span={12}>
                <p>
                  <strong>Ngày thành lập:</strong>
                </p>
                <p>{dayjs(drawerClub.establishmentDate).format('DD/MM/YYYY')}</p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Hoạt động:</strong>
                </p>
                <p>
                  <Tag color={drawerClub.isActive ? 'green' : 'red'}>
                    {drawerClub.isActive ? 'Có' : 'Không'}
                  </Tag>
                </p>
              </Col>
            </Row>

            <Divider />

            <Row gutter={16}>
              <Col span={24}>
                <p>
                  <strong>Mô tả:</strong>
                </p>
                <div
                  dangerouslySetInnerHTML={{ __html: drawerClub.description }}
                  style={{
                    padding: '8px',
                    border: '1px solid #f0f0f0',
                    borderRadius: '4px',
                    backgroundColor: '#fafafa',
                  }}
                />
              </Col>
            </Row>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default DanhSach;
