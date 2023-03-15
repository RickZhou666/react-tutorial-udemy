import Todo from './components/Todo'

function App() {
  return (
    <div>
      <h1>My Todos</h1>
      <Todo text="Learn React" />
    </div>
  )
}

const numbers = [1, 2, 3]
const [num1, , num3] = numbers
console.log(num1, num3)

export default App
