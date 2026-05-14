import React from 'react'
import { ExpenseData } from '../context/ExpenseContext'
import { useContext, useState } from 'react'

const TotalExpense = () => {
 const {addedExpense} = useContext(ExpenseData)
 const total = addedExpense.reduce((acc, curr) => {
  // 1. Pehle check karein ke value kia hai
  const amount = curr.inputExpense || curr; 
  
  // 2. Isay number mein badlen
  const parsedAmount = Number(amount);

  // 3. Agar number sahi nahi hai (NaN hai), to 0 jama karein, warna original number
  return acc + (isNaN(parsedAmount) ? 0 : parsedAmount);
}, 0);
 console.log(total);
 
 
  return (
    <div>
        <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '5px' }}>
      <h3>Total Expenses Count: {total}</h3>
    </div>
    </div>
  )
}

export default TotalExpense