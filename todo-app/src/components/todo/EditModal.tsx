"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';
import { X, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { todosState, tagsState, Todo } from '../../state/todo-atoms';
import TagSelector from './TagSelector';
import { SaveButton, CancelButton, TextArea, Checkbox, PriorityChipButton } from '@todo-app/ui';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  todoId: string;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, todoId }) => {
  const [todos, setTodos] = useRecoilState(todosState);
  const availableTags = useRecoilValue(tagsState);
  
  const todo = todos.find(t => t.id === todoId);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  // Initialize form with todo data
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setDueDate(todo.dueDate ? new Date(todo.dueDate) : null);
      setPriority(todo.priority);
      setSelectedTags(todo.tags);
      setCompleted(todo.completed);
    }
  }, [todo]);

  const handleSave = () => {
    if (!todo) return;
    
    const updatedTodo: Todo = {
      ...todo,
      title,
      description,
      dueDate: dueDate ? dueDate.toISOString() : null,
      priority,
      tags: selectedTags,
      completed
    };
    
    const updatedTodos = todos.map(t => 
      t.id === todoId ? updatedTodo : t
    );
    
    setTodos(updatedTodos);
    onClose();
  };

  const priorityClasses = {
    low: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
    medium: 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300',
    high: 'bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-300',
  };

  if (!todo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Task</h2>
                <CancelButton
                  onClick={onClose}
                  // className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </CancelButton>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <TextArea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <div className="flex items-center">
                    <Checkbox
                      id="completed"
                      checked={completed}
                      onChange={(e) => setCompleted(e.target.checked)}
                     
                    />
                    <label htmlFor="completed" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Completed
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Due Date
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setDueDate(dueDate ? null : new Date())}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border border-gray-300 dark:border-slate-600 rounded-md mr-2"
                    >
                      <Calendar className="h-5 w-5" />
                    </button>
                    {dueDate ? (
                      <DatePicker
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="MMM d, yyyy"
                        className="p-2 text-sm rounded border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                      />
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">No due date</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <div className="flex gap-2">
                    {(['low', 'medium', 'high'] as const).map((p) => (
                      <PriorityChipButton
                        id={p}
                        priority={priority}
                        onClick={() => setPriority(p)} 
                      />
                       
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tags
                  </label>
                  <TagSelector 
                    selectedTags={selectedTags} 
                    setSelectedTags={setSelectedTags}
                    availableTags={availableTags}
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <CancelButton
                  onClick={onClose}
                >
                  
                  Cancel
                </CancelButton>
                <SaveButton
                  onClick={handleSave}

                >
                  Save Changes
                </SaveButton>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditModal;

