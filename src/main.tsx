import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './app/styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <StoreProvider>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </StoreProvider>
   </StrictMode>,
);
