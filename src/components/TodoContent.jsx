import React, { useState } from "react";
import Todo from "./Todo";
import PopUp from "./PopUp";
import TodoDetails from "./TodoDetails";

function TodoContent({ todos, fetchTodos, username }) {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTodoDetails, setSelectedTodoDetails] = useState(null);
  const [isTodoDetailsOpen, setIsTodoDetailsOpen] = useState(false);

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

  const onShowTodoDetails = (todo) => {
    setSelectedTodoDetails(todo);
    setIsTodoDetailsOpen(true);

  };

  const toggleTodoDetails= () => {
    setIsTodoDetailsOpen(!isTodoDetailsOpen);
    setSelectedTodo(null);
  };

  return (
    <div className="w-full">
      {todos.map(todo => (
        <Todo key={todo.id} title={todo.title} duedate={todo.formatted_duedate} onDelete={() => onDelete(todo.id)} onEdit={() => onEdit(todo)} checkDetails={() => {onShowTodoDetails(todo)}}/>
      ))}
      {isPopupOpen && (
        <PopUp
          isOpen={isPopupOpen}
          onClose={togglePopup}
          fetchTodos={fetchTodos}
          togglePopup={togglePopup}
          username={username} 
          todo={selectedTodo}
        />
      )}
      {isTodoDetailsOpen && (
        <TodoDetails
          isOpen={isTodoDetailsOpen}
          onClose={toggleTodoDetails}
          togglePopup={toggleTodoDetails}
          todo={selectedTodoDetails}
        />
      )}
      
    </div>
  );
}

export default TodoContent;
