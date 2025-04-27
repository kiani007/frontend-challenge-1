import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

// Define type for priority levels
export type PriorityLevel = 'low' | 'medium' | 'high';

// Define type for filter status
export type FilterStatus = 'all' | 'completed' | 'active';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority: PriorityLevel;
  tags: string[];
  dueDate: string | null;
  description: string;
}

export interface FilterState {
  status: FilterStatus;
  priority: 'all' | PriorityLevel;
  tags: string[];
}

// Generate default todo items for testing
const generateDefaultTodos = (): Todo[] => {
  // Create static IDs for predictable references
  const todoId1 = uuidv4();
  const todoId2 = uuidv4();
  const todoId3 = uuidv4();
  
  return [
    {
      id: todoId1,
      title: 'Complete the frontend challenge',
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'high',
      tags: [],
      dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      description: 'Finish implementing all the required features for the frontend challenge'
    },
    {
      id: todoId2,
      title: 'Learn React 19 features',
      completed: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      priority: 'medium',
      tags: [],
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
      description: 'Study the new React 19 features including server components'
    },
    {
      id: todoId3,
      title: 'Fix bugs in TodoLayout component',
      completed: true,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      priority: 'low',
      tags: [],
      dueDate: null,
      description: 'Fix the rendering issues in the TodoLayout component'
    }
  ];
};

// Initialize todos from localStorage or use defaults
const initializeTodos = (): Todo[] => {
  try {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      // Validate the parsed data before returning
      if (Array.isArray(parsedTodos)) {
        return parsedTodos;
      }
    }
    // Use default todos if no valid todos in localStorage
    const defaultTodos = generateDefaultTodos();
    // Save defaults to localStorage
    localStorage.setItem('todos', JSON.stringify(defaultTodos));
    return defaultTodos;
  } catch (error) {
    console.error('Error initializing todos from localStorage:', error);
    // Return empty array if there's an error
    return [];
  }
};

export const todosState = atom<Todo[]>({
  key: 'todosState',
  default: initializeTodos(),
  effects: [
    ({onSet}) => {
      onSet(newTodos => {
        try {
          localStorage.setItem('todos', JSON.stringify(newTodos));
        } catch (error) {
          console.error('Error saving todos to localStorage:', error);
        }
      });
    }
  ]
});

// Default tags
const defaultTags = [
  { id: uuidv4(), name: 'Work', color: '#8B5CF6' },
  { id: uuidv4(), name: 'Personal', color: '#EC4899' },
  { id: uuidv4(), name: 'Urgent', color: '#EF4444' },
  { id: uuidv4(), name: 'Later', color: '#6366F1' }
];

// Initialize tags from localStorage or use defaults
const initializeTags = (): Tag[] => {
  try {
    const savedTags = localStorage.getItem('tags');
    if (savedTags) {
      const parsedTags = JSON.parse(savedTags);
      // Validate the parsed data before returning
      if (Array.isArray(parsedTags) && parsedTags.length > 0) {
        return parsedTags;
      }
    }
    // Use default tags if no valid tags in localStorage
    localStorage.setItem('tags', JSON.stringify(defaultTags));
    return defaultTags;
  } catch (error) {
    console.error('Error initializing tags from localStorage:', error);
    return defaultTags;
  }
};

export const tagsState = atom<Tag[]>({
  key: 'tagsState',
  default: initializeTags(),
  effects: [
    ({onSet}) => {
      onSet(newTags => {
        try {
          localStorage.setItem('tags', JSON.stringify(newTags));
        } catch (error) {
          console.error('Error saving tags to localStorage:', error);
        }
      });
    }
  ]
});

export const editingTodoState = atom<Todo | null>({
  key: 'editingTodoState',
  default: null
});

export const isEditModalOpenState = atom<boolean>({
  key: 'isEditModalOpenState',
  default: false
});

export const filterState = atom<FilterState>({
  key: 'filterState',
  default: {
    status: 'all', // 'all', 'completed', 'active'
    priority: 'all', // 'all', 'low', 'medium', 'high'
    tags: [] // tag ids
  }
});

export const searchState = atom<string>({
  key: 'searchState',
  default: ''
});
