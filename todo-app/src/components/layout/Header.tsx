"use client"
import React from 'react';
import { useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { filteredTodosState } from '../../state/selector';

const Header: React.FC = () => {
  const filteredTodos = useRecoilValue(filteredTodosState);
  const completedCount = filteredTodos?.filter(todo => todo.completed).length;
  const totalCount = filteredTodos?.length;

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CheckCircle className="w-8 h-8 text-purple-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Tasks</h1>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-300">
          <span className="font-medium text-purple-500">{completedCount}</span>
          <span> / {totalCount} completed</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;