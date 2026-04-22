import React from 'react';
import { Tag, Space, Button } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import { Tag as TagType } from '../types';
import styles from './TagFilter.module.less';

interface TagFilterProps {
  tags: TagType[];
  selectedTagId: string | null;
  onSelectTag: (tagId: string | null) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ 
  tags, 
  selectedTagId, 
  onSelectTag 
}) => {
  return (
    <div className={styles.tagFilter}>
      <h4 className={styles.title}>
        <TagOutlined /> Lọc theo thẻ
      </h4>
      <Space wrap>
        <Button
          type={selectedTagId === null ? 'primary' : 'default'}
          onClick={() => onSelectTag(null)}
          style={selectedTagId === null ? { backgroundColor: '#1890ff' } : {}}
        >
          Tất cả
        </Button>
        {tags.map((tag) => (
          <Button
            key={tag.id}
            type={selectedTagId === tag.id ? 'primary' : 'default'}
            onClick={() => onSelectTag(tag.id)}
            style={
              selectedTagId === tag.id ? { backgroundColor: '#1890ff' } : {}
            }
          >
            <Tag
              color={selectedTagId === tag.id ? 'blue' : 'default'}
              style={{ marginRight: 0 }}
            >
              {tag.name}
            </Tag>
          </Button>
        ))}
      </Space>
    </div>
  );
};

export default TagFilter;
