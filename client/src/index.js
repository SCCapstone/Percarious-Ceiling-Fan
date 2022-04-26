import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './contexts/AuthContext';

//This is where the actual web page runs, so we wrap it in the AuthContextProvider so that we can access user accounts throughout the site
ReactDOM.render(
  <React.StrictMode>
	  <AuthContextProvider>
	  <App />
	  </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
