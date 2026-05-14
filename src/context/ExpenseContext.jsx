import React, { Children, createContext, useState , useEffect } from 'react'


export const ExpenseData = createContext()

const ExpenseContext = (props) => {

const [addedExpense, setaddedExpense] = useState(() => {
  const saveData = localStorage.getItem('expenses')
  return saveData ? JSON.parse(saveData) : []
})

useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(addedExpense));
  }, [addedExpense]);

  const [categories, setCategories] = useState(['Food', 'Transport', 'Shopping', 'Bills'])

  return (
   <ExpenseData.Provider 
   value={{
    addedExpense,setaddedExpense,categories
    }}>
   {props.children}
   </ExpenseData.Provider>
  )
}

export default ExpenseContext