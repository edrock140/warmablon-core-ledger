import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Hook into local client motherboard to ensure 100% offline autonomy
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('[SGF ROOT PROTOCOL] Offline Motherboard Core Hooked successfully in scope:', reg.scope);
      })
      .catch((err) => {
        console.error('[SGF ROOT PROTOCOL] Core Hook failed to bypass gate:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

