"use client"
import React from 'react';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { searchState } from '../../state/todo-atoms';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useRecoilState(searchState);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative"
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        className="block w-full pl-10 pr-10 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      {searchQuery && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </motion.div>
  );
};

export default SearchBar;