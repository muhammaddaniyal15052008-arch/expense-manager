import React, { useContext, useState } from 'react'
import { ExpenseData } from '../context/ExpenseContext'

const Dashboard = () => {


  const {addedExpense,setaddedExpense,categories} = useContext(ExpenseData)
  const [inputExpense, setinputExpense] = useState('')
  const [selectedCat, setselectedCat] = useState('Food')
  console.log(categories);
  


const submitHandler = (e) => {
  e.preventDefault()
  const dateNow = new Date().toLocaleString();
  setaddedExpense([...addedExpense,{
    inputExpense: inputExpense, 
    date: dateNow,
    category: selectedCat
  }])
  setinputExpense('')
}

 const deleteExpense = (idx) => {
    const copyExpense = [...addedExpense];
    copyExpense.splice(idx, 1);
    setaddedExpense(copyExpense);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input 
        value={inputExpense}
        onChange={(e) => setinputExpense(e.target.value)}
        placeholder="Enter Expense" 
        type="text">
        </input>
        <select value={selectedCat} onChange={(e) => 
          setselectedCat(e.target.value)
        }>
         {categories.map((category) => (
           <option key={category} value={category}>
              {category}
            </option>
         ))}
        </select>
        <button onClick={submitHandler}>Add Expense</button>
      </form>
      <div>
        {addedExpense.map((elem,idx) => (
          <div key={idx}>
            <div>
              {elem.inputExpense}
              {elem.date}
              {elem.category}
            </div>
            <button  onClick={() => deleteExpense(idx)}>
                  Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard