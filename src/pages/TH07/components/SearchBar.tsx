import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './SearchBar.module.less';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Tìm kiếm bài viết...' 
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      onSearch(searchValue);
    }, 300);

    setTimeoutId(newTimeoutId);

    return () => {
      if (newTimeoutId) clearTimeout(newTimeoutId);
    };
  }, [searchValue, onSearch]);

  return (
    <div className={styles.searchBar}>
      <Input
        placeholder={placeholder}
        prefix={<SearchOutlined />}
        size="large"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        allowClear
      />
    </div>
  );
};

export default SearchBar;
