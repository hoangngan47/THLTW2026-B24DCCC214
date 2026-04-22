import { Post, Tag, Author, PostStatus, DashboardStats } from './types';

/**
 * Mock Author Data
 */
export const mockAuthor: Author = {
  id: 'author-1',
  name: 'Nguyễn Văn A',
  bio: 'Lập trình viên Full-stack với passion về React, TypeScript và các công nghệ web hiện đại. Yêu thích chia sẻ kiến thức qua blog.',
  avatar: 'https://via.placeholder.com/150?text=Author',
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
  socialLinks: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    email: 'author@example.com',
  },
  createdAt: '2024-01-01',
};

/**
 * Mock Tags Data
 */
export const mockTags: Tag[] = [
  {
    id: 'tag-1',
    name: 'React',
    slug: 'react',
    description: 'Bài viết về React',
    createdAt: '2024-01-01',
  },
  {
    id: 'tag-2',
    name: 'TypeScript',
    slug: 'typescript',
    description: 'Bài viết về TypeScript',
    createdAt: '2024-01-02',
  },
  {
    id: 'tag-3',
    name: 'Node.js',
    slug: 'nodejs',
    description: 'Bài viết về Node.js',
    createdAt: '2024-01-03',
  },
  {
    id: 'tag-4',
    name: 'Tutorial',
    slug: 'tutorial',
    description: 'Hướng dẫn chi tiết',
    createdAt: '2024-01-04',
  },
  {
    id: 'tag-5',
    name: 'Tips',
    slug: 'tips',
    description: 'Mẹo và thủ thuật',
    createdAt: '2024-01-05',
  },
  {
    id: 'tag-6',
    name: 'Career',
    slug: 'career',
    description: 'Sự nghiệp và phát triển',
    createdAt: '2024-01-06',
  },
];

/**
 * Mock Posts Data
 */
export const mockPosts: Post[] = [
  {
    id: 'post-1',
    title: 'Bắt đầu với React Hooks',
    slug: 'bat-dau-voi-react-hooks',
    content: `# Bắt đầu với React Hooks

React Hooks là một tính năng mạnh mẽ được giới thiệu trong React 16.8. Nó cho phép bạn sử dụng state và các tính năng React khác mà không cần viết class.

## Tại sao React Hooks?

- **Đơn giản hơn**: Hooks giúp logic dễ hiểu hơn
- **Tái sử dụng logic**: Chia sẻ logic giữa các component
- **Tối ưu hiệu suất**: Giảm kích thước bundle

## useState Hook

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

## useEffect Hook

\`\`\`jsx
import { useEffect, useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component mounted or count changed');
  }, [count]);

  return <div>{count}</div>;
}
\`\`\`

Hooks là cách tuyệt vời để viết React component hiệu quả hơn!`,
    excerpt: 'Tìm hiểu về React Hooks và cách sử dụng chúng một cách hiệu quả trong dự án của bạn.',
    image: 'https://via.placeholder.com/600x400?text=React+Hooks',
    author: mockAuthor,
    tags: [mockTags[0], mockTags[3]],
    status: PostStatus.PUBLISHED,
    viewCount: 145,
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15',
  },
  {
    id: 'post-2',
    title: 'TypeScript Tips & Tricks',
    slug: 'typescript-tips-tricks',
    content: `# TypeScript Tips & Tricks

TypeScript là một siêu tập hợp của JavaScript cung cấp type checking tĩnh.

## Generics

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
\`\`\`

## Union Types

\`\`\`typescript
function printId(id: number | string) {
  console.log(id);
}
\`\`\`

## Interfaces

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}
\`\`\`

Học TypeScript sẽ giúp code của bạn an toàn hơn!`,
    excerpt: 'Khám phá các mẹo TypeScript nâng cao để viết code tốt hơn.',
    image: 'https://via.placeholder.com/600x400?text=TypeScript',
    author: mockAuthor,
    tags: [mockTags[1], mockTags[4]],
    status: PostStatus.PUBLISHED,
    viewCount: 98,
    createdAt: '2024-02-10',
    updatedAt: '2024-02-10',
  },
  {
    id: 'post-3',
    title: 'Xây dựng API với Node.js',
    slug: 'xay-dung-api-voi-nodejs',
    content: `# Xây dựng API với Node.js

Node.js là một runtime JavaScript cho phía server.

## Express.js Basics

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(3000);
\`\`\`

## RESTful API

Các nguyên tắc cơ bản:
- GET: Lấy dữ liệu
- POST: Tạo dữ liệu
- PUT: Cập nhật dữ liệu
- DELETE: Xóa dữ liệu

## Database Connection

\`\`\`javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydb');
\`\`\`

Node.js là lựa chọn tuyệt vời cho backend!`,
    excerpt: 'Hướng dẫn chi tiết cách xây dựng API RESTful với Node.js và Express.',
    image: 'https://via.placeholder.com/600x400?text=NodeJS',
    author: mockAuthor,
    tags: [mockTags[2], mockTags[3]],
    status: PostStatus.PUBLISHED,
    viewCount: 167,
    createdAt: '2024-02-05',
    updatedAt: '2024-02-05',
  },
  {
    id: 'post-4',
    title: 'Clean Code Principles',
    slug: 'clean-code-principles',
    content: `# Clean Code Principles

Clean Code là nền tảng của phần mềm chất lượng cao.

## 1. Đặt tên có ý nghĩa

\`\`\`javascript
// Tên không rõ ràng
const d = 5;

//  Tên rõ ràng
const daysSinceCreation = 5;
\`\`\`

## 2. Hàm nhỏ và chuyên một việc

\`\`\`javascript
//  Hàm làm quá nhiều
function processUser() {
  // validate
  // save
  // email
}

// Các hàm nhỏ
function validateUser() {}
function saveUser() {}
function emailUser() {}
\`\`\`

## 3. DRY (Don't Repeat Yourself)

\`\`\`javascript
//  Lặp lại code
if (user.role === 'admin') { /* ... */ }
if (user.role === 'admin') { /* ... */ }

//  Tách ra hàm
function isAdmin(user) {
  return user.role === 'admin';
}
\`\`\`

Clean Code là đầu tư lâu dài!`,
    excerpt: 'Tìm hiểu các nguyên tắc viết code sạch và dễ bảo trì.',
    image: 'https://via.placeholder.com/600x400?text=Clean+Code',
    author: mockAuthor,
    tags: [mockTags[4], mockTags[5]],
    status: PostStatus.PUBLISHED,
    viewCount: 203,
    createdAt: '2024-01-28',
    updatedAt: '2024-01-28',
  },
  {
    id: 'post-5',
    title: 'Hành trình từ Junior đến Senior Developer',
    slug: 'hanh-trinh-tu-junior-den-senior',
    content: `# Hành trình từ Junior đến Senior Developer

Trở thành Senior Developer là một hành trình dài nhưng đáng giá.

## 1. Nền tảng vững chắc

Hiểu sâu về:
- Lập trình cơ bản
- Cấu trúc dữ liệu
- Thuật toán

## 2. Kinh nghiệm thực tế

- Làm dự án thực tế
- Học từ các developer khác
- Đọc code của người khác

## 3. Kỹ năng mềm

- Giao tiếp hiệu quả
- Làm việc nhóm
- Quản lý thời gian

## 4. Luôn học hỏi

- Theo dõi xu hướng mới
- Đọc sách và tài liệu
- Tham gia cộng đồng

Senior Developer không chỉ biết code, mà còn hiểu rõ về kinh doanh và người!`,
    excerpt: 'Chia sẻ kinh nghiệm phát triển sự nghiệp từ Junior đến Senior Developer.',
    image: 'https://via.placeholder.com/600x400?text=Career',
    author: mockAuthor,
    tags: [mockTags[5]],
    status: PostStatus.PUBLISHED,
    viewCount: 256,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
  },
  {
    id: 'post-6',
    title: 'Performance Optimization Tips',
    slug: 'performance-optimization-tips',
    content: `# Performance Optimization Tips

Hiệu suất ứng dụng là yếu tố quan trọng.

## 1. Code Splitting

\`\`\`javascript
const LazyComponent = React.lazy(() => import('./LazyComponent'));
\`\`\`

## 2. Memoization

\`\`\`javascript
const MemoComponent = React.memo(function Component(props) {
  return <div>{props.data}</div>;
});
\`\`\`

## 3. useCallback Hook

\`\`\`javascript
const handleClick = useCallback(() => {
  // handle click
}, []);
\`\`\`

Tối ưu hiệu suất từ sớm!`,
    excerpt: 'Các kỹ thuật tối ưu hiệu suất ứng dụng React.',
    image: 'https://via.placeholder.com/600x400?text=Performance',
    author: mockAuthor,
    tags: [mockTags[0], mockTags[4]],
    status: PostStatus.PUBLISHED,
    viewCount: 134,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: 'post-7',
    title: 'Draft: Upcoming Features',
    slug: 'draft-upcoming-features',
    content: `# Draft: Upcoming Features

Đây là bài viết nháp...`,
    excerpt: 'Nháp bài viết về các tính năng sắp tới.',
    image: 'https://via.placeholder.com/600x400?text=Draft',
    author: mockAuthor,
    tags: [mockTags[0]],
    status: PostStatus.DRAFT,
    viewCount: 0,
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20',
  },
  {
    id: 'post-8',
    title: 'Draft: Advanced Patterns',
    slug: 'draft-advanced-patterns',
    content: `# Draft: Advanced Patterns

Nháp bài viết về các pattern nâng cao...`,
    excerpt: 'Nháp bài viết về advanced design patterns.',
    image: 'https://via.placeholder.com/600x400?text=Patterns',
    author: mockAuthor,
    tags: [mockTags[1]],
    status: PostStatus.DRAFT,
    viewCount: 0,
    createdAt: '2024-02-18',
    updatedAt: '2024-02-18',
  },
];

/**
 * Posts Service
 */
class PostsService {
  private posts: Post[] = JSON.parse(JSON.stringify(mockPosts));

  getAllPosts(): Post[] {
    return this.posts;
  }

  getPublishedPosts(): Post[] {
    return this.posts.filter((post) => post.status === PostStatus.PUBLISHED);
  }

  getPostById(id: string): Post | undefined {
    const post = this.posts.find((p) => p.id === id);
    if (post) {
      post.viewCount++;
    }
    return post;
  }

  getPostBySlug(slug: string): Post | undefined {
    const post = this.posts.find((p) => p.slug === slug);
    if (post) {
      post.viewCount++;
    }
    return post;
  }

  searchPosts(keyword: string): Post[] {
    const lowerKeyword = keyword.toLowerCase();
    return this.getPublishedPosts().filter(
      (post) =>
        post.title.toLowerCase().includes(lowerKeyword) ||
        post.excerpt.toLowerCase().includes(lowerKeyword) ||
        post.content.toLowerCase().includes(lowerKeyword)
    );
  }

  getPostsByTag(tagId: string): Post[] {
    return this.getPublishedPosts().filter((post) =>
      post.tags.some((tag) => tag.id === tagId)
    );
  }

  getRelatedPosts(postId: string, limit: number = 3): Post[] {
    const post = this.posts.find((p) => p.id === postId);
    if (!post) return [];

    const tagIds = post.tags.map((t) => t.id);
    return this.getPublishedPosts()
      .filter(
        (p) =>
          p.id !== postId && p.tags.some((tag) => tagIds.includes(tag.id))
      )
      .slice(0, limit);
  }

  createPost(post: Omit<Post, 'id' | 'viewCount' | 'createdAt' | 'updatedAt'>): Post {
    const newPost: Post = {
      ...post,
      id: `post-${Date.now()}`,
      viewCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    this.posts.push(newPost);
    return newPost;
  }

  updatePost(id: string, updates: Partial<Post>): Post | undefined {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.posts[index] = {
        ...this.posts[index],
        ...updates,
        updatedAt: new Date().toISOString().split('T')[0],
      };
      return this.posts[index];
    }
    return undefined;
  }

  deletePost(id: string): boolean {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.posts.splice(index, 1);
      return true;
    }
    return false;
  }
}

/**
 * Tags Service
 */
class TagsService {
  private tags: Tag[] = JSON.parse(JSON.stringify(mockTags));

  getAllTags(): Tag[] {
    return this.tags;
  }

  getTagById(id: string): Tag | undefined {
    return this.tags.find((t) => t.id === id);
  }

  getTagBySlug(slug: string): Tag | undefined {
    return this.tags.find((t) => t.slug === slug);
  }

  getTagsWithPostCount(): Array<Tag & { postCount: number }> {
    const postsService = new PostsService();
    return this.tags.map((tag) => ({
      ...tag,
      postCount: postsService.getPostsByTag(tag.id).length,
    }));
  }

  createTag(tag: Omit<Tag, 'id' | 'createdAt'>): Tag {
    const newTag: Tag = {
      ...tag,
      id: `tag-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.tags.push(newTag);
    return newTag;
  }

  updateTag(id: string, updates: Partial<Tag>): Tag | undefined {
    const index = this.tags.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.tags[index] = {
        ...this.tags[index],
        ...updates,
      };
      return this.tags[index];
    }
    return undefined;
  }

  deleteTag(id: string): boolean {
    const index = this.tags.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.tags.splice(index, 1);
      return true;
    }
    return false;
  }
}

/**
 * Dashboard Service
 */
class DashboardService {
  getStats(): DashboardStats {
    const postsService = new PostsService();
    const tagsService = new TagsService();
    const allPosts = postsService.getAllPosts();

    return {
      totalPosts: allPosts.length,
      publishedPosts: allPosts.filter((p) => p.status === PostStatus.PUBLISHED)
        .length,
      draftPosts: allPosts.filter((p) => p.status === PostStatus.DRAFT).length,
      totalViews: allPosts.reduce((sum, p) => sum + p.viewCount, 0),
      totalTags: tagsService.getAllTags().length,
    };
  }
}

/**
 * Export Services
 */
export const postsService = new PostsService();
export const tagsService = new TagsService();
export const dashboardService = new DashboardService();
