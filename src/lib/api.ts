import axios from 'axios';

const api = axios.create({
    baseURL: 'http://todoapi.test/api',
});

export const getTodos = () => api.get<Todo[]>('/todos').then(res => res.data);

export const createTodo = (title: string) =>
    api.post<Todo>('/todos', { title }).then(res => res.data);

export const updateTodo = (id: number, data: Partial<Todo>) =>
    api.put<Todo>(`/todos/${id}`, data).then(res => res.data);

export const deleteTodo = (id: number) => 
    api.delete(`/todos/${id}`).then(res => res.data);
