import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './components/MyRoutes';
import './styles/index.css';

 
const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
    // <React.StrictMode>
        <Routes />
    // </React.StrictMode>
);

