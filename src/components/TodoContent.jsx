import React from "react";
import Todo from "./Todo";

function TodoContent({ username }) {
  return (
    <div className="w-full">
      {username ? "True" : "False"}
      {username && <div className="mb-4 text-lg font-bold">Logged in as: {username}</div>}
      <Todo />
      <Todo />
      <Todo />
    </div>
  );
}

export default TodoContent;
