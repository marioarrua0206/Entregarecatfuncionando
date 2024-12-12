import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "./context/ItemsContext";
import App from './App.jsx';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBCGb80IRWU9OVzuoLhXAAUq1oVrFjE-x0",
  authDomain: "entrega-recat.firebaseapp.com",
  projectId: "entrega-recat",
  storageBucket: "entrega-recat.firebasestorage.app",
  messagingSenderId: "325257122222",
  appId: "1:325257122222:web:32edd008450a4f7300f83f",
  measurementId: "G-3HB6D175C0"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Provider>
    <App />
    </Provider>
    
  </StrictMode>,
)
