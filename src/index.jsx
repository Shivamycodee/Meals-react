import React from 'react';
import App from './App';
import { AppProvider } from './Context';
import {createRoot} from 'react-dom/client';
import { StrictMode } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <StrictMode>
    <AppProvider>
    <App />
    </AppProvider>
  </StrictMode>
);
