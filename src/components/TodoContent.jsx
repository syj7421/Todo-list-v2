import React from "react";
import Todo from "./Todo";

function TodoContent({ todos}) {
  



  return (
    <div className="w-full">
      {todos.map(todo => (
        <Todo key={todo.id} title={todo.title} />
      ))}
    </div>
  );
}

export default TodoContent;
