import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
 import './index.css';
import App from './App.tsx';
 import { BrowserRouter } from 'react-router';
import HeaderWrapper from './util/Headerwrapper.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoaderHandler from './hooks/LoaderHandler.tsx';
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
   <BrowserRouter>
   <LoaderHandler/>
   <HeaderWrapper/>
       <App />
   </BrowserRouter>
   </QueryClientProvider>
   </StrictMode>
);
