import { Topic } from '../types/Topic';

// In-memory storage simulation
let topics: { [key: string]: Topic[] } = {};

// Load topics from localStorage on init
const loadTopics = () => {
  const savedTopics = localStorage.getItem('tech-topics');
  if (savedTopics) {
    topics = JSON.parse(savedTopics);
  }
};

// Save topics to localStorage
const saveTopics = () => {
  localStorage.setItem('tech-topics', JSON.stringify(topics));
};

// Initialize topics
loadTopics();

export const getTopics = (techId: string): Topic[] => {
  return topics[techId] || [];
};

export const createTopic = (techId: string, topic: Omit<Topic, 'id'>): Topic => {
  const newTopic: Topic = {
    id: Date.now().toString(),
    ...topic,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likes: 0,
    dislikes: 0,
    userVote: null
  };

  if (!topics[techId]) {
    topics[techId] = [];
  }

  topics[techId] = [newTopic, ...topics[techId]];
  saveTopics();
  return newTopic;
};

export const updateTopic = (techId: string, topicId: string, updates: Partial<Topic>): Topic => {
  const topicIndex = topics[techId]?.findIndex(t => t.id === topicId);
  
  if (topicIndex === -1 || topicIndex === undefined) {
    throw new Error('Topic not found');
  }

  const updatedTopic = {
    ...topics[techId][topicIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  topics[techId][topicIndex] = updatedTopic;
  saveTopics();
  return updatedTopic;
};

export const deleteTopic = (techId: string, topicId: string): void => {
  if (!topics[techId]) return;
  
  topics[techId] = topics[techId].filter(t => t.id !== topicId);
  saveTopics();
};

export const voteTopic = (techId: string, topicId: string, voteType: 'like' | 'dislike' | null): Topic => {
  const topic = topics[techId]?.find(t => t.id === topicId);
  
  if (!topic) {
    throw new Error('Topic not found');
  }

  // Remove previous vote if exists
  if (topic.userVote === 'like') topic.likes--;
  if (topic.userVote === 'dislike') topic.dislikes--;

  // Add new vote if different from previous
  if (voteType && voteType !== topic.userVote) {
    if (voteType === 'like') topic.likes++;
    if (voteType === 'dislike') topic.dislikes++;
  }

  topic.userVote = voteType;
  topic.updatedAt = new Date().toISOString();

  saveTopics();
  return topic;
};