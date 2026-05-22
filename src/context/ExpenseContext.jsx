import React, { createContext, useState, useEffect } from 'react'

export const ExpenseData = createContext()

const ExpenseContext = (props) => {
  const [addedExpense, setaddedExpense] = useState(() => {
    const saveData = localStorage.getItem('expenses')
    return saveData ? JSON.parse(saveData) : []
  })

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(addedExpense));
  }, [addedExpense]);

  const [categories, setCategories] = useState(['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Education', 'Savings'])

  // Delete expense function to ensure consistency
  const deleteExpense = (id) => {
    const updatedExpenses = addedExpense.filter((_, index) => index !== id);
    setaddedExpense(updatedExpenses);
  };

  return (
    <ExpenseData.Provider 
      value={{
        addedExpense,
        setaddedExpense,
        categories,
        deleteExpense // Provide delete function
      }}>
      {props.children}
    </ExpenseData.Provider>
  )
}

export default ExpenseContext