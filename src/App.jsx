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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <Routes>
                    <Route path='/' element={<Dashboard />} /> 
                    <Route path='/history' element={<History />} />
                    <Route path='/totalexpense' element={<TotalExpense />} />
                </Routes>
            </main>
        </div>
    )
}

export default App