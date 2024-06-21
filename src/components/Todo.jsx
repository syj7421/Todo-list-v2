import React, { useState } from "react";

function Todo({ title, duedate, onEdit, onDelete }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const calculateDaysLeft = (dueDate) => {
    // Parse the dueDate in DD-MM-YYYY format
    const parts = dueDate.split("-");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to YYYY-MM-DD format
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time of today to 00:00:00 to ignore partial days
    const due = new Date(formattedDate);
  
    if (isNaN(due.getTime())) {
      return NaN;
    }
  
    const difference = due - today;
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return daysLeft;
  };
  
  const displayDaysLeft = (duedate) => {
    if (!duedate) {
      return null;
    }
    const daysLeft = calculateDaysLeft(duedate);
    if (isNaN(daysLeft)) {
      return "Invalid due date";
    }
    if (daysLeft < 0) {
      return "Overdue";
    }
    if (daysLeft === 0) {
      return "Due TODAY";
    }
    if (daysLeft === 1) {
      return "Due TOMORROW";
    }
    return `${daysLeft} days left`;
  };
  
  

  return (
    <div className="w-full mb-4">
      <div className="bg-gray-100 rounded flex p-4 items-center justify-between">
        <div className="flex justify-between w-full">
          <span className={`font-medium ${isChecked ? 'line-through' : ''}`}>{title}</span>
          <div className="flex items-center ml-auto space-x-2">
            <span className="dayleft text-sm text-gray-500 opacity-90">{duedate ? displayDaysLeft(duedate) : null}</span>
            <span className="font-medium">{duedate ? duedate : null}</span>
          </div>
        </div>
        <div className="tools-container flex justify-end w-1/6 space-x-4">
          
          <button onClick={handleCheck}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
          <button onClick={onEdit}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
          <button onClick={onDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
