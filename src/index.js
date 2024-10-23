import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SingleGame from './pages/SingleGame';
import reportWebVitals from './reportWebVitals';
import SingleGameSelection from './pages/SingleGameSelection';
import SingleGamePayment from './pages/SingleGamePayment';
import SingleGamePaymentCheckStatus from './pages/SingleGamePaymentCheckStatus';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: 'single_game',
    element: <SingleGame/>
  },
  {
    path: 'single_game_selection',
    element: <SingleGameSelection/>
  },
  {
    path: 'single_game_payment',
    element: <SingleGamePayment/>
  },
  {
    path: 'single_game_status',
    element: <SingleGamePaymentCheckStatus/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
