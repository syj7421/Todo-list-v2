import React from "react";
import Todo from "./Todo";

function TodoContent({ todos, fetchTodos }) {

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

  return (
    <div className="w-full">
      {todos.map(todo => (
        <Todo key={todo.id} title={todo.title} onDelete={() => onDelete(todo.id)} />
      ))}
    </div>
  );
}

export default TodoContent;
