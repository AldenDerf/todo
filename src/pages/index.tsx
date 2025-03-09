import type { NextPage } from 'next';
import TodoList from '../components/TodoList';

const Home: NextPage = () => {
    return (
        <div className='min-h-screen bg-gray-100'>
            <p>Todo</p>
            <TodoList />
        </div>
    );
}

export default Home;