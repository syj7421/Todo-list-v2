import React, { useState, useEffect } from "react";

function PopUp({ isOpen, onClose, fetchTodos, togglePopup, username, todo }) {
  const [showDate, setShowDate] = useState(true);
  const [showTime, setShowTime] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duedate: '',
    duetime: '',
    username: username
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || '',
        description: todo.description || '',
        duedate: todo.duedate ? new Date(todo.duedate).toISOString().split('T')[0] : '',
        duetime: todo.duetime || '',
        username: username
      });
      setShowDate(todo.duedate !== null && todo.duedate !== '');
      setShowTime(todo.duetime !== null && todo.duetime !== '');
    } else {
      setFormData({
        title: '',
        description: '',
        duedate: '',
        duetime: '',
        username: username
      });
      setShowDate(true);
      setShowTime(true);
    }
  }, [todo, username]);

  const toggleDateVisibility = () => {
    setShowDate(!showDate);
    setShowTime(false);
    if (!showDate) {
      setFormData({
        ...formData,
        duedate: '',
        duetime: ''
      });
    } else {
      setFormData({
        ...formData,
        duedate: '',
        duetime: ''
      });
    }
  };

  const toggleTimeVisibility = () => {
    setShowTime(!showTime);
    if (!showTime) {
      setFormData({
        ...formData,
        duetime: ''
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.title === ''){
      alert("The title shouldn't be empty!");
      return;
    } 
    if (showDate && formData.duedate === '') {
      alert("The due date shouldn't be empty!");
      return;
    }
    if (showTime && formData.duetime === '') {
      alert("The due time shouldn't be empty!");
      return;
    }

    const submitData = {
      ...formData,
      duedate: showDate ? formData.duedate : null,
      duetime: showDate && showTime ? formData.duetime : null
    };

    const url = todo ? `http://localhost:5000/api/todos/${todo.id}` : 'http://localhost:5000/api/todos/add';
    const method = todo ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });
      if (response.ok) {
        await fetchTodos();
        togglePopup();
        setFormData({
          title: '',
          description: '',
          duedate: '',
          duetime: '',
          username: username
        });
        setShowDate(true);
        setShowTime(true);
      } else {
        throw new Error('Failed to process todo');
      }
    } catch (error) {
      console.error('Failed to submit form', error);
    }
  }

  return (
    <div id="default-modal" aria-hidden={!isOpen} className={`${isOpen ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full h-full`}>
      <div className="relative p-6 w-full max-w-2xl h-full md:h-auto bg-white rounded-lg shadow dark:bg-gray-700">
        <h1 className="text-xl font-bold mb-4">{todo ? 'Edit Todo' : 'Add New Todo'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <input id="description" name="description" value={formData.description} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" rows="3"></input>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {showDate && (
              <>
                <div>
                  <label htmlFor="duedate" className="block text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
                  <input type="date" id="duedate" name="duedate" value={formData.duedate} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <button type="button" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-blue-300 text-sm" onClick={toggleDateVisibility}>
                  {showDate ? 'Do not specify date' : 'Specify date'}
                </button>
              </>
            )}
            {!showDate && (
              <button type="button" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-blue-300 text-sm" onClick={toggleDateVisibility}>
                Specify date
              </button>
            )}
            {showDate && showTime && (
              <>
                <div>
                  <label htmlFor="duetime" className="block text-sm font-medium text-gray-900 dark:text-white">Due Time</label>
                  <input type="time" id="duetime" name="duetime" value={formData.duetime} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <button type="button" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-blue-300 text-sm" onClick={toggleTimeVisibility}>
                  {showTime ? 'Do not specify time' : 'Specify time'}
                </button>
              </>
            )}
            {showDate && !showTime && (
              <button type="button" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-blue-300 text-sm" onClick={toggleTimeVisibility}>
                Specify time
              </button>
            )}
          </div>
          <div className="flex justify-between space-x-2">
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-blue-300 text-sm">Submit</button>
            <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-red-300 text-sm" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopUp;
