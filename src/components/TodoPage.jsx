import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import TodoContent from './TodoContent';
import TodoHeader from './TodoHeader';
import PopUp from "./PopUp";

const TodoPage = () => {
  const location = useLocation();
  const { username } = location.state || {};
  const [showPopup, setShowPopup] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      console.log(username);
      const response = await fetch(`http://localhost:5000/api/todos/${username}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  }, [username]); // dependency on username since it's used in the URL

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]); // dependency on fetchTodos

  const togglePopup = (todo = null) => {
    setCurrentTodo(todo);  // Pass null for new todo, or todo data for edits
    setShowPopup(!showPopup);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 md:w-4/5 lg:w-2/3 max-w-screen-lg mx-auto">
      <TodoHeader togglePopup={() => togglePopup()} />
      {showPopup && <PopUp todo={currentTodo} togglePopup={() => togglePopup()} fetchTodos={fetchTodos} />}
      <TodoContent todos={todos} />
    </div>
  );
};

export default TodoPage;
