import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/AppContext';
import { ScanningProvider } from './context/ScanningContext';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <ScanningProvider>
        <App />
      </ScanningProvider>
    </AppProvider>
  </React.StrictMode>
);