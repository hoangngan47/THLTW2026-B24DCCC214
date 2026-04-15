import React from 'react';
import { Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { Room, RoomType, RoomFormData } from './types';
import { managersList } from './data';

interface RoomFormProps {
  visible: boolean;
  mode: 'create' | 'edit';
  room?: Room | null;
  onOk: (data: RoomFormData) => void;
  onCancel: () => void;
  loading?: boolean;
  existingRooms: Room[];
}

const RoomForm: React.FC<RoomFormProps> = ({
  visible,
  mode,
  room,
  onOk,
  onCancel,
  loading = false,
  existingRooms,
}) => {
  const [form] = Form.useForm<RoomFormData>();

  React.useEffect(() => {
    if (visible) {
      if (mode === 'create') {
        form.resetFields();
      } else if (room) {
        form.setFieldsValue({
          roomCode: room.roomCode,
          roomName: room.roomName,
          capacity: room.capacity,
          roomType: room.roomType,
          manager: room.manager,
        });
      }
    }
  }, [visible, mode, room, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Check for duplicate room code (excluding current room if editing)
      const isDuplicateCode = existingRooms.some(
        (r) => r.roomCode === values.roomCode && r.id !== room?.id,
      );
      if (isDuplicateCode) {
        message.error('Mã phòng đã tồn tại!');
        return;
      }

      // Check for duplicate room name (excluding current room if editing)
      const isDuplicateName = existingRooms.some(
        (r) => r.roomName === values.roomName && r.id !== room?.id,
      );
      if (isDuplicateName) {
        message.error('Tên phòng đã tồn tại!');
        return;
      }

      onOk(values);
      form.resetFields();
    } catch (error) {
      message.error('Vui lòng điền đầy đủ thông tin hợp lệ!');
    }
  };

  return (
    <Modal
      title={mode === 'create' ? 'Thêm phòng học' : 'Chỉnh sửa phòng học'}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
      okText="Lưu"
      cancelText="Hủy"
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="roomCode"
          label="Mã phòng"
          rules={[
            { required: true, message: 'Vui lòng nhập mã phòng!' },
            {
              max: 10,
              message: 'Mã phòng tối đa 10 ký tự!',
            },
            {
              pattern: /^[A-Z0-9]+$/,
              message: 'Mã phòng chỉ được chứa chữ cái in hoa và số!',
            },
          ]}
        >
          <Input placeholder="Ví dụ: A101" />
        </Form.Item>

        <Form.Item
          name="roomName"
          label="Tên phòng"
          rules={[
            { required: true, message: 'Vui lòng nhập tên phòng!' },
            {
              max: 50,
              message: 'Tên phòng tối đa 50 ký tự!',
            },
          ]}
        >
          <Input placeholder="Ví dụ: Phòng tin học 1" />
        </Form.Item>

        <Form.Item
          name="capacity"
          label="Số chỗ ngồi"
          rules={[
            { required: true, message: 'Vui lòng nhập số chỗ ngồi!' },
            {
              type: 'number',
              min: 10,
              message: 'Số chỗ ngồi tối thiểu 10!',
            },
            {
              type: 'number',
              max: 200,
              message: 'Số chỗ ngồi tối đa 200!',
            },
          ]}
        >
          <InputNumber placeholder="10 - 200" min={10} max={200} />
        </Form.Item>

        <Form.Item
          name="roomType"
          label="Loại phòng"
          rules={[{ required: true, message: 'Vui lòng chọn loại phòng!' }]}
        >
          <Select placeholder="Chọn loại phòng">
            <Select.Option value={RoomType.THEORY}>
              {RoomType.THEORY}
            </Select.Option>
            <Select.Option value={RoomType.PRACTICAL}>
              {RoomType.PRACTICAL}
            </Select.Option>
            <Select.Option value={RoomType.AUDITORIUM}>
              {RoomType.AUDITORIUM}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="manager"
          label="Người phụ trách"
          rules={[{ required: true, message: 'Vui lòng chọn người phụ trách!' }]}
        >
          <Select placeholder="Chọn người phụ trách">
            {managersList.map((manager) => (
              <Select.Option key={manager} value={manager}>
                {manager}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoomForm;
