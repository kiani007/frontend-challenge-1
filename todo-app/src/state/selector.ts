import { selector } from 'recoil';
import { todosState, filterState, searchState } from './todo-atoms';
import { format, isPast, parseISO } from 'date-fns';

export const filteredTodosState = selector({
  key: 'filteredTodosState',
  get: ({ get }) => {
    const todos = get(todosState);
    const filter = get(filterState);
    const searchQuery = get(searchState).toLowerCase();
    
    return todos
      .filter(todo => {
        // Filter by status
        if (filter.status === 'completed' && !todo.completed) return false;
        if (filter.status === 'active' && todo.completed) return false;
        
        // Filter by priority
        if (filter.priority !== 'all' && todo.priority !== filter.priority) return false;
        
        // Filter by tags
        if (filter.tags.length > 0 && !filter.tags.some(tag => todo.tags.includes(tag))) return false;
        
        // Filter by search query
        if (searchQuery && !todo.title.toLowerCase().includes(searchQuery)) return false;
        
        return true;
      })
      .sort((a, b) => {
        // Sort by creation date (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }
});

export const todosStatsState = selector({
  key: 'todosStatsState',
  get: ({ get }) => {
    const todos = get(todosState);
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    const overdue = todos.filter(todo => 
      !todo.completed && todo.dueDate && isPast(parseISO(todo.dueDate))
    ).length;
    
    const byPriority = {
      high: todos.filter(todo => todo.priority === 'high').length,
      medium: todos.filter(todo => todo.priority === 'medium').length,
      low: todos.filter(todo => todo.priority === 'low').length
    };
    
    return {
      total,
      completed,
      active,
      overdue,
      byPriority
    };
  }
});