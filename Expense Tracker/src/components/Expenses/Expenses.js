import Card from "../UI/Card";
import React, { useState } from "react";

import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList"
import ExpensesChart from './ExpensesChart'

function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState('2020')
  const filterChangeHandler = (year) => {
    setFilteredYear(year)
  }
  const filteredItems = props.items.filter(item => item.date.getFullYear().toString() === filteredYear)

  return (
    <li>
      <Card className="expenses">
        <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
        <ExpensesChart expenses={filteredItems} />
        <ExpensesList items={filteredItems} />
      </Card>
    </li>
  );
}

export default Expenses;
