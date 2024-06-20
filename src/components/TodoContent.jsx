import React, { useState } from "react";
import Todo from "./Todo";
import PopUp from "./PopUp";

function TodoContent({ todos, fetchTodos }) {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTodos();
      } else {
        console.error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onEdit = (todo) => {
    setSelectedTodo(todo);
    setIsPopupOpen(true);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setSelectedTodo(null);
  };

  return (
    <div className="w-full">
      {todos.map(todo => (
        <Todo key={todo.id} title={todo.title} onDelete={() => onDelete(todo.id)} onEdit={() => onEdit(todo)} />
      ))}
      {isPopupOpen && (
        <PopUp
          isOpen={isPopupOpen}
          onClose={togglePopup}
          fetchTodos={fetchTodos}
          togglePopup={togglePopup}
          username="abc123" // Pass the username as needed
          todo={selectedTodo}
        />
      )}
    </div>
  );
}

export default TodoContent;
