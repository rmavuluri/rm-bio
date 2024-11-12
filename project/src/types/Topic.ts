export interface Topic {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  userVote: 'like' | 'dislike' | null;
}