"use client";

import {useState } from 'react';
import {Todo} from '../types/todo';
import {createTodo} from '../lib/api';

interface CreateTodoProps {
    onAddTodo: (newTodo: Todo) => void;
}

const CreateTodo = ({ onAddTodo }: CreateTodoProps) => {
    const [newTodo, setNewTodo] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        
        setIsLoading(true);
        try {
            const todo = await createTodo(newTodo);
            onAddTodo(todo);
            setNewTodo('');
        } catch (error) {
            console.error('Error adding todo: ',error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleAddTodo} className="mb=4">
            <input
                type="text"
                value={newTodo}
                onChange={e => setNewTodo(e.target.value)}
                placeholder="Add new todo"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 foucs:ring-blue-500"
                disabled={isLoading}
            />

            <button
                type="submit"
                className={`
                    mt-2 
                    w-full 
                    text-white 
                    p-2 
                    rounded 
                    ${isLoading ? 'bg-blue-300 cursor-not-allowed' :
                        'bg-blue-500 hover:bg-blue-600'}

                `}
                disabled={isLoading}
            >
                {isLoading ? (
                    <span 
                        className='
                            flex
                            items-center
                            justify-center
                    '>
                        <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
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
                            Adding... 
                    </span>
                ) : ('Add')}
            </button>
        </form>
    );

}
export default CreateTodo;