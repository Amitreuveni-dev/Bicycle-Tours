import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Global styles (reset, RTL, typography, scrollbar, utilities)
import './styles/globals.scss';

import { ThemeProvider } from './context/ThemeContext';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found in document.');

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
