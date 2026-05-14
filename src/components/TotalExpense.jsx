import React from 'react'
import { ExpenseData } from '../context/ExpenseContext'
import { useContext, useState } from 'react'

const TotalExpense = () => {
 const {addedExpense} = useContext(ExpenseData)
 const total = addedExpense.reduce((acc, curr) => {
  // Check what the value is
  const amount = curr.inputExpense || curr; 
  
  // Convert to number
  const parsedAmount = Number(amount);

  // If not a valid number, add 0, otherwise add the number
  return acc + (isNaN(parsedAmount) ? 0 : parsedAmount);
}, 0);
 console.log(total);
 
  return (
    <div className="max-w-7xl mx-auto">
      {/* Main Total Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 mb-6">
        <div className="text-center">
          <h3 className="text-white text-sm uppercase tracking-wider font-semibold mb-2">
            Total Expenses
          </h3>
          <div className="text-white text-5xl font-bold mb-2">
            ₹{total.toLocaleString('en-IN')}
          </div>
          <p className="text-blue-100 text-sm">
            Across all categories
          </p>
        </div>
      </div>

      {/* Optional: Summary Cards Section */}
      {addedExpense.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Transaction Count Card */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{addedExpense.length}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Average Expense Card */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Average Expense</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  ₹{(total / addedExpense.length).toFixed(2)}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Highest Expense Card - if expenses exist */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Highest Expense</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  ₹{Math.max(...addedExpense.map(item => Number(item.inputExpense) || 0), 0)}
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {addedExpense.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Expenses Yet</h3>
          <p className="text-gray-500">Add your first expense to see the total and statistics</p>
        </div>
      )}
    </div>
  )
}

export default TotalExpense