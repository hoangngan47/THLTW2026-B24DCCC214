import React, { useState } from 'react';
import { Card, Button, Space, message, Drawer, Divider, Descriptions, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import RoomTable from './RoomTable';
import RoomForm from './RoomForm';
import RoomFilter from './RoomFilter';
import { Room, RoomFormData, FilterOptions, RoomType } from './types';
import { mockRooms } from './data';

const RoomManagement: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(mockRooms);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerRoom, setDrawerRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    setModalMode('create');
    setSelectedRoom(null);
    setIsModalVisible(true);
  };

  const handleEdit = (room: Room) => {
    setModalMode('edit');
    setSelectedRoom(room);
    setIsModalVisible(true);
  };

  const handleView = (room: Room) => {
    setDrawerRoom(room);
    setIsDrawerVisible(true);
  };

  const handleDelete = (room: Room) => {
    setRooms(rooms.filter((r) => r.id !== room.id));
    setFilteredRooms(filteredRooms.filter((r) => r.id !== room.id));
    message.success('Xóa phòng học thành công!');
  };

  const handleFormOk = async (data: RoomFormData) => {
    try {
      setLoading(true);

      setTimeout(() => {
        if (modalMode === 'create') {
          const newRoom: Room = {
            id: Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString().split('T')[0],
          };
          setRooms([...rooms, newRoom]);
          setFilteredRooms([...filteredRooms, newRoom]);
          message.success('Thêm phòng học thành công!');
        } else if (selectedRoom) {
          const updatedRooms = rooms.map((room) =>
            room.id === selectedRoom.id
              ? {
                  ...selectedRoom,
                  ...data,
                  updatedAt: new Date().toISOString().split('T')[0],
                }
              : room,
          );
          setRooms(updatedRooms);
          setFilteredRooms(
            filteredRooms.map((room) =>
              room.id === selectedRoom.id
                ? {
                    ...selectedRoom,
                    ...data,
                    updatedAt: new Date().toISOString().split('T')[0],
                  }
                : room,
            ),
          );
          message.success('Cập nhật phòng học thành công!');
        }

        setLoading(false);
        setIsModalVisible(false);
        setSelectedRoom(null);
      }, 500);
    } catch (error) {
      message.error('Có lỗi xảy ra!');
      setLoading(false);
    }
  };

  const handleFilter = (filters: FilterOptions) => {
    let filtered = rooms;

    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      filtered = filtered.filter(
        (room) =>
          room.roomCode.toLowerCase().includes(searchLower) ||
          room.roomName.toLowerCase().includes(searchLower),
      );
    }

    if (filters.roomType) {
      filtered = filtered.filter((room) => room.roomType === filters.roomType);
    }

    if (filters.manager) {
      filtered = filtered.filter((room) => room.manager === filters.manager);
    }

    setFilteredRooms(filtered);
  };

  const handleReset = () => {
    setFilteredRooms(rooms);
  };

  const getRoomTypeColor = (type: RoomType) => {
    const colors: { [key in RoomType]: string } = {
      [RoomType.THEORY]: 'blue',
      [RoomType.PRACTICAL]: 'green',
      [RoomType.AUDITORIUM]: 'purple',
    };
    return colors[type];
  };

  return (
    <div style={{ padding: '16px' }}>
      <Card
        title="Quản lý phòng học"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Thêm phòng học
          </Button>
        }
        bodyStyle={{ padding: '0' }}
      >
        <div style={{ padding: '16px' }}>
          <RoomFilter onFilter={handleFilter} onReset={handleReset} />

          <RoomTable
            rooms={filteredRooms}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </div>
      </Card>

      <RoomForm
        visible={isModalVisible}
        mode={modalMode}
        room={selectedRoom}
        onOk={handleFormOk}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedRoom(null);
        }}
        loading={loading}
        existingRooms={rooms}
      />

      <Drawer
        title={`Chi tiết phòng học: ${drawerRoom?.roomCode}`}
        placement="right"
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
        width={400}
      >
        {drawerRoom && (
          <div>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Mã phòng">
                <strong>{drawerRoom.roomCode}</strong>
              </Descriptions.Item>
              <Descriptions.Item label="Tên phòng">
                {drawerRoom.roomName}
              </Descriptions.Item>
              <Descriptions.Item label="Số chỗ ngồi">
                <strong>{drawerRoom.capacity}</strong>
              </Descriptions.Item>
              <Descriptions.Item label="Loại phòng">
                <Tag color={getRoomTypeColor(drawerRoom.roomType)}>
                  {drawerRoom.roomType}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Người phụ trách">
                {drawerRoom.manager}
              </Descriptions.Item>
              {drawerRoom.createdAt && (
                <Descriptions.Item label="Ngày tạo">
                  {drawerRoom.createdAt}
                </Descriptions.Item>
              )}
              {drawerRoom.updatedAt && (
                <Descriptions.Item label="Ngày cập nhật">
                  {drawerRoom.updatedAt}
                </Descriptions.Item>
              )}
            </Descriptions>

            <Divider />

            <div style={{ textAlign: 'center' }}>
              <Space>
                <Button type="primary" onClick={() => {
                  handleEdit(drawerRoom);
                  setIsDrawerVisible(false);
                }}>
                  Chỉnh sửa
                </Button>
                <Button
                  type="primary"
                  danger
                  disabled={drawerRoom.capacity >= 30}
                  onClick={() => {
                    handleDelete(drawerRoom);
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

export default RoomManagement;
