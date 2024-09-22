import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCQfaQ54g4RttHdcaj2bb0OysDo-7TJMzM",
  authDomain: "fir-test-63d73.firebaseapp.com",
  databaseURL: "https://fir-test-63d73-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-test-63d73",
  storageBucket: "fir-test-63d73.appspot.com",
  messagingSenderId: "97516642400",
  appId: "1:97516642400:web:897fb4db0a6eb19b84a305",
  measurementId: "G-B3LFXRPFPW"
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log(db);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


export default firebaseConfig;