import './App.css'
import React, { useState } from 'react'

import Expense from './components/Expenses/Expense'
import NewExpense from './components/NewExpense/NewExpense'
import Expenses from './components/Expenses/Expenses'

// function App() {
const App = () => {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES)

  const handleAddExpense = (expense) => {
    // console.log('In App.js')
    // console.log(expense)
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses]
    })
  }

  return (
    <div>
      <NewExpense onAddExpense={handleAddExpense} />
      <Expenses items={expenses} />
      {/* <Expense item={expenses[0]} />
      <Expense item={expenses[1]} />
      <Expense item={expenses[2]} />
      <Expense item={expenses[3]} /> */}
    </div>
  )

  // three elements
  //  1 element tags
  //  2 attributes that configures this element
  //  3 content between <></>
  // return React.createElement(
  //   'div',
  //   {},
  //   React.createElement('h2', {}, 'Lets get started!'),
  //   React.createElement(Expense, { item: expenses[0] }),
  //   React.createElement(Expense, { item: expenses[1] }),
  //   React.createElement(Expense, { item: expenses[2] }),
  //   React.createElement(Expense, { item: expenses[3] })
  // )
}

const INITIAL_EXPENSES = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2021, 5, 12),
  },
]

export default App
