import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Do NOT use React StrictMode as per prompt instructions
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}

