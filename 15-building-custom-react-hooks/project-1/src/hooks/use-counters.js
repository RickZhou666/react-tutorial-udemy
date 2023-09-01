import { useState, useEffect } from 'react'

const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        setCounter((prevCounter) => prevCounter + 1)
      } else {
        setCounter((prevCounter) => prevCounter - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [forwards]) // add forwards as dependency, this it will rerun each time this page executed

  return counter
}

export default useCounter
