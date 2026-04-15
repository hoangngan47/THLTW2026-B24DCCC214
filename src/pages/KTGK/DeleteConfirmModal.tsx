import React from 'react';
import { Modal, ModalProps } from 'antd';
import { Room } from './types';

interface DeleteConfirmModalProps extends Omit<ModalProps, 'onOk'> {
  room?: Room;
  onOk?: (room: Room) => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  room,
  onOk,
  ...props
}) => {
  const canDelete = room && room.capacity < 30;

  const handleOk = () => {
    if (room && canDelete && onOk) {
      onOk(room);
    }
  };

  return (
    <Modal
      title="Xóa phòng học"
      okText="Có"
      cancelText="Không"
      okButtonProps={{
        danger: true,
        disabled: !canDelete,
      }}
      {...props}
      onOk={handleOk}
    >
      {!canDelete ? (
        <p style={{ color: '#ff4d4f', fontWeight: 500 }}>
         Không thể xóa phòng học này vì có từ 30 chỗ ngồi trở lên!
        </p>
      ) : (
        <p>
          Bạn có chắc chắn muốn xóa phòng học <strong>{room?.roomCode}</strong> ({room?.roomName})?
        </p>
      )}
    </Modal>
  );
};

export default DeleteConfirmModal;
