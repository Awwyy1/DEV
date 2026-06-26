import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import App from './App';
import { OrderProvider } from './order';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <OrderProvider>
        <App />
        <Analytics />
      </OrderProvider>
    </BrowserRouter>
  </StrictMode>,
);
