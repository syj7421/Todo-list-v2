import React, { useState, useEffect } from "react";


function PopUp({ todo, togglePopup, fetchTodos }) {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    duedate: '',
    duetime: ''
  });
  const [dateVisible, setDateVisible] = useState(true);
  const [timeVisible, setTimeVisible] = useState(true);
  const [today, setToday] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    updateDateAndTime();  // Ensure this is called to set 'today' and 'currentTime'
    if (todo) {
      let formattedDate = '';
      if (todo.duedate) {
        const utcDate = new Date(todo.duedate); // Create a date object directly from the ISO string
        formattedDate = utcDate.toLocaleDateString('en-CA'); // Formats to 'YYYY-MM-DD', ensuring local timezone is considered
      }
  
      setFormData({
        title: todo.title || '',
        details: todo.details || '',
        duedate: formattedDate,
        duetime: todo.duetime ? todo.duetime.substring(0, 5) : ''
      });
      setDateVisible(todo.duedate !== null && todo.duedate !== '');
      setTimeVisible(todo.duetime !== null && todo.duetime !== '');
    } else {
      setFormData({
        title: '',
        details: '',
        duedate: '',
        duetime: ''
      });
    }
  }, [todo]);
  

  const updateDateAndTime = () => {
    const date = new Date();
    const formattedDate = date.toISOString().substring(0, 10); // Formats the date to YYYY-MM-DD
    const formattedTime = date.toTimeString().substring(0, 5); // Formats time to HH:MM
    setToday(formattedDate);
    setCurrentTime(formattedTime);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const minTime = formData.duedate === today ? currentTime : "00:00";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.title === ''){
      alert("The title shouldn't be empty!");
      return;
    } 
    if (formData.duedate === '' && dateVisible) {
      alert("The due date shouldn't be empty!");
      return;
    }
    if (formData.duetime === '' && timeVisible) {
      alert("The due time shouldn't be empty!");
      return;
    }

    const submitData = {
      ...formData,
      duedate: dateVisible ? formData.duedate : null,
      duetime: (dateVisible && timeVisible) ? formData.duetime : null
    };

    const url = todo ? `/api/todos/update/${todo.id}` : '/api/todos/add';
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
      } else {
        throw new Error('Failed to process todo');
      }
    } catch (error) {
      console.error('Failed to submit form', error);
    }
  };

  const toggleDateVisibility = () => {
    const newVisibility = !dateVisible;
    setDateVisible(newVisibility);
    if (!newVisibility) {
      setTimeVisible(false);
      setFormData({ 
        ...formData, 
        duedate: '', 
        duetime: '' // Clear both fields when date is not specified
      });
    } else {
      setFormData({ 
        ...formData, 
        duedate: ''
      });
    }
  };

  const toggleTimeVisibility = () => {
    setTimeVisible(!timeVisible);
    if (!timeVisible) {
      setFormData({ 
        ...formData, 
        duetime: ''
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}/>
        <label htmlFor="details">Details</label>
        <input type="text" id="details" name="details" value={formData.details} onChange={handleChange}/>

        <div className="date-container">
          {dateVisible ? (
            <>
              <label htmlFor="duedate">Due Date</label>
              <input type="date" id="duedate" name="duedate" value={formData.duedate} onChange={handleChange} min={today} max="2050-12-31" />
            </>
          ) : null}
          <button type="button" onClick={toggleDateVisibility}>{dateVisible ? 'Do not specify due date' : 'Specify due date'}</button>
        </div>

        <div className="time-container">
          {timeVisible && dateVisible ? (
            <>
              <label htmlFor="duetime">Due Time</label>
              <input type="time" id="duetime" name="duetime" value={formData.duetime} onChange={handleChange} min={minTime}/>
            </>
          ) : null}
          {dateVisible && <button type="button" onClick={toggleTimeVisibility}>{timeVisible ? 'Do not specify due time' : 'Specify due time'}</button>}
        </div>
        <button type="submit">{todo ? 'Update' : 'Add'}</button>
      </form>
      <button type="button" onClick={togglePopup}>Close</button>
    </div>
  );
}

export default PopUp;
