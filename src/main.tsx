// import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App.tsx';

import './utils/i18n.tsx';

import './index.css';
import 'allotment/dist/style.css';

if (import.meta.env.DEV) {
  import('./mocks/browser.ts').then(({ worker }) => {
    worker.start();
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
