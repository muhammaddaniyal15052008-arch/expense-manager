import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ExpenseContext from './context/ExpenseContext.jsx'
import { BrowserRouter } from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ExpenseContext>
      <App />
  </ExpenseContext>
  </BrowserRouter>
)
