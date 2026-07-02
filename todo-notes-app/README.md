# To-Do App + Notes App — Minor Project 04

A combined task manager and notes application built with **React.js**.

## Features

### To-Do App
- Add new tasks with Enter or the Add button
- Mark tasks complete / incomplete with a click
- Double-click any task to edit it inline
- Delete individual tasks
- Filter tasks: All / Active / Completed
- Clear all completed tasks at once
- Live count of remaining tasks

### Notes App
- Create notes with a title, body, and color tag
- Edit any note by clicking on it
- Delete notes (hover to reveal the delete button)
- Search notes by title or content
- Color-coded cards with 6 accent colors

## Tech Stack
- React.js (Create React App)
- JavaScript ES6+ (arrow functions, destructuring, array methods, modules)
- CSS3 with custom properties (dark theme)
- Google Fonts (Space Grotesk + Instrument Serif)

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── App.js                  # Root component, tab navigation
├── styles/
│   ├── global.css          # CSS variables, reset, base styles
│   └── App.css             # Header, tabs, layout
└── components/
    ├── TodoApp.js           # To-do list logic & UI
    ├── TodoApp.css
    ├── NotesApp.js          # Notes logic & UI
    └── NotesApp.css
```

## Submission
Minor Project 04 — Web Development Program
