import React, { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Select,
  message,
  Modal,
  Drawer,
  Row,
  Col,
  Tag,
  Form,
  Input,
} from 'antd';
import {
  EyeOutlined,
  SwapOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { ClubMember, Club } from './data';
import dayjs from 'dayjs';

const ThanhVien: React.FC = () => {
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

  // Mock members data
  const mockMembers: ClubMember[] = [
    {
      id: '1',
      applicationId: '2',
      fullName: 'Trần Thị Hương',
      email: 'huong@example.com',
      phoneNumber: '0987654321',
      gender: 'female',
      address: 'TP HCM',
      specialty: 'Thiết kế đồ họa',
      clubId: '2',
      joinDate: '2025-03-26',
      status: 'active',
    },
    {
      id: '2',
      applicationId: '3',
      fullName: 'Phạm Minh Tuấn',
      email: 'tuan@example.com',
      phoneNumber: '0912345678',
      gender: 'male',
      address: 'Hà Nội',
      specialty: 'Lập trình',
      clubId: '1',
      joinDate: '2025-02-15',
      status: 'active',
    },
    {
      id: '3',
      applicationId: '4',
      fullName: 'Nguyễn Thị Lan',
      email: 'lan@example.com',
      phoneNumber: '0923456789',
      gender: 'female',
      address: 'Đà Nẵng',
      specialty: 'Kỹ năng mềm',
      clubId: '1',
      joinDate: '2025-01-10',
      status: 'active',
    },
  ];

  // State management
  const [members, setMembers] = useState<ClubMember[]>(mockMembers);
  const [selectedClubId, setSelectedClubId] = useState<string>('1');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDetailDrawerVisible, setIsDetailDrawerVisible] = useState(false);
  const [detailMember, setDetailMember] = useState<ClubMember | null>(null);
  const [isChangeClubModalVisible, setIsChangeClubModalVisible] = useState(
    false,
  );
  const [newClubId, setNewClubId] = useState<string>('');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Columns definition
  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a: ClubMember, b: ClubMember) =>
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
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Sở trường',
      dataIndex: 'specialty',
      key: 'specialty',
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'joinDate',
      key: 'joinDate',
      sorter: (a: ClubMember, b: ClubMember) =>
        new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'orange'}>
          {status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      render: (_: any, record: ClubMember) => (
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
            icon={<SwapOutlined />}
            onClick={() => handleChangeClub(record)}
          >
            Đổi CLB
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteMember(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Handlers
  const handleViewDetail = (record: ClubMember) => {
    setDetailMember(record);
    setIsDetailDrawerVisible(true);
  };

  const handleChangeClub = (record: ClubMember) => {
    setDetailMember(record);
    setNewClubId(record.clubId);
    setIsChangeClubModalVisible(true);
  };

  const handleDeleteMember = (id: string) => {
    Modal.confirm({
      title: 'Xóa thành viên',
      content: 'Bạn có chắc chắn muốn xóa thành viên này?',
      okText: 'Có',
      cancelText: 'Không',
      onOk() {
        setMembers(members.filter((member) => member.id !== id));
        message.success('Xóa thành viên thành công!');
      },
    });
  };

  const handleChangeClubConfirm = () => {
    if (!newClubId || newClubId === detailMember?.clubId) {
      message.warning('Vui lòng chọn câu lạc bộ khác!');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (
        selectedRowKeys.length > 0 &&
        detailMember &&
        selectedRowKeys.includes(detailMember.id)
      ) {
        // Bulk change
        const updatedMembers = members.map((member) => {
          if (selectedRowKeys.includes(member.id)) {
            return {
              ...member,
              clubId: newClubId,
            };
          }
          return member;
        });
        setMembers(updatedMembers);
        message.success(
          `Đã chuyển ${selectedRowKeys.length} thành viên đến ${
            mockClubs.find((c) => c.id === newClubId)?.name
          }!`,
        );
      } else if (detailMember) {
        // Single change
        const updatedMembers = members.map((member) => {
          if (member.id === detailMember.id) {
            return {
              ...member,
              clubId: newClubId,
            };
          }
          return member;
        });
        setMembers(updatedMembers);
        message.success(
          `Đã chuyển thành viên đến ${
            mockClubs.find((c) => c.id === newClubId)?.name
          }!`,
        );
      }

      setLoading(false);
      setIsChangeClubModalVisible(false);
      setSelectedRowKeys([]);
      setDetailMember(null);
    }, 500);
  };

  // Filter members by club
  const filteredMembers = members.filter((member) => {
    const matchClub = member.clubId === selectedClubId;
    const matchSearch =
      member.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      member.email.toLowerCase().includes(searchText.toLowerCase()) ||
      member.phoneNumber.includes(searchText);

    return matchClub && matchSearch;
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const currentClub = mockClubs.find((c) => c.id === selectedClubId);

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16} style={{ marginBottom: '24px' }} align="middle">
        <Col span={24}>
          <h2>Quản lý thành viên câu lạc bộ</h2>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '16px' }} align="middle">
        <Col span={8}>
          <label style={{ marginRight: '8px', fontWeight: 'bold' }}>
            Chọn câu lạc bộ:
          </label>
          <Select
            value={selectedClubId}
            onChange={(value) => {
              setSelectedClubId(value);
              setSelectedRowKeys([]);
            }}
            style={{ width: '100%' }}
          >
            {mockClubs.map((club) => (
              <Select.Option key={club.id} value={club.id}>
                {club.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={16}>
          <Input.Search
            placeholder="Tìm kiếm theo tên, email hoặc SĐT..."
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>

      {currentClub && (
        <div
          style={{
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: '#f0f5ff',
            borderLeft: '4px solid #1890ff',
            borderRadius: '2px',
          }}
        >
          <p>
            <strong>Tổng thành viên của {currentClub.name}:</strong>{' '}
            {filteredMembers.length}
          </p>
        </div>
      )}

      {selectedRowKeys.length > 0 && (
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Col>
            <Button
              type="primary"
              icon={<SwapOutlined />}
              onClick={() => {
                setDetailMember(null);
                setNewClubId('');
                setIsChangeClubModalVisible(true);
              }}
            >
              Đổi CLB cho {selectedRowKeys.length} thành viên
            </Button>
          </Col>
          <Col>
            <Button onClick={() => setSelectedRowKeys([])}>
              Bỏ chọn tất cả
            </Button>
          </Col>
        </Row>
      )}

      <Table
        columns={columns}
        dataSource={filteredMembers}
        rowKey="id"
        rowSelection={rowSelection}
        pagination={{
          pageSize: 10,
          total: filteredMembers.length,
          showSizeChanger: true,
          showTotal: (total) => `Tổng cộng ${total} thành viên`,
        }}
        scroll={{ x: 1400 }}
        bordered
      />

      {/* Xem chi tiết Drawer */}
      <Drawer
        title="Chi tiết thành viên"
        placement="right"
        onClose={() => setIsDetailDrawerVisible(false)}
        visible={isDetailDrawerVisible}
        width={600}
      >
        {detailMember && (
          <div>
            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col span={12}>
                <p>
                  <strong>Họ tên:</strong>
                </p>
                <p>{detailMember.fullName}</p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Email:</strong>
                </p>
                <p>{detailMember.email}</p>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col span={12}>
                <p>
                  <strong>SĐT:</strong>
                </p>
                <p>{detailMember.phoneNumber}</p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Giới tính:</strong>
                </p>
                <p>
                  {detailMember.gender === 'male'
                    ? 'Nam'
                    : detailMember.gender === 'female'
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
                <p>{detailMember.address}</p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Sở trường:</strong>
                </p>
                <p>{detailMember.specialty}</p>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col span={12}>
                <p>
                  <strong>Câu lạc bộ:</strong>
                </p>
                <p>
                  {mockClubs.find((c) => c.id === detailMember.clubId)?.name ||
                    'N/A'}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Ngày tham gia:</strong>
                </p>
                <p>{dayjs(detailMember.joinDate).format('DD/MM/YYYY')}</p>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <p>
                  <strong>Trạng thái:</strong>
                </p>
                <p>
                  <Tag
                    color={
                      detailMember.status === 'active' ? 'green' : 'orange'
                    }
                  >
                    {detailMember.status === 'active'
                      ? 'Hoạt động'
                      : 'Không hoạt động'}
                  </Tag>
                </p>
              </Col>
            </Row>
          </div>
        )}
      </Drawer>

      {/* Đổi CLB Modal */}
      <Modal
        title={
          selectedRowKeys.length > 0
            ? `Đổi CLB cho ${selectedRowKeys.length} thành viên`
            : 'Đổi CLB cho thành viên'
        }
        visible={isChangeClubModalVisible}
        onOk={handleChangeClubConfirm}
        onCancel={() => {
          setIsChangeClubModalVisible(false);
          setDetailMember(null);
          setNewClubId('');
        }}
        confirmLoading={loading}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          {detailMember && selectedRowKeys.length === 0 && (
            <Form.Item label="Thành viên">
              <p>{detailMember.fullName}</p>
            </Form.Item>
          )}

          {selectedRowKeys.length > 0 && (
            <Form.Item label="Tổng số thành viên sẽ được đổi">
              <p style={{ fontWeight: 'bold', color: '#1890ff' }}>
                {selectedRowKeys.length} thành viên
              </p>
            </Form.Item>
          )}

          <Form.Item label="Chọn câu lạc bộ muốn chuyển đến">
            <Select
              value={newClubId}
              onChange={setNewClubId}
              placeholder="Chọn câu lạc bộ"
            >
              {mockClubs.map((club) => (
                <Select.Option key={club.id} value={club.id}>
                  {club.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {newClubId && detailMember && selectedRowKeys.length === 0 && (
            <div
              style={{
                padding: '12px',
                backgroundColor: '#e6f7ff',
                borderLeft: '4px solid #1890ff',
                borderRadius: '2px',
              }}
            >
              <p>
                Thay đổi từ:{' '}
                <strong>
                  {
                    mockClubs.find((c) => c.id === detailMember.clubId)
                      ?.name
                  }
                </strong>
              </p>
              <p>
                Sang: <strong>{mockClubs.find((c) => c.id === newClubId)?.name}</strong>
              </p>
            </div>
          )}

          {newClubId && selectedRowKeys.length > 0 && (
            <div
              style={{
                padding: '12px',
                backgroundColor: '#e6f7ff',
                borderLeft: '4px solid #1890ff',
                borderRadius: '2px',
              }}
            >
              <p>
                Chuyển <strong>{selectedRowKeys.length}</strong> thành viên
              </p>
              <p>
                Sang:{' '}
                <strong>{mockClubs.find((c) => c.id === newClubId)?.name}</strong>
              </p>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default ThanhVien;
