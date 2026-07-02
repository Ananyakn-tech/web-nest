import React, { useState } from 'react';
import './styles/global.css';
import './styles/App.css';
import TodoApp from './components/TodoApp';
import NotesApp from './components/NotesApp';

const App = () => {
  const [activeTab, setActiveTab] = useState('todo');

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-icon">◈</span>
            <h1 className="brand-name">
              Focus<span className="brand-accent">OS</span>
            </h1>
          </div>
          <nav className="tab-nav">
            <button
              className={"tab-btn" + (activeTab === 'todo' ? ' active' : '')}
              onClick={() => setActiveTab('todo')}
            >
              <span className="tab-icon">✓</span>
              To-Do
            </button>
            <button
              className={"tab-btn" + (activeTab === 'notes' ? ' active' : '')}
              onClick={() => setActiveTab('notes')}
            >
              <span className="tab-icon">✎</span>
              Notes
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <div className={"tab-panel" + (activeTab === 'todo' ? ' visible' : ' hidden')}>
          <TodoApp />
        </div>
        <div className={"tab-panel" + (activeTab === 'notes' ? ' visible' : ' hidden')}>
          <NotesApp />
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with React.js &middot; Minor Project 04</p>
      </footer>
    </div>
  );
};

export default App;
