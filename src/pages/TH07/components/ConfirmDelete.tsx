import React from 'react';
import { Popconfirm, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface ConfirmDeleteProps {
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  loading?: boolean;
  children?: React.ReactNode;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  title = 'Xác nhận xóa',
  description = 'Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác.',
  onConfirm,
  onCancel,
  loading = false,
  children,
}) => {
  return (
    <Popconfirm
      title={title}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ loading }}
    >
      {children || (
        <Button type="primary" icon={<DeleteOutlined />} style={{ backgroundColor: '#1890ff' }}>
          Xóa
        </Button>
      )}
    </Popconfirm>
  );
};

export default ConfirmDelete;
