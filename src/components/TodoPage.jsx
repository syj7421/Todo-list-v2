import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import TodoContent from './TodoContent';
import TodoHeader from './TodoHeader';
import PopUp from "./PopUp";

const TodoPage = () => {
  const location = useLocation();
  const { username } = location.state || {};
  const [showPopup, setShowPopup] = useState(false);
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${username}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  }, [username]); 

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]); 

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 md:w-4/5 lg:w-2/3 max-w-screen-lg mx-auto">
      <TodoHeader togglePopup={togglePopup} />
      <PopUp isOpen={showPopup} onClose={togglePopup} fetchTodos={fetchTodos} togglePopup={togglePopup} username={username}/>
      <TodoContent todos={todos} fetchTodos={fetchTodos} username={username} />
    </div>
  );
};

export default TodoPage;
