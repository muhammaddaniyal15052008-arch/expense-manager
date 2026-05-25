import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import ExpenseContext from './context/ExpenseContext'
import { CurrencyProvider } from './context/CurrencyContext'

// Detect if running on production or local
const basename = import.meta.env.PROD ? '/expense-manager/' : '/'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <ExpenseContext>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </ExpenseContext>
    </BrowserRouter>
  </React.StrictMode>,
)