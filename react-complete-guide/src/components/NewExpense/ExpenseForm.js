import React, { useState } from 'react'
import './ExpenseForm.css'

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('')
  const [enteredAmount, setEnteredAmount] = useState('')
  const [enteredDate, setEnteredDate] = useState('')

  //   const [userInput, setUserInput] = useState({
  //     enteredTitle: '',
  //     enteredAmount: '',
  //     enteredDate: '',
  //   })

  const handleTitleChange = (event) => {
    // 1. useState
    setEnteredTitle(event.target.value)
    // console.log(event.target.value)
    // 2. maybe get outdated data
    // setUserInput({
    //   ...userInput,
    //   enteredTitle: event.target.value,
    // })
    // 3. alway latest snapshot
    // setUserInput((prevState) => {
    //   return { ...prevState, enteredTitle: event.target.value }
    // })
  }
  const handleAmountChange = (event) => {
    setEnteredAmount(event.target.value)
    // console.log(event.target.value)
    // setUserInput({
    //   ...userInput,
    //   enteredAmount: event.target.value,
    // })
    // setUserInput((prevState) => {
    //   return { ...prevState, enteredAmount: event.target.value }
    // })
  }
  const handleDateChange = (event) => {
    setEnteredDate(event.target.value)
    // console.log(event.target.value)
    // setUserInput({
    //   ...userInput,
    //   enteredDate: event.target.value,
    // })
    // setUserInput((prevState) => {
    //   return { ...prevState, enteredDate: event.target.value }
    // })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    }

    console.log(expenseData)

    props.onSaveExpenseData(expenseData)

    setEnteredTitle('')
    setEnteredAmount('')
    setEnteredDate('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="new-expense__control">
          <label>date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2023-03-05"
            value={enteredDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="new-expense__actions">
          <button type="button" onClick={props.onDisplayNewExpense}>
            Cancel
          </button>
          <button type="submit">Add Expense</button>
        </div>
      </div>
    </form>
  )
}

export default ExpenseForm
