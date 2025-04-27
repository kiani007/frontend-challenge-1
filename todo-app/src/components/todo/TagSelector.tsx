"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '../../state/todo-atoms';

interface TagSelectorProps {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  availableTags: Tag[];
}

const TagSelector: React.FC<TagSelectorProps> = ({ 
  selectedTags, 
  setSelectedTags, 
  availableTags 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTags.length > 0 ? (
          availableTags
            .filter((tag) => selectedTags.includes(tag.id))
            .map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 rounded-full text-xs flex items-center"
                style={{ 
                  backgroundColor: `${tag.color}20`, // 20% opacity
                  color: tag.color
                }}
              >
                {tag.name}
                <button
                  onClick={() => toggleTag(tag.id)}
                  className="ml-1 text-xs"
                >
                  ×
                </button>
              </span>
            ))
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-400">No tags selected</span>
        )}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
      >
        {isOpen ? 'Close' : 'Select Tags'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-1 w-full bg-white dark:bg-slate-700 shadow-lg rounded-md border border-gray-200 dark:border-slate-600 p-2 max-h-56 overflow-y-auto"
          >
            <div className="space-y-1">
              {availableTags.map((tag) => (
                <div
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-2 rounded-md cursor-pointer text-sm flex items-center ${
                    selectedTags.includes(tag.id)
                      ? 'bg-gray-100 dark:bg-slate-600'
                      : 'hover:bg-gray-50 dark:hover:bg-slate-600'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: tag.color }}
                  />
                  <span className="text-gray-800 dark:text-gray-200">{tag.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TagSelector;
