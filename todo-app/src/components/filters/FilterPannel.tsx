"use client"
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';
import { filterState, tagsState } from '../../state/todo-atoms';

const FilterPanel: React.FC = () => {
  const [filter, setFilter] = useRecoilState(filterState);
  const tags = useRecoilValue(tagsState);

  const handleStatusChange = (status: 'all' | 'active' | 'completed') => {
      setFilter({ ...filter, status });
    };

  const handlePriorityChange = (priority: 'all' | 'low' | 'medium' | 'high') => {
    setFilter({ ...filter, priority });
  };

  const toggleTagFilter = (tagId: string) => {
    const newTags = filter.tags.includes(tagId)
      ? filter.tags.filter(id => id !== tagId)
      : [...filter.tags, tagId];
    
    setFilter({ ...filter, tags: newTags });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 p-4"
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Status</h3>
          <div className="flex items-center gap-2">
            {['all', 'active', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status as 'all' | 'active' | 'completed')}
                className={`px-3 py-1 text-xs rounded-full capitalize ${
                  filter.status === status
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Priority</h3>
          <div className="flex items-center gap-2">
            {['all', 'low', 'medium', 'high'].map((priority) => (
              <button
                key={priority}
                onClick={() => handlePriorityChange(priority as 'all' | 'low' | 'medium' | 'high')}
                className={`px-3 py-1 text-xs rounded-full capitalize ${
                  filter.priority === priority
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTagFilter(tag.id)}
                className={`px-2 py-1 text-xs rounded-full ${
                  filter.tags.includes(tag.id)
                    ? `text-white`
                    : `text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600`
                }`}
                style={filter.tags.includes(tag.id) ? { backgroundColor: tag.color } : {}}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterPanel;