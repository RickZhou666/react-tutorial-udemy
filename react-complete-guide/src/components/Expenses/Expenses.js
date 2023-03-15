import React, { useState } from 'react'
import Card from '../UI/Card'

import ExpensesFilter from './ExpensesFilter'
import ExpenseList from './ExpenseList'
import ExpensesChart from './ExpensesChart'

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2020')

  const handleFilterYear = (selectedYear) => {
    setFilteredYear(selectedYear)
    console.log(selectedYear)
  }

  const filterExpenses = props.items.filter((item) => {
    return item.date.getFullYear().toString() === filteredYear
  })

  // console.log(filteredYear)
  // console.log(filterExpenses)

  return (
    <div>
      <Card className={'expenses'}>
        <ExpensesFilter
          selectedYear={filteredYear}
          onFilterYear={handleFilterYear}
        />
        <ExpensesChart expenses={filterExpenses} />
        <ExpenseList items={filterExpenses} />
        {/* {props.items.map((item) => (
          <ExpenseItem
            key={item.id}
            title={item.title}
            amount={item.amount}
            date={item.date}
          />
        ))} */}

        {/* <ExpenseItem
          title={props.items[0].title}
          amount={props.items[0].amount}
          date={props.items[0].date}
        />
        <ExpenseItem
          title={props.items[1].title}
          amount={props.items[1].amount}
          date={props.items[1].date}
        />
        <ExpenseItem
          title={props.items[2].title}
          amount={props.items[2].amount}
          date={props.items[2].date}
        />
        <ExpenseItem
          title={props.items[3].title}
          amount={props.items[3].amount}
          date={props.items[3].date}
        /> */}
      </Card>
    </div>
  )
}

export default Expenses
