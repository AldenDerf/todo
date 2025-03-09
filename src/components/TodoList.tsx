"use client";
import { useState, useEffect} from 'react';
import { Todo } from '../types/todo';
import  {getTodos, updateTodo, deleteTodo} from '../lib/api';
import CreateTodo from './CreateTodo';

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(( ) => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const data = await getTodos();
        setTodos(data);
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

    const handleAddTodo = (newTodo: Todo) => {
        setTodos([...todos, newTodo]);
    }

    return (
        <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold mb-4 text-center'>
                Todo App
            </h1>

            <CreateTodo onAddTodo={handleAddTodo} />

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