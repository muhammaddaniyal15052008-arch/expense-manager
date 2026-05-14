import React, { useContext } from 'react'
import { ExpenseData } from './context/ExpenseContext'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Navbar from './components/Navbar';
import TotalExpense from './components/TotalExpense';


const App = () => {

    const {addedExpense} = useContext(ExpenseData)
    console.log(addedExpense);
    
    
    

  return (
    <div>
    <Navbar />
  <Routes>
    <Route path='/' element={<Dashboard />} /> 
    <Route path='/history' element={<History />} />
    <Route path='/totalexpense' element={<TotalExpense />} />
  </Routes>
    </div>
    
  )
}

export default App


