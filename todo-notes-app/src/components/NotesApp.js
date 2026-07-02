import React, { useState } from 'react';
import './NotesApp.css';

const COLORS = ['#c8f135', '#60a5fa', '#f97316', '#a78bfa', '#34d399', '#f472b6'];

const formatDate = (ts) => {
  const d = new Date(ts);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const NotesApp = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'React Hooks Overview',
      body: 'useState for state, useEffect for side effects, useRef for DOM refs. Custom hooks let you share logic across components.',
      color: '#c8f135',
      createdAt: Date.now() - 86400000,
    },
    {
      id: 2,
      title: 'JavaScript Destructuring',
      body: 'const { name, age } = person;\nconst [first, ...rest] = arr;\nGreat for cleaner function params too.',
      color: '#60a5fa',
      createdAt: Date.now() - 43200000,
    },
  ]);

  const [activeNote, setActiveNote] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ title: '', body: '', color: COLORS[0] });
  const [searchQuery, setSearchQuery] = useState('');

  const openCreate = () => {
    setActiveNote(null);
    setForm({ title: '', body: '', color: COLORS[0] });
    setIsCreating(true);
  };

  const openEdit = (note) => {
    setActiveNote(note);
    setForm({ title: note.title, body: note.body, color: note.color });
    setIsCreating(true);
  };

  const saveNote = () => {
    if (!form.title.trim() && !form.body.trim()) return;
    if (activeNote) {
      setNotes(prev =>
        prev.map(n =>
          n.id === activeNote.id
            ? { ...n, title: form.title, body: form.body, color: form.color }
            : n
        )
      );
    } else {
      const newNote = {
        id: Date.now(),
        title: form.title || 'Untitled',
        body: form.body,
        color: form.color,
        createdAt: Date.now(),
      };
      setNotes(prev => [newNote, ...prev]);
    }
    setIsCreating(false);
    setActiveNote(null);
  };

  const deleteNote = (id, e) => {
    e.stopPropagation();
    setNotes(prev => prev.filter(n => n.id !== id));
    if (activeNote && activeNote.id === id) setIsCreating(false);
  };

  const filteredNotes = notes.filter(n => {
    const q = searchQuery.toLowerCase();
    return n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q);
  });

  return (
    <section className="notes-section">
      <div className="notes-header">
        <div>
          <h2 className="section-title"><em>Notes</em></h2>
          <p className="section-subtitle">
            {notes.length} note{notes.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        <button className="new-note-btn" onClick={openCreate}>
          + New note
        </button>
      </div>

      {/* Editor */}
      {isCreating && (
        <div className="note-editor" style={{ borderColor: form.color + '55' }}>
          <div className="editor-top">
            <input
              className="editor-title"
              placeholder="Note title..."
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              autoFocus
            />
            <div className="color-picker">
              {COLORS.map(c => (
                <button
                  key={c}
                  className={"color-dot" + (form.color === c ? ' selected' : '')}
                  style={{ background: c }}
                  onClick={() => setForm(f => ({ ...f, color: c }))}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
          </div>
          <textarea
            className="editor-body"
            placeholder="Write your note here..."
            value={form.body}
            onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
            rows={6}
          />
          <div className="editor-actions">
            <button className="cancel-btn" onClick={() => setIsCreating(false)}>
              Cancel
            </button>
            <button className="save-btn" onClick={saveNote}>
              {activeNote ? 'Save changes' : 'Save note'}
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      {notes.length > 0 && (
        <div className="search-bar">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search notes..."
            className="search-input"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>
      )}

      {/* Notes Grid */}
      {filteredNotes.length === 0 && !isCreating && (
        <div className="notes-empty">
          <span className="empty-icon">✎</span>
          <p>{searchQuery ? 'No notes match your search.' : 'No notes yet. Create your first one!'}</p>
        </div>
      )}

      <div className="notes-grid">
        {filteredNotes.map(note => (
          <div
            key={note.id}
            className="note-card"
            style={{ '--note-accent': note.color }}
            onClick={() => openEdit(note)}
          >
            <div className="note-card-top-bar" style={{ background: note.color }} />
            <div className="note-card-body">
              <h3 className="note-card-title">{note.title || 'Untitled'}</h3>
              <p className="note-card-preview">{note.body}</p>
            </div>
            <div className="note-card-footer">
              <span className="note-date">{formatDate(note.createdAt)}</span>
              <button
                className="note-delete-btn"
                onClick={(e) => deleteNote(note.id, e)}
                title="Delete note"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NotesApp;
