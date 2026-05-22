import React, { useContext, useState } from 'react'
import { ExpenseData } from '../context/ExpenseContext'
import { useCurrency } from '../context/CurrencyContext'

const Dashboard = () => {
  const { addedExpense, setaddedExpense, categories } = useContext(ExpenseData)
  const { 
    selectedCurrency, 
    setSelectedCurrency, 
    convertAmount, 
    loading, 
    lastUpdate,
    BASE_CURRENCY,
    allCurrencies 
  } = useCurrency()
  
  const [inputExpense, setinputExpense] = useState('')
  const [detail, setdetail] = useState('')
  const [selectedCat, setselectedCat] = useState('Food')

  const submitHandler = (e) => {
    e.preventDefault()
    if (!inputExpense || inputExpense === '') return;
    
    const dateNow = new Date().toLocaleString();
    const newExpense = {
      id: Date.now(),
      inputExpense: parseFloat(inputExpense),
      date: dateNow,
      category: selectedCat,
      detail: detail || ''
    }
    
    setaddedExpense([...addedExpense, newExpense])
    setinputExpense('')
    setdetail('')
  }

  const deleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      const updatedExpenses = addedExpense.filter(expense => expense.id !== id);
      setaddedExpense(updatedExpenses);
    }
  }

  const getCurrencySymbol = (code) => {
    const symbols = {
      PKR: '₨', USD: '$', EUR: '€', GBP: '£', INR: '₹',
      AED: 'د.إ', SAR: '﷼', CAD: 'C$', AUD: 'A$', JPY: '¥',
      CNY: '¥', TRY: '₺'
    };
    return symbols[code] || code;
  };

  const totalExpenses = addedExpense.reduce((total, expense) => {
    const converted = parseFloat(convertAmount(expense.inputExpense));
    return total + (isNaN(converted) ? 0 : converted);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Currency Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md p-4 mb-6">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <span className="text-white text-sm opacity-90">Displaying in:</span>
            <span className="text-white text-xl font-bold ml-2">
              {getCurrencySymbol(selectedCurrency)} {selectedCurrency}
            </span>
            <span className="text-blue-100 text-sm ml-2">(Base: {BASE_CURRENCY})</span>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-sm font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allCurrencies.map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
            {loading && (
              <div className="text-white text-sm">
                <span className="animate-pulse">⟳ Updating...</span>
              </div>
            )}
          </div>
        </div>
        {lastUpdate && !loading && (
          <div className="text-blue-100 text-xs mt-2">Rates updated: {lastUpdate}</div>
        )}
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
          <h2 className="text-2xl font-semibold text-gray-800">Add New Expense</h2>
        </div>
        
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expense Amount <span className="text-gray-400">({BASE_CURRENCY})</span>
            </label>
            <input 
              value={inputExpense}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^[0-9\b]+$/.test(value)) {
                  setinputExpense(value);
                }
              }}
              placeholder={`Enter amount in ${BASE_CURRENCY}`} 
              type="number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expense Detail <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <textarea
              value={detail}
              onChange={(e) => setdetail(e.target.value)}
              placeholder="Add additional details about this expense..."
              rows="3"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select 
              value={selectedCat} 
              onChange={(e) => setselectedCat(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
            >
              {categories.filter(c => c !== 'All').map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Expense
          </button>
        </form>
      </div>

      {/* Expenses List Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-semibold text-gray-800">Recent Expenses</h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg px-5 py-2.5">
            <span className="text-sm text-gray-600">Total:</span>
            <span className="text-xl font-bold text-blue-700 ml-2">
              {getCurrencySymbol(selectedCurrency)} {totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {addedExpense.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-300 mb-4">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No expenses added yet</p>
            <p className="text-gray-400 text-sm mt-2">Start by adding your first expense above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {[...addedExpense].reverse().map((elem) => {
              const convertedAmount = convertAmount(elem.inputExpense);
              
              return (
                <div 
                  key={elem.id} 
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                >
                  <div className="flex-1 space-y-2 sm:space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-lg font-bold text-gray-800">
                        {getCurrencySymbol(selectedCurrency)} {typeof convertedAmount === 'string' ? parseFloat(convertedAmount).toFixed(2) : convertedAmount.toFixed(2)}
                      </span>
                      {selectedCurrency !== BASE_CURRENCY && (
                        <span className="text-xs text-gray-400">
                          ≈ ₨{elem.inputExpense}
                        </span>
                      )}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {elem.category}
                      </span>
                    </div>
                    {elem.detail && (
                      <p className="text-sm text-gray-600">
                        {elem.detail}
                      </p>
                    )}
                    <div className="text-xs text-gray-400">
                      {elem.date}
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteExpense(elem.id)}
                    className="mt-3 sm:mt-0 text-red-500 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard