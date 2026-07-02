import React, { useState } from 'react';
import './TodoApp.css';

const FILTERS = ['All', 'Active', 'Completed'];

const TodoApp = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Set up React project structure', completed: true },
    { id: 2, text: 'Build To-Do component with state', completed: false },
    { id: 3, text: 'Add notes feature with edit support', completed: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const addTask = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const newTask = { id: Date.now(), text: trimmed, completed: false };
    setTasks(prev => [newTask, ...prev]);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask();
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditValue(task.text);
  };

  const saveEdit = (id) => {
    const trimmed = editValue.trim();
    if (!trimmed) return;
    setTasks(prev => prev.map(t => t.id === id ? { ...t, text: trimmed } : t));
    setEditingId(null);
    setEditValue('');
  };

  const handleEditKey = (e, id) => {
    if (e.key === 'Enter') saveEdit(id);
    if (e.key === 'Escape') setEditingId(null);
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(t => !t.completed));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <section className="todo-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">
            <em>Tasks</em>
          </h2>
          <p className="section-subtitle">
            {activeCount === 0
              ? 'All caught up!'
              : `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`}
          </p>
        </div>
        <div className="stats-row">
          <span className="stat">
            <span className="stat-num">{tasks.length}</span> total
          </span>
          <span className="stat done">
            <span className="stat-num">{completedCount}</span> done
          </span>
        </div>
      </div>

      {/* Input */}
      <div className="add-task-bar">
        <input
          type="text"
          className="task-input"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="add-btn" onClick={addTask}>
          + Add
        </button>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        {FILTERS.map(f => (
          <button
            key={f}
            className={"filter-btn" + (filter === f ? ' active' : '')}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
        {completedCount > 0 && (
          <button className="clear-btn" onClick={clearCompleted}>
            Clear done
          </button>
        )}
      </div>

      {/* Task List */}
      <ul className="task-list">
        {filteredTasks.length === 0 && (
          <li className="empty-state">
            <span className="empty-icon">○</span>
            <p>{filter === 'Completed' ? 'No completed tasks yet.' : 'Nothing here. Add a task above!'}</p>
          </li>
        )}
        {filteredTasks.map(task => (
          <li key={task.id} className={"task-item" + (task.completed ? ' completed' : '')}>
            <button
              className={"task-check" + (task.completed ? ' checked' : '')}
              onClick={() => toggleTask(task.id)}
              aria-label="Toggle task"
            >
              {task.completed && <span>✓</span>}
            </button>

            {editingId === task.id ? (
              <input
                className="task-edit-input"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onKeyDown={e => handleEditKey(e, task.id)}
                onBlur={() => saveEdit(task.id)}
                autoFocus
              />
            ) : (
              <span
                className="task-text"
                onDoubleClick={() => startEdit(task)}
              >
                {task.text}
              </span>
            )}

            <div className="task-actions">
              <button
                className="action-btn edit"
                onClick={() => startEdit(task)}
                title="Edit"
              >✎</button>
              <button
                className="action-btn delete"
                onClick={() => deleteTask(task.id)}
                title="Delete"
              >✕</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodoApp;
