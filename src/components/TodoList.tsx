"use client";
import { useState, useEffect} from 'react';
import { Todo } from '../types/todo';
import  {getTodos, createTodo, updateTodo, deleteTodo} from '../lib/api';

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(( ) => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const data = await getTodos();
        setTodos(data);
    };

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        const todo = await createTodo(newTodo);
        setTodos([...todos, todo]);
        setNewTodo('');
    };

    const handleToggleTodo = async (todo: Todo) => {
        const updatedTodo = await updateTodo(todo.id, {
            completed: !todo.completed
        })
        setTodos(todos.map(t => (t.id === todo.id ? updatedTodo : t)));
    }

    const handleDeleteTodo = async (id: number) => {
        await deleteTodo(id);
        setTodos(todos.filter(t => t.id !== id));
    };

    return (
        <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold mb-4 text-center'>
                Todo App
            </h1>

            <form onSubmit={handleAddTodo} className='mb-4'>
                <input
                    type="text"
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                    className='w-full p-2 border rounded focus:outline-none focus-ring-2 focus:ring-blue-500'
                />
                <button
                    type="submit"
                    className='mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
                >
                    Add
                </button>
            </form>

            <ul className='space-y-2'>
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        className='flex items-center justify-between p-2 bg-gray-100 rounded'

                    >
                        <div className='flex items-center'>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleTodo(todo)}
                                className='mr-2'
                            />
                            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                                {todo.title}
                            </span>
                        </div>
                        <button
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;