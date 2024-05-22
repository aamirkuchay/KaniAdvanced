import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/Store';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <ToastContainer  position="bottom-center" 
                    autoClose={3000} 
                    hideProgressBar={false} 
                    newestOnTop={false} 
                    closeOnClick 
                    rtl={false} 
                    theme='dark'
                    pauseOnFocusLoss 
                    draggable 
                    pauseOnHover/>
          <App />
        </Provider>
      </PersistGate>
    </Router>
  </React.StrictMode>,
);
