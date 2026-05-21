import React, { useContext, useState } from 'react'
import { ExpenseData } from '../context/ExpenseContext'

const Dashboard = () => {

  const {addedExpense, setaddedExpense, categories} = useContext(ExpenseData)
  const [inputExpense, setinputExpense] = useState('')
  const [detail, setdetail] = useState('')
  const [selectedCat, setselectedCat] = useState('Food')
  console.log(categories);
  
  const submitHandler = (e) => {
    e.preventDefault()
    const dateNow = new Date().toLocaleString();
    setaddedExpense([...addedExpense, {
      inputExpense: inputExpense, 
      date: dateNow,
      category: selectedCat,
      detail: detail
    }])
    setinputExpense('')
    setdetail('')
  }

  const deleteExpense = (idx) => {
    const copyExpense = [...addedExpense];
    copyExpense.splice(idx, 1);
    setaddedExpense(copyExpense);
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Form Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Expense</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="expense" className="block text-sm font-medium text-gray-700 mb-2">
              Expense Amount
            </label>
            <input 
              id="expense"
              value={inputExpense}
              // Is check se sirf numbers ya khali text hi state mein save hoga
              onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[0-9\b]+$/.test(value)) {
              setinputExpense(value);
            }
            }}
              placeholder="Enter Expense" 
              type="number" // Yeh user ko sirf number likhne ki ijazat dega
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
             />
            <label htmlFor="expense" className="block text-sm font-medium text-gray-700 mb-2">
              Expense Detail / <span className='text-xs text-gray-500'>optional</span>
            </label>
            <textarea
              id="expenseDetail"
              value={detail} // Apne state variable ke mutabik change karlein
              onChange={(e) => setdetail(e.target.value)}
              placeholder="Enter Expense Details"
              rows="4" // Yeh textarea ki default height set karega
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select 
              id="category"
              value={selectedCat} 
              onChange={(e) => setselectedCat(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white "
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Expense
          </button>
        </form>
      </div>

      {/* Expenses List Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Expenses</h2>
        {addedExpense.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No expenses added yet</p>
            <p className="text-gray-400 text-sm mt-2">Start by adding your first expense above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {addedExpense.slice().reverse().map((elem, idx) => (
              <div 
                key={idx} 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
              >
                <div className="flex-1 space-y-1 sm:space-y-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-lg font-semibold text-gray-800">
                      ₹{elem.inputExpense}
                    </span>
                    <span className="text-lg font-semibold text-gray-800">
                      {elem.detail}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {elem.category}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {elem.date}
                  </div>
                </div>
                <button 
                  onClick={() => deleteExpense(idx)}
                  className="mt-2 sm:mt-0 text-red-600 hover:text-red-800 font-medium px-3 py-1 rounded-md hover:bg-red-50 transition duration-200"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard