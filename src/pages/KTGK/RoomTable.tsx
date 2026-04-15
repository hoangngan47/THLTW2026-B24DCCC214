import React from 'react';
import { Table, Button, Space, Popconfirm, Tag, message } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Room, RoomType } from './types';

interface RoomTableProps {
  rooms: Room[];
  loading?: boolean;
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
  onView: (room: Room) => void;
  onSortChange?: (field: string, order: string) => void;
}

const RoomTable: React.FC<RoomTableProps> = ({
  rooms,
  loading = false,
  onEdit,
  onDelete,
  onView,
  onSortChange,
}) => {
  const getRoomTypeColor = (type: RoomType) => {
    const colors: { [key in RoomType]: string } = {
      [RoomType.THEORY]: 'blue',
      [RoomType.PRACTICAL]: 'green',
      [RoomType.AUDITORIUM]: 'purple',
    };
    return colors[type];
  };

  const handleDeleteClick = (room: Room) => {
    if (room.capacity >= 30) {
      message.error('Chỉ có thể xóa phòng dưới 30 chỗ ngồi!');
      return;
    }
    onDelete(room);
  };

  const columns = [
    {
      title: 'Mã phòng',
      dataIndex: 'roomCode',
      key: 'roomCode',
      width: 100,
      sorter: (a: Room, b: Room) => a.roomCode.localeCompare(b.roomCode),
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Tên phòng',
      dataIndex: 'roomName',
      key: 'roomName',
      width: 200,
      sorter: (a: Room, b: Room) => a.roomName.localeCompare(b.roomName),
    },
    {
      title: 'Số chỗ ngồi',
      dataIndex: 'capacity',
      key: 'capacity',
      width: 120,
      sorter: (a: Room, b: Room) => a.capacity - b.capacity,
      render: (capacity: number) => <strong>{capacity}</strong>,
    },
    {
      title: 'Loại phòng',
      dataIndex: 'roomType',
      key: 'roomType',
      width: 120,
      filters: [
        { text: RoomType.THEORY, value: RoomType.THEORY },
        { text: RoomType.PRACTICAL, value: RoomType.PRACTICAL },
        { text: RoomType.AUDITORIUM, value: RoomType.AUDITORIUM },
      ],
      onFilter: (value: any, record: Room) => record.roomType === value,
      render: (type: RoomType) => (
        <Tag color={getRoomTypeColor(type)}>{type}</Tag>
      ),
    },
    {
      title: 'Người phụ trách',
      dataIndex: 'manager',
      key: 'manager',
      width: 150,
      sorter: (a: Room, b: Room) => a.manager.localeCompare(b.manager),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 220,
      render: (_: any, record: Room) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => onView(record)}
          >
            Xem
          </Button>
          <Button
            type="default"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title={
              record.capacity >= 30
                ? 'Không thể xóa phòng có từ 30 chỗ ngồi trở lên!'
                : 'Bạn có chắc chắn muốn xóa phòng học này?'
            }
            onConfirm={() => handleDeleteClick(record)}
            okText="Có"
            cancelText="Không"
            placement="topRight"
            disabled={record.capacity >= 30}
          >
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
              disabled={record.capacity >= 30}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={rooms.map((room) => ({ ...room, key: room.id }))}
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Tổng ${total} phòng`,
      }}
      bordered
      size="small"
    />
  );
};

export default RoomTable;
