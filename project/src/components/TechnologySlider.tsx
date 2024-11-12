import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Plus, Trash2, ThumbsUp, ThumbsDown, Edit } from 'lucide-react';
import { technologies } from '../utils/techData';
import { Topic } from '../types/Topic';
import * as topicService from '../utils/topicService';
import { toast } from 'react-hot-toast';

interface TechnologySliderProps {
  techId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface TopicFormData {
  title: string;
  content: string;
}

export default function TechnologySlider({ techId, isOpen, onClose }: TechnologySliderProps) {
  const tech = technologies.find(t => t.id === techId);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isAddingTopic, setIsAddingTopic] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [formData, setFormData] = useState<TopicFormData>({ title: '', content: '' });

  useEffect(() => {
    if (techId) {
      loadTopics();
    }
  }, [techId]);

  const loadTopics = () => {
    const loadedTopics = topicService.getTopics(techId);
    setTopics(loadedTopics);
  };

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      if (editingTopic) {
        const updatedTopic = topicService.updateTopic(techId, editingTopic.id, formData);
        setTopics(prev => prev.map(t => t.id === updatedTopic.id ? updatedTopic : t));
        toast.success('Topic updated successfully');
      } else {
        const newTopic = topicService.createTopic(techId, formData);
        setTopics(prev => [newTopic, ...prev]);
        toast.success('Topic created successfully');
      }
      
      setFormData({ title: '', content: '' });
      setIsAddingTopic(false);
      setEditingTopic(null);
    } catch (error) {
      toast.error('Failed to save topic');
    }
  };

  const handleEdit = (topic: Topic) => {
    setEditingTopic(topic);
    setFormData({ title: topic.title, content: topic.content });
    setIsAddingTopic(true);
  };

  const handleDelete = (topicId: string) => {
    try {
      topicService.deleteTopic(techId, topicId);
      setTopics(prev => prev.filter(t => t.id !== topicId));
      toast.success('Topic deleted successfully');
    } catch (error) {
      toast.error('Failed to delete topic');
    }
  };

  const handleVote = (topicId: string, voteType: 'like' | 'dislike') => {
    try {
      const topic = topics.find(t => t.id === topicId);
      if (!topic) return;

      const newVoteType = topic.userVote === voteType ? null : voteType;
      const updatedTopic = topicService.voteTopic(techId, topicId, newVoteType);
      setTopics(prev => prev.map(t => t.id === updatedTopic.id ? updatedTopic : t));
    } catch (error) {
      toast.error('Failed to update vote');
    }
  };

  if (!tech) return null;

  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: isOpen ? 0 : '-100%' }}
      transition={{ type: 'spring', damping: 30 }}
      className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black text-white z-50 overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-playfair">{tech.title}</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-12">
          {/* Overview */}
          <section className="bg-white/5 rounded-2xl p-8">
            <h2 className="text-2xl font-playfair mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed">{tech.fullContent.overview}</p>
          </section>

          {/* Features */}
          <section className="bg-white/5 rounded-2xl p-8">
            <h2 className="text-2xl font-playfair mb-4">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tech.fullContent.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full ${tech.color.split(' ')[0].replace('from-', 'bg-')} mt-2`} />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Custom Topics */}
          <section className="bg-white/5 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-playfair">Community Topics</h2>
              <button
                onClick={() => {
                  setIsAddingTopic(true);
                  setEditingTopic(null);
                  setFormData({ title: '', content: '' });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Topic
              </button>
            </div>

            {isAddingTopic && (
              <div className="mb-6 bg-black/30 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl mb-4">
                  {editingTopic ? 'Edit Topic' : 'Add New Topic'}
                </h3>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Topic Title"
                  className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent text-white mb-4"
                />
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Topic Content"
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-transparent text-white mb-4"
                  rows={4}
                />
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setIsAddingTopic(false);
                      setEditingTopic(null);
                      setFormData({ title: '', content: '' });
                    }}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {editingTopic ? 'Update Topic' : 'Save Topic'}
                  </button>
                </div>
              </div>
            )}

            {topics.length > 0 ? (
              <div className="space-y-6">
                {topics.map((topic) => (
                  <div key={topic.id} className="group bg-black/30 rounded-lg p-6 border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-medium text-white">{topic.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Last updated: {new Date(topic.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleVote(topic.id, 'like')}
                            className={`p-2 rounded-lg transition-colors ${
                              topic.userVote === 'like' ? 'bg-green-500/20 text-green-400' : 'hover:bg-white/10'
                            }`}
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <span className="text-sm text-gray-400">{topic.likes}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleVote(topic.id, 'dislike')}
                            className={`p-2 rounded-lg transition-colors ${
                              topic.userVote === 'dislike' ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/10'
                            }`}
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                          <span className="text-sm text-gray-400">{topic.dislikes}</span>
                        </div>
                        <button
                          onClick={() => handleEdit(topic)}
                          className="p-2 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-sky-400/10 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(topic.id)}
                          className="p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-400/10 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-300 whitespace-pre-wrap">{topic.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No community topics yet. Be the first to contribute!</p>
            )}
          </section>
        </div>
      </div>
    </motion.div>
  );
}