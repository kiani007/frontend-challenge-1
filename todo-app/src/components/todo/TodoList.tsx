"use client"
import React from 'react';
import { useRecoilValue } from 'recoil';
import { motion, AnimatePresence } from 'framer-motion';
import { filteredTodosState } from '../../state/selector';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const filteredTodos = useRecoilValue(filteredTodosState);

  if (filteredTodos.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <p className="text-gray-500 dark:text-gray-400">No tasks found. Add a new task to get started!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className="space-y-3"
    >
      <AnimatePresence>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoList;