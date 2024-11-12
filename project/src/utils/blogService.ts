import { toast } from 'react-hot-toast';
import { readJsonFile, writeJsonFile } from './fileService';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: number;
  author: {
    name: string;
    avatar: string;
  };
}

interface BlogData {
  posts: BlogPost[];
}

export const categories = [
  'Web Development',
  'Cloud Computing',
  'Artificial Intelligence',
  'Architecture',
  'DevOps',
  'Security'
];

export const getAllPosts = (): BlogPost[] => {
  try {
    const data = readJsonFile<BlogData>('blog-posts.json');
    return data.posts || [];
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
};

export const getRecentPosts = (count: number = 5): BlogPost[] => {
  try {
    const posts = getAllPosts();
    return [...posts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  } catch (error) {
    console.error('Error getting recent posts:', error);
    return [];
  }
};

export const createPost = async (post: Omit<BlogPost, 'id' | 'date' | 'author'>): Promise<void> => {
  try {
    const data = readJsonFile<BlogData>('blog-posts.json');
    const newPost: BlogPost = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      author: {
        name: 'Ramesh Mavuluri',
        avatar: 'https://avatars.githubusercontent.com/u/6380291'
      },
      ...post
    };

    data.posts = [newPost, ...(data.posts || [])];
    writeJsonFile('blog-posts.json', data);
    toast.success('Post created successfully!');
  } catch (error) {
    console.error('Error creating post:', error);
    toast.error('Failed to create post');
    throw error;
  }
};

export const updatePost = async (updatedPost: BlogPost): Promise<void> => {
  try {
    const data = readJsonFile<BlogData>('blog-posts.json');
    const index = data.posts.findIndex(p => p.id === updatedPost.id);
    
    if (index === -1) {
      throw new Error('Post not found');
    }

    data.posts[index] = updatedPost;
    writeJsonFile('blog-posts.json', data);
    toast.success('Post updated successfully!');
  } catch (error) {
    console.error('Error updating post:', error);
    toast.error('Failed to update post');
    throw error;
  }
};

export const deletePost = async (postId: string): Promise<void> => {
  try {
    const data = readJsonFile<BlogData>('blog-posts.json');
    data.posts = data.posts.filter(p => p.id !== postId);
    writeJsonFile('blog-posts.json', data);
    toast.success('Post deleted successfully!');
  } catch (error) {
    console.error('Error deleting post:', error);
    toast.error('Failed to delete post');
    throw error;
  }
};

// Initialize with default posts if none exist
const initializeDefaultPosts = () => {
  try {
    const data = readJsonFile<BlogData>('blog-posts.json');
    if (!data.posts || data.posts.length === 0) {
      const defaultPosts: BlogPost[] = [
        {
          id: '1',
          title: 'The Future of Web Development: What to Expect in 2024',
          excerpt: 'Explore the upcoming trends and technologies that will shape web development in the coming year.',
          content: `# The Future of Web Development: What to Expect in 2024

## Introduction

As we move further into 2024, the web development landscape continues to evolve at a rapid pace. New technologies, frameworks, and methodologies are emerging, reshaping how we build and deploy web applications.

## Key Trends

### 1. WebAssembly Goes Mainstream

WebAssembly (Wasm) is gaining significant traction, enabling high-performance code execution in browsers. This technology allows developers to write code in languages like Rust and C++ and run it alongside JavaScript.

### 2. AI-Driven Development

Artificial Intelligence is becoming an integral part of web development, from code completion to automated testing and optimization.

### 3. Edge Computing

The rise of edge computing is changing how we think about application architecture and deployment.

## Conclusion

The future of web development is exciting and full of possibilities. Stay tuned for more updates!`,
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069',
          category: 'Web Development',
          date: 'Mar 15, 2024',
          readTime: 5,
          author: {
            name: 'Ramesh Mavuluri',
            avatar: 'https://avatars.githubusercontent.com/u/6380291'
          }
        },
        {
          id: '2',
          title: 'Mastering Cloud Architecture: Best Practices',
          excerpt: 'Learn the essential principles and best practices for building scalable cloud architectures.',
          content: `# Mastering Cloud Architecture: Best Practices

## Introduction

Cloud architecture has become fundamental to modern software development. This post explores best practices for building robust and scalable cloud solutions.

## Key Principles

### 1. Security First

Always design with security in mind, implementing proper authentication and authorization mechanisms.

### 2. Scalability

Design systems that can scale horizontally to handle increased load.

### 3. Cost Optimization

Implement cost-effective solutions while maintaining performance.

## Conclusion

Following these best practices will help you build better cloud architectures.`,
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072',
          category: 'Cloud Computing',
          date: 'Mar 12, 2024',
          readTime: 7,
          author: {
            name: 'Ramesh Mavuluri',
            avatar: 'https://avatars.githubusercontent.com/u/6380291'
          }
        }
      ];

      writeJsonFile('blog-posts.json', { posts: defaultPosts });
    }
  } catch (error) {
    console.error('Error initializing default posts:', error);
  }
};

// Initialize default posts
initializeDefaultPosts();