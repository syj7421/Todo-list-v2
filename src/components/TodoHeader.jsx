import React from 'react';

const TodoHeader = ({ togglePopup }) => {
  return (
    <div className="flex justify-between items-center w-full p-4">
      <h1 className="text-xl font-bold">Todo List</h1>
      <button
          type="button"
          data-modal-target="default-modal" 
          data-modal-toggle="default-modal"
          className="text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={togglePopup}
        >
        <svg
          className="w-5 h-5 text-white dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M5 12h14m-7 7V5"
          />
        </svg>
      </button>
    </div>
  );
};

export default TodoHeader;


