import Card from '../UI/Card'
import ExpenseDate from './ExpenseDate'
import './ExpenseItem.css'
import React from 'react'

// function ExpenseItem({ title, amount, date }) {
// function ExpenseItem(props) {
const ExpenseItem = (props) => {
  // document.getElementById('root').addEventListener // Imperative way

  // const [title, setTitle] = useState(props.title) // this will make ExpenseItem function to be called again
  // console.log('ExpenseItem evaled by React')

  // function handleClick() {
  // const handleClick = () => {
  //   console.log(title)
  //   setTitle('Updated')
  // }

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <div className="expense-item__price">${props.amount}</div>
        </div>
      </Card>
    </li>
  )
}

export default ExpenseItem
