import React, { useMemo } from 'react';
import { Row, Col, Card, Statistic, Table, Empty } from 'antd';
import {
  TeamOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { RegistrationApplication, Club } from './data';



interface BaoCaoProps {
  applications?: RegistrationApplication[];
  clubs?: Club[];
}

const BaoCao: React.FC<BaoCaoProps> = ({ applications = [], clubs = [] }) => {
  // Mock data if not provided
  const mockClubs: Club[] =
    clubs.length > 0
      ? clubs
      : [
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

  const mockApplications: RegistrationApplication[] =
    applications.length > 0
      ? applications
      : [
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
            createdAt: '2025-03-25T14:30:00Z',
            updatedAt: '2025-03-26T09:00:00Z',
          },
          {
            id: '3',
            fullName: 'Phạm Minh Tuấn',
            email: 'tuan@example.com',
            phoneNumber: '0912345678',
            gender: 'male',
            address: 'Hà Nội',
            specialty: 'Lập trình',
            clubId: '1',
            reason: 'Muốn học hỏi',
            status: 'approved',
            createdAt: '2025-02-15T08:00:00Z',
            updatedAt: '2025-02-20T10:00:00Z',
          },
          {
            id: '4',
            fullName: 'Nguyễn Thị Lan',
            email: 'lan@example.com',
            phoneNumber: '0923456789',
            gender: 'female',
            address: 'Đà Nẵng',
            specialty: 'Kỹ năng mềm',
            clubId: '1',
            reason: 'Phát triển kỹ năng',
            status: 'pending',
            createdAt: '2025-03-15T11:00:00Z',
            updatedAt: '2025-03-15T11:00:00Z',
          },
          {
            id: '5',
            fullName: 'Lê Văn Hùng',
            email: 'hung@example.com',
            phoneNumber: '0934567890',
            gender: 'male',
            address: 'Hải Phòng',
            specialty: 'Thể thao',
            clubId: '2',
            reason: 'Yêu thích thể thao',
            status: 'approved',
            createdAt: '2025-01-10T09:00:00Z',
            updatedAt: '2025-01-15T14:00:00Z',
          },
          {
            id: '6',
            fullName: 'Ngô Thị Minh',
            email: 'minh@example.com',
            phoneNumber: '0945678901',
            gender: 'female',
            address: 'Cần Thơ',
            specialty: 'Âm nhạc',
            clubId: '3',
            reason: 'Yêu thích văn nghệ',
            status: 'rejected',
            notes: 'Chuyên ngành không phù hợp',
            createdAt: '2025-02-01T16:00:00Z',
            updatedAt: '2025-02-03T10:00:00Z',
          },
          {
            id: '7',
            fullName: 'Đặng Quốc Khánh',
            email: 'khanh@example.com',
            phoneNumber: '0956789012',
            gender: 'male',
            address: 'Bình Dương',
            specialty: 'Điều hành sự kiện',
            clubId: '3',
            reason: 'Muốn tham gia sự kiện',
            status: 'pending',
            createdAt: '2025-03-20T13:00:00Z',
            updatedAt: '2025-03-20T13:00:00Z',
          },
        ];

  // Calculate statistics
  const stats = useMemo(() => {
    const totalClubs = mockClubs.length;
    const totalApplications = mockApplications.length;
    const pendingApplications = mockApplications.filter(
      (app) => app.status === 'pending',
    ).length;
    const approvedApplications = mockApplications.filter(
      (app) => app.status === 'approved',
    ).length;
    const rejectedApplications = mockApplications.filter(
      (app) => app.status === 'rejected',
    ).length;

    return {
      totalClubs,
      totalApplications,
      pendingApplications,
      approvedApplications,
      rejectedApplications,
    };
  }, [mockApplications, mockClubs]);

  // Prepare chart data
  const chartData = useMemo(() => {
    const data = mockClubs.map((club) => {
      const clubApps = mockApplications.filter(
        (app) => app.clubId === club.id,
      );
      const pending = clubApps.filter(
        (app) => app.status === 'pending',
      ).length;
      const approved = clubApps.filter(
        (app) => app.status === 'approved',
      ).length;
      const rejected = clubApps.filter(
        (app) => app.status === 'rejected',
      ).length;

      return [
        {
          club: club.name,
          value: pending,
          category: 'Chờ duyệt',
        },
        {
          club: club.name,
          value: approved,
          category: 'Đã duyệt',
        },
        {
          club: club.name,
          value: rejected,
          category: 'Từ chối',
        },
      ];
    });

    return data.flat();
  }, [mockClubs, mockApplications]);

  // Prepare table data for detailed statistics
  const tableData = useMemo(() => {
    return mockClubs.map((club) => {
      const clubApps = mockApplications.filter(
        (app) => app.clubId === club.id,
      );
      const pending = clubApps.filter(
        (app) => app.status === 'pending',
      ).length;
      const approved = clubApps.filter(
        (app) => app.status === 'approved',
      ).length;
      const rejected = clubApps.filter(
        (app) => app.status === 'rejected',
      ).length;
      const total = clubApps.length;

      return {
        key: club.id,
        clubName: club.name,
        pending,
        approved,
        rejected,
        total,
      };
    });
  }, [mockClubs, mockApplications]);

  // Chart configuration is prepared but not used in antd v4
  // It will be used when @ant-design/charts is installed

  const tableColumns = [
    {
      title: 'Tên câu lạc bộ',
      dataIndex: 'clubName',
      key: 'clubName',
      width: '30%',
    },
    {
      title: 'Chờ duyệt',
      dataIndex: 'pending',
      key: 'pending',
      render: (text: number) => (
        <span style={{ color: '#faad14', fontWeight: 'bold' }}>{text}</span>
      ),
      align: 'center' as const,
    },
    {
      title: 'Đã duyệt',
      dataIndex: 'approved',
      key: 'approved',
      render: (text: number) => (
        <span style={{ color: '#52c41a', fontWeight: 'bold' }}>{text}</span>
      ),
      align: 'center' as const,
    },
    {
      title: 'Từ chối',
      dataIndex: 'rejected',
      key: 'rejected',
      render: (text: number) => (
        <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>{text}</span>
      ),
      align: 'center' as const,
    },
    {
      title: 'Tổng cộng',
      dataIndex: 'total',
      key: 'total',
      render: (text: number) => <span style={{ fontWeight: 'bold' }}>{text}</span>,
      align: 'center' as const,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '24px' }}>Báo cáo và thống kê</h2>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Tổng số câu lạc bộ"
              value={stats.totalClubs}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Tổng đơn đăng ký"
              value={stats.totalApplications}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Chờ duyệt"
              value={stats.pendingApplications}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Đã duyệt"
              value={stats.approvedApplications}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Từ chối"
              value={stats.rejectedApplications}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Chart */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={24}>
          <Card
            title="Số đơn đăng ký theo câu lạc bộ"
            style={{ marginBottom: '24px' }}
          >
            {chartData.length > 0 ? (
              <div style={{ height: '400px', backgroundColor: '#fafafa', borderRadius: '4px', padding: '16px' }}>
                <p style={{ color: '#999', textAlign: 'center', marginTop: '150px' }}>
                  Biểu đồ sẽ hiển thị khi @ant-design/charts được cài đặt
                </p>
              </div>
            ) : (
              <Empty description="Không có dữ liệu" />
            )}
          </Card>
        </Col>
      </Row>

      {/* Detailed Table */}
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Chi tiết thống kê theo câu lạc bộ">
            <Table
              columns={tableColumns}
              dataSource={tableData}
              pagination={false}
              bordered
              scroll={{ x: 600 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BaoCao;
