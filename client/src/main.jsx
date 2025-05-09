import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from './App.jsx';
import i18n, { initPromise } from './i18n';
import './styles/index.css';

// Компонент загрузки
const Loading = () => <div>Loading translations...</div>;

// Ждем инициализации i18next
initPromise.then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </I18nextProvider>
    </React.StrictMode>
  );
}).catch((error) => {
  console.error('Failed to start application:', error);
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </I18nextProvider>
    </React.StrictMode>
  );
});