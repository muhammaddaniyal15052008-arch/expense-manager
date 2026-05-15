import React, { useContext, useState } from 'react'
import { ExpenseData } from '../context/ExpenseContext'

const History = () => {

  const {addedExpense, setaddedExpense, categories} = useContext(ExpenseData)
  console.log('mn hn',addedExpense);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Expense History</h1>
        <p className="text-gray-600">View all your past expenses</p>
      </div>

      {/* History List Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-4 pb-3 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            All Transactions 
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({addedExpense.length} expenses)
            </span>
          </h2>
        </div>
        
        {addedExpense.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Expenses Yet</h3>
            <p className="text-gray-500">Add your first expense from the dashboard</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {addedExpense.map((elem, idx) => (
              <div 
                key={idx} 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
              >
                <div className="flex-1 space-y-1 sm:space-y-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-lg font-semibold text-gray-800">
                      ₹{elem.inputExpense}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {elem.category}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {elem.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Card */}
      {addedExpense.length > 0 && (
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Total Expenses:</span>
            <span className="text-2xl font-bold text-blue-600">
              ₹{addedExpense.reduce((acc, curr) => acc + (Number(curr.inputExpense) || 0), 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default History