"use client"
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import Header from './Header';
import TodoForm from '../todo/TodoForm';
import TodoList from '../todo/TodoList';
import FilterPanel from '../filters/FilterPannel';
import SearchBar from '../filters/SearchBar';
import EditModal from '../todo/EditModal';
import { 
  todosState, 
  tagsState, 
  filterState, 
  searchState,
  isEditModalOpenState,
  editingTodoState 
} from '../../state/todo-atoms';

const TodoLayout: React.FC = () => {
  // Initialize all required Recoil states
  const [todos, setTodos] = useRecoilState(todosState);
  const [tags, setTags] = useRecoilState(tagsState);
  const [filter, setFilter] = useRecoilState(filterState);
  const [search, setSearch] = useRecoilState(searchState);
  const [isEditModalOpen, setIsEditModalOpen] = useRecoilState(isEditModalOpenState);
  const [editingTodo, setEditingTodo] = useRecoilState(editingTodoState);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col h-full"
    >
      <Header />
      
      {/* Improved search and filter layout */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-2">
        <div className="w-full sm:w-2/3">
          <SearchBar />
        </div>
        <div className="w-full sm:w-1/3">
          <FilterPanel />
        </div>
      </div>
      
      {/* Todo form with improved spacing */}
      <div className="mb-6">
        <TodoForm />
      </div>
      
      {/* Todo list */}
      <div className="flex-grow h-full overflow-y-auto">
        <TodoList />
      </div>
      
      {/* EditModal will show when a todo is being edited */}
      {isEditModalOpen && editingTodo && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          todoId={editingTodo.id}
        />
      )}
    </motion.div>
  );
};

export default TodoLayout;
