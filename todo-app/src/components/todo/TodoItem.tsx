"use client"
import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { Check, Trash2, Edit, Clock } from 'lucide-react';
import { Todo, todosState, isEditModalOpenState, editingTodoState, tagsState } from '../../state/todo-atoms';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [todos, setTodos] = useRecoilState(todosState);
  const setIsEditModalOpen = useSetRecoilState(isEditModalOpenState);
  const setEditingTodo = useSetRecoilState(editingTodoState);
  const tags = useRecoilValue(tagsState);

  const toggleComplete = () => {
    setTodos(
      todos.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = () => {
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  const editTodo = () => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  const priorityColors = {
    low: ' bg-blue-500/20 text-blue-500 border-blue-300',
    medium: ' bg-purple-500/20 text-purple-500 border-purple-300',
    high: ' bg-pink-500/20 text-pink-500 border-pink-300',
  };

  const selectedTags = tags.filter(tag => todo.tags.includes(tag.id));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      className={`bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 border-l-4 ${
        priorityColors[todo.priority]
      } ${todo.completed ? 'opacity-70' : ''}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={toggleComplete}
          className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border ${
            todo.completed 
              ? 'border-green-500 bg-green-500 text-white' 
              : 'border-gray-300 dark:border-gray-600 hover:border-purple-500'
          } flex items-center justify-center`}
        >
          {todo.completed && <Check className="w-3 h-3" />}
        </button>

        <div className="flex-grow">
          <div className="flex justify-between">
            <h3 className={`font-medium text-gray-900 dark:text-white ${
              todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
            }`}>
              {todo.title}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={editTodo}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={deleteTodo}
                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="text-xs pr-2 font-semibold text-gray-500 dark:text-gray-400">Tags:</span>
              {selectedTags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-0.5 rounded-full text-xs"
                  style={{ 
                    backgroundColor: `${tag.color}20`, // 20% opacity
                    color: tag.color
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
            
          )}
           {todo.priority && (
            <div className="mt-2">
              <span className="text-xs pr-2 font-semibold text-gray-500 dark:text-gray-400">
                Priority:
              </span>
              <span
                className={`inline-block rounded-full px-2 py-0.5 text-xs font-xs ${priorityColors[todo.priority]}`}
                // style={{ backgroundColor: `${todo.priority}20` }} // 20% opacity
              >
                 {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
            </div>
          )}

          {todo.description && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="text-gray-500 text-xs font-semibold pr-2 dark:text-gray-400">Description:</span>
              {todo.description}
            </p>
          )}
          
          {todo.completed && (
            <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span className="text-xs pr-2 font-semibold text-gray-500 dark:text-gray-400">
                Status:
              </span>
              <Check className="w-3 h-3 mr-1" />
              Completed
            </div>
          )}

         

          {todo.dueDate && (
            <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3 mr-1" />
              {format(parseISO(todo.dueDate), "MMM d, yyyy")}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TodoItem;