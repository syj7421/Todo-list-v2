import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import TodoPage from './components/TodoPage.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
