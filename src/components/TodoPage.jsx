import React from 'react';
import { useLocation } from 'react-router-dom';
import TodoContent from './TodoContent';
import TodoHeader from './TodoHeader';

const TodoPage = () => {
  const location = useLocation();
  const { username } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 md:w-4/5 lg:w-2/3 max-w-screen-lg mx-auto">
      <TodoHeader username={username} />
      <TodoContent username={username} />
    </div>
  );
};

export default TodoPage;
