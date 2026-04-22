/**
 * Types and Interfaces for Blog Application
 */

/**
 * Post Status Enum
 */
export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

/**
 * Tag Interface
 */
export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
}

/**
 * Author Interface
 */
export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  skills: string[];
  socialLinks: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
  createdAt: string;
}

/**
 * Post Interface
 */
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  author: Author;
  tags: Tag[];
  status: PostStatus;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Dashboard Statistics
 */
export interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  totalTags: number;
}
