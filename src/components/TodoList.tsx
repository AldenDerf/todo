'use client';
import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { getTodos, updateTodo, deleteTodo } from '../lib/api';
import CreateTodo from './CreateTodo';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState<Set<number>>(new Set()); // Track loading todos by id
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleToggleTodo = async (todo: Todo) => {
    setLoadingTodos((prev) => new Set(prev).add(todo.id)); // Start loading

    try {
      const updatedTodo = await updateTodo(todo.id, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setLoadingTodos((prev) => {
        const newSet = new Set(prev);
        newSet.delete(todo.id); // Stop loading
        return newSet;
      });
    }
  };

  const handleDeleteTodo = async (id: number) => {
    setLoadingTodos((prev) => new Set(prev).add(id)); // Start loading
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setLoadingTodos((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id); // Stop loading
        return newSet;
      });
    }
  };

  const handleAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>

      <CreateTodo onAddTodo={handleAddTodo} />

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 bg-gray-100 rounded"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo)}
                className="mr-2"
                disabled={loadingTodos.has(todo.id)} // Disable during loading
              />
              <span
                className={todo.completed ? 'line-through text-gray-500' : ''}
              >
                {todo.title}
                {loadingTodos.has(todo.id) && (
                  <svg
                    className="animate-spin h-4 w-4 ml-2 text-blue-500 inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                )}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className={`${
                loadingTodos.has(todo.id)
                ? 'text-red-300 cursor-not-allowed'
                : 'text-red-500 hover:text-red-700'
              }`}
              disabled={loadingTodos.has(todo.id)} // Disable during loading
            >
              {loadingTodos.has(todo.id) ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-1 text-red-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Deleting...
                </span>
              ): (
                'Delete'
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
