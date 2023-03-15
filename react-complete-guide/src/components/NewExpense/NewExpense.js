import React, { useState } from 'react'
import './NewExpense.css'
import ExpenseForm from './ExpenseForm'

const NewExpense = (props) => {
  const [displayNewExpense, setDisplayNewExpense] = useState(false)

  const handleClick = () => {
    setDisplayNewExpense(!displayNewExpense)
  }

  const handleSaveExpenseData = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    }
    console.log(expenseData)
    props.onAddExpense(expenseData)
    handleClick()
  }

  return (
    <div className="new-expense">
      {!displayNewExpense && (
        <button onClick={handleClick}>Add New Expense</button>
      )}
      {displayNewExpense && (
        <ExpenseForm
          onSaveExpenseData={handleSaveExpenseData}
          onDisplayNewExpense={handleClick}
        />
      )}
    </div>
  )
}

export default NewExpense
