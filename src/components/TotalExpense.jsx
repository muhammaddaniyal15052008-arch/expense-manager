import React from 'react'
import { ExpenseData } from '../context/ExpenseContext'
import { useContext, useState } from 'react'
import { useCurrency } from '../context/CurrencyContext'

const TotalExpense = () => {
  const { addedExpense } = useContext(ExpenseData)
  const { 
    selectedCurrency, 
    convertAmount, 
    BASE_CURRENCY,
    loading,
    lastUpdate
  } = useCurrency()
  
  const [selectedView, setSelectedView] = useState('all')

  const getCurrencySymbol = (code) => {
    const symbols = { 
      PKR: '₨', USD: '$', EUR: '€', GBP: '£', INR: '₹',
      AED: 'د.إ', SAR: '﷼', CAD: 'C$', AUD: 'A$', JPY: '¥',
      CNY: '¥', TRY: '₺'
    }
    return symbols[code] || code
  }

  const totalInPKR = addedExpense.reduce((acc, curr) => {
    const amount = curr.inputExpense || curr
    const parsedAmount = Number(amount)
    return acc + (isNaN(parsedAmount) ? 0 : parsedAmount)
  }, 0)

  const convertedTotal = convertAmount(totalInPKR)
  const total = typeof convertedTotal === 'string' ? parseFloat(convertedTotal) : convertedTotal

  const getFilteredExpenses = () => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    if (selectedView === 'monthly') {
      return addedExpense.filter(expense => {
        const expenseDate = new Date(expense.date)
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
      })
    } else if (selectedView === 'yearly') {
      return addedExpense.filter(expense => {
        const expenseDate = new Date(expense.date)
        return expenseDate.getFullYear() === currentYear
      })
    }
    return addedExpense
  }

  const filteredExpenses = getFilteredExpenses()

  const filteredTotalInPKR = filteredExpenses.reduce((acc, curr) => {
    const amount = curr.inputExpense || curr
    const parsedAmount = Number(amount)
    return acc + (isNaN(parsedAmount) ? 0 : parsedAmount)
  }, 0)

  const filteredTotal = convertAmount(filteredTotalInPKR)
  const displayTotal = selectedView === 'all' ? total : (typeof filteredTotal === 'string' ? parseFloat(filteredTotal) : filteredTotal)

  const averageExpenseInPKR = filteredExpenses.length > 0 ? filteredTotalInPKR / filteredExpenses.length : 0
  const averageExpense = convertAmount(averageExpenseInPKR)
  const avgDisplay = typeof averageExpense === 'string' ? parseFloat(averageExpense) : averageExpense

  const highestExpenseInPKR = filteredExpenses.length > 0 
    ? Math.max(...filteredExpenses.map(item => Number(item.inputExpense) || 0), 0)
    : 0
  const highestExpense = convertAmount(highestExpenseInPKR)
  const highestDisplay = typeof highestExpense === 'string' ? parseFloat(highestExpense) : highestExpense

  const lowestExpenseInPKR = filteredExpenses.length > 0 
    ? Math.min(...filteredExpenses.map(item => Number(item.inputExpense) || 0), Infinity)
    : 0
  const lowestExpense = convertAmount(lowestExpenseInPKR)
  const lowestDisplay = typeof lowestExpense === 'string' ? parseFloat(lowestExpense) : lowestExpense

  const categoryTotals = {}
  filteredExpenses.forEach(expense => {
    const category = expense.category
    const amount = Number(expense.inputExpense) || 0
    if (categoryTotals[category]) {
      categoryTotals[category] += amount
    } else {
      categoryTotals[category] = amount
    }
  })

  const convertedCategoryTotals = {}
  Object.keys(categoryTotals).forEach(category => {
    const converted = convertAmount(categoryTotals[category])
    convertedCategoryTotals[category] = typeof converted === 'string' ? parseFloat(converted) : converted
  })

  const sortedCategories = Object.entries(convertedCategoryTotals).sort((a, b) => b[1] - a[1])

  const getViewLabel = () => {
    if (selectedView === 'monthly') return 'This Month'
    if (selectedView === 'yearly') return 'This Year'
    return 'All Time'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Currency Info Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md p-4 mb-6">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-white text-sm opacity-90">Displaying in:</span>
            <span className="text-white font-bold text-base">
              {getCurrencySymbol(selectedCurrency)} {selectedCurrency}
            </span>
            <span className="text-blue-100 text-xs">(Base: {BASE_CURRENCY})</span>
          </div>
          {loading && (
            <div className="text-white text-sm">
              <span className="animate-pulse">⟳ Updating rates...</span>
            </div>
          )}
          {lastUpdate && !loading && (
            <div className="text-blue-100 text-xs">Updated: {lastUpdate}</div>
          )}
        </div>
      </div>

      {/* Time Filter Tabs */}
      {addedExpense.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-1.5 mb-6">
          <div className="flex gap-2">
            {['all', 'monthly', 'yearly'].map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`
                  flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200
                  ${selectedView === view
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {view === 'all' ? 'All Time' : view === 'monthly' ? 'This Month' : 'This Year'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Total Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg p-8 mb-6">
        <div className="text-center">
          <p className="text-blue-100 text-xs uppercase tracking-wider font-semibold mb-2">
            Total Expenses • {getViewLabel()}
          </p>
          <h2 className="text-white text-5xl font-bold mb-2">
            {getCurrencySymbol(selectedCurrency)} {displayTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <p className="text-blue-200 text-sm">
            {filteredExpenses.length} {filteredExpenses.length === 1 ? 'transaction' : 'transactions'} • {selectedCurrency} currency
          </p>
          {selectedCurrency !== BASE_CURRENCY && filteredTotalInPKR > 0 && (
            <p className="text-blue-200 text-xs mt-2">
              ≈ {getCurrencySymbol('PKR')} {filteredTotalInPKR.toLocaleString()} PKR
            </p>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      {filteredExpenses.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            {/* Transaction Count */}
            <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{filteredExpenses.length}</p>
                </div>
                <div className="bg-blue-100 rounded-xl p-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Average Expense */}
            <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Average Expense</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {getCurrencySymbol(selectedCurrency)} {avgDisplay.toFixed(2)}
                  </p>
                </div>
                <div className="bg-green-100 rounded-xl p-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              {selectedCurrency !== BASE_CURRENCY && averageExpenseInPKR > 0 && (
                <p className="text-xs text-gray-400 mt-2">≈ ₨{averageExpenseInPKR.toFixed(2)} PKR</p>
              )}
            </div>

            {/* Highest Expense */}
            <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Highest Expense</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {getCurrencySymbol(selectedCurrency)} {highestDisplay.toLocaleString()}
                  </p>
                </div>
                <div className="bg-red-100 rounded-xl p-3">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </div>
              {selectedCurrency !== BASE_CURRENCY && highestExpenseInPKR > 0 && (
                <p className="text-xs text-gray-400 mt-2">≈ ₨{highestExpenseInPKR.toLocaleString()} PKR</p>
              )}
            </div>

            {/* Lowest Expense */}
            <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Lowest Expense</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {getCurrencySymbol(selectedCurrency)} {lowestDisplay.toLocaleString()}
                  </p>
                </div>
                <div className="bg-yellow-100 rounded-xl p-3">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </div>
              {selectedCurrency !== BASE_CURRENCY && lowestExpenseInPKR > 0 && (
                <p className="text-xs text-gray-400 mt-2">≈ ₨{lowestExpenseInPKR.toLocaleString()} PKR</p>
              )}
            </div>
          </div>

          {/* Category Breakdown */}
          {sortedCategories.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-gray-800">Category Breakdown</h3>
                <span className="text-xs text-gray-500">by spending</span>
              </div>
              <div className="space-y-4">
                {sortedCategories.map(([category, amount]) => {
                  const percentage = (amount / displayTotal) * 100
                  return (
                    <div key={category}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-gray-700">{category}</span>
                        <span className="text-gray-600">
                          {getCurrencySymbol(selectedCurrency)} {amount.toLocaleString()} 
                          <span className="text-gray-400 ml-1">({percentage.toFixed(1)}%)</span>
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {addedExpense.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-gray-300 mb-4">
            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Expenses Yet</h3>
          <p className="text-gray-500">Add your first expense to see the total and statistics</p>
        </div>
      )}

      {/* Filtered Empty State */}
      {addedExpense.length > 0 && filteredExpenses.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-gray-300 mb-4">
            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Expenses Found</h3>
          <p className="text-gray-500">No expenses for {getViewLabel().toLowerCase()}</p>
        </div>
      )}
    </div>
  )
}

export default TotalExpense