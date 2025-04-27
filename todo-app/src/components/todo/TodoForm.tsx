"use client"
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';
import { Plus, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import { todosState, tagsState } from '../../state/todo-atoms';
import TagSelector from './TagSelector';
import { AddTaskButton, Input, PriorityChipButton, TextArea} from '@todo-app/ui';

const TodoForm: React.FC = () => {
  const [todo, setTodo] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [description, setDescription] = useState('');  
  const [todos, setTodos] = useRecoilState(todosState);
  const availableTags = useRecoilValue(tagsState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (todo.trim()) {
      const newTodo = {
        id: uuidv4(),
        title: todo,
        completed: false,
        createdAt: new Date().toISOString(),
        priority,
        tags: selectedTags,
        dueDate: dueDate ? dueDate.toISOString() : null,
        description: description,
      };
      
      setTodos([newTodo, ...todos]);
      setTodo('');
      setDueDate(null);
      setPriority('medium');
      setSelectedTags([]);
      setIsExpanded(false);
      setDescription('');
    }
  };

  const priorityClasses = {
    low: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    medium: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    high: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 mb-6 overflow-hidden"
    >
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 mr-3 flex-shrink-0"
          >
            <Plus className="h-5 w-5" />
          </button>
          <Input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Add a new task..."
            className="w-full p-2 bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            onClick={() => !isExpanded && setIsExpanded(true)}
          />
        </div>
        
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700"
          >
            <div className="flex flex-wrap gap-3 mb-4">
              <TextArea
                id="todo-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description..."
              />

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setDueDate(dueDate ? null : new Date())}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <Calendar className="h-5 w-5" />
                </button>
                {dueDate && (
                  <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    dateFormat="MMM d, yyyy"
                    className="ml-2 p-1 text-sm rounded border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                )}
              </div>
              
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as const).map((p) => (
                  <PriorityChipButton
                    key={p}
                    id={p}
                    priority={priority}
                    onClick={(p) => setPriority(p)}
                  />  
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <TagSelector 
                selectedTags={selectedTags} 
                setSelectedTags={setSelectedTags}
                availableTags={availableTags}
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Cancel
              </button>
              <AddTaskButton
                type="submit"
              >
                Add Task
              </AddTaskButton>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default TodoForm;