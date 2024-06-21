import React from 'react';

const TodoDetails = ({ isOpen, onClose, todo }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Todo Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <div className="mt-1 p-2 bg-gray-100 rounded">{todo.title}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <div className="mt-1 p-2 bg-gray-100 rounded">{todo.description || 'No description provided'}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <div className="mt-1 p-2 bg-gray-100 rounded">{todo.duedate ? new Date(todo.duedate).toLocaleDateString() : 'No due date'}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Time</label>
            <div className="mt-1 p-2 bg-gray-100 rounded">{todo.duetime || 'No due time'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;
