import React, { useState, useEffect } from 'react';
import './TodoApp.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }
    const newTask = { id: Date.now(), content: inputValue, completed: false };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleToggle = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const activeTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
         className="todo-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter task"
        />
        <button className="todo-button" type="submit">Add Task</button>
      </form>
      <div className="task-groups">
        <div className="task-group">
          <h2>Active Tasks ({activeTasks.length})</h2>
          <ul className="todo-list">
            {activeTasks.map((task) => (
              <li key={task.id} className="task-item">
                <div className="task-content">{task.content}</div>
                <div className="task-buttons">
                  <button className="complete-btn" onClick={() => handleToggle(task.id)}>Mark Complete</button>
                  <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="task-group">
          <h2>Completed Tasks ({completedTasks.length})</h2>
          <ul className="todo-list">
            {completedTasks.map((task) => (
              <li key={task.id} className="task-item completed">
                <div className="task-content">{task.content}</div>
                <div className="task-buttons">
                  <button className="complete-btn" onClick={() => handleToggle(task.id)}>Mark Incomplete</button>
                  <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
