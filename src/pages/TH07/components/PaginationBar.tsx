import React from 'react';
import { Pagination } from 'antd';
import styles from './PaginationBar.module.less';

interface PaginationBarProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  current,
  total,
  pageSize,
  onChange,
}) => {
  return (
    <div className={styles.pagination}>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger={false}
        showQuickJumper
        showTotal={(total) => `Tổng ${total} bài viết`}
      />
    </div>
  );
};

export default PaginationBar;
