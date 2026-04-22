import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './Loading.module.less';

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  text = 'Đang tải...', 
  fullScreen = false 
}) => {
  return (
    <div className={fullScreen ? styles.fullScreen : styles.container}>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 48 }} />}
        tip={text}
      />
    </div>
  );
};

export default Loading;
