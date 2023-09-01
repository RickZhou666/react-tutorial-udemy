import React, { useEffect, useState } from 'react'

import Tasks from './components/Tasks/Tasks'
import NewTask from './components/NewTask/NewTask'
import useHttp from './hooks/use-http'

function App() {
  const [tasks, setTasks] = useState([])

  const { isLoading, error, sendRequest: fetchTasks } = useHttp()

  useEffect(() => {
    const transformTasks = (taskObj) => {
      const loadedTasks = []

      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text })
      }

      setTasks(loadedTasks)
    }

    fetchTasks(
      {
        url: 'https://react-http-e68be-default-rtdb.firebaseio.com/tasks.json',
      },
      transformTasks
    ) // will still call fetchTasks()
  }, [fetchTasks]) // this will create an infinite loop, (1) create a new fetchTasks function (2) then trigger useEffect() again
  // use a useCallback() hook to prevent this infinite loop

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task))
  }

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  )
}

export default App
