import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Import di sini
import App from './App.jsx'
import './index.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({ duration: 800, once: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BUNGKUS APP DENGAN BROWSER ROUTER DI SINI */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)