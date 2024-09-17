import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' in React 18
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Adjust the path to your store.js
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
