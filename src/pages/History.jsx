import React, { useContext, useState } from 'react'
import { ExpenseData } from '../context/ExpenseContext'
import { useCurrency } from '../context/CurrencyContext'

const History = () => {
  const { addedExpense, setaddedExpense, categories } = useContext(ExpenseData)
  const { 
    selectedCurrency, 
    convertAmount, 
    BASE_CURRENCY,
    allCurrencies 
  } = useCurrency()
  
  const [selectedCategory, setselectedCategory] = useState('All')

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

  const filteredExpenses = addedExpense.filter((elem) => {
    if (selectedCategory === "All") return true;
    return elem.category === selectedCategory;
  });

  const totalExpenses = filteredExpenses.reduce((total, expense) => {
    const converted = parseFloat(convertAmount(expense.inputExpense));
    return total + (isNaN(converted) ? 0 : converted);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
          <h1 className="text-3xl font-bold text-gray-800">Expense History</h1>
        </div>
        <p className="text-gray-600 ml-4">View and manage all your past expenses</p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Header with Filter */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-800">
                All Transactions
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">Filter by:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setselectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 text-sm font-medium transition"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Empty State */}
        {addedExpense.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-300 mb-4">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Expenses Yet</h3>
            <p className="text-gray-500">Add your first expense from the dashboard</p>
          </div>
        ) : filteredExpenses.length === 0 ? (
          /* No results for selected category */
          <div className="text-center py-12">
            <div className="text-gray-300 mb-4">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Expenses Found</h3>
            <p className="text-gray-500">No expenses found in category: {selectedCategory}</p>
          </div>
        ) : (
          /* Expenses List */
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {[...filteredExpenses].reverse().map((elem) => {
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
                        📝 {elem.detail}
                      </p>
                    )}
                    <div className="text-xs text-gray-400">
                      📅 {elem.date}
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

      {/* Total Summary Card */}
      {filteredExpenses.length > 0 && (
        <div className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md p-5">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <div>
              <span className="text-blue-100 text-sm font-medium">
                Total Expenses
              </span>
              {selectedCategory !== 'All' && (
                <span className="text-blue-200 text-xs ml-2">
                  • {selectedCategory}
                </span>
              )}
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-white">
                {getCurrencySymbol(selectedCurrency)} {totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {selectedCurrency !== BASE_CURRENCY && (
                <p className="text-blue-200 text-xs mt-1">
                  ≈ ₨{filteredExpenses.reduce((total, expense) => total + expense.inputExpense, 0).toLocaleString()} PKR
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default History